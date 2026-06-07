"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  order: number;
}

const categoryOptions = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "tools", label: "Herramientas" },
  { value: "other", label: "Otros" },
];

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    const res = await fetch("/api/skills");
    const data = await res.json();
    setSkills(data);
    setLoading(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const body = {
      name: formData.get("name"),
      category: formData.get("category"),
      level: parseInt(formData.get("level") as string) || 50,
      order: parseInt(formData.get("order") as string) || 0,
    };

    if (editing) {
      await fetch(`/api/skills/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    setShowModal(false);
    setEditing(null);
    fetchSkills();
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Seguro que quieres eliminar esta habilidad?")) return;
    await fetch(`/api/skills/${id}`, { method: "DELETE" });
    fetchSkills();
  }

  if (loading) return <p>Cargando...</p>;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--space-lg)",
        }}
      >
        <h2 style={{ fontSize: "1.2rem", fontWeight: 600 }}>
          Habilidades ({skills.length})
        </h2>
        <button
          className="btn btn-primary btn-small"
          onClick={() => {
            setEditing(null);
            setShowModal(true);
          }}
        >
          <Plus size={15} />
          Nueva habilidad
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Nivel</th>
            <th>Orden</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill.id}>
              <td style={{ fontWeight: 500, color: "var(--color-text)" }}>
                {skill.name}
              </td>
              <td>
                <span className="tech-tag">{skill.category}</span>
              </td>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div
                    style={{
                      width: 60,
                      height: 6,
                      backgroundColor: "var(--color-bg-alt)",
                      borderRadius: "var(--radius-full)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${skill.level}%`,
                        height: "100%",
                        backgroundColor: "var(--color-accent)",
                        borderRadius: "var(--radius-full)",
                      }}
                    />
                  </div>
                  <span style={{ fontSize: "0.8rem" }}>{skill.level}%</span>
                </div>
              </td>
              <td>{skill.order}</td>
              <td>
                <div className="actions">
                  <button
                    className="btn btn-small btn-secondary"
                    onClick={() => {
                      setEditing(skill);
                      setShowModal(true);
                    }}
                    aria-label="Editar habilidad"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    className="btn btn-small btn-danger"
                    onClick={() => handleDelete(skill.id)}
                    aria-label="Eliminar habilidad"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {skills.length === 0 && (
        <p
          style={{
            textAlign: "center",
            padding: "var(--space-2xl)",
            color: "var(--color-text-muted)",
          }}
        >
          No hay habilidades todavía.
        </p>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? "Editar habilidad" : "Nueva habilidad"}</h2>
              <button onClick={() => setShowModal(false)} aria-label="Cerrar">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="skill-name" className="form-label">
                    Nombre *
                  </label>
                  <input
                    id="skill-name"
                    name="name"
                    className="form-input"
                    placeholder="Ej: React, Docker, Python..."
                    defaultValue={editing?.name || ""}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="skill-category" className="form-label">
                    Categoría
                  </label>
                  <select
                    id="skill-category"
                    name="category"
                    className="form-input"
                    defaultValue={editing?.category || "frontend"}
                  >
                    {categoryOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="skill-level" className="form-label">
                    Nivel (0-100)
                  </label>
                  <input
                    id="skill-level"
                    name="level"
                    type="number"
                    min="0"
                    max="100"
                    className="form-input"
                    defaultValue={editing?.level || 50}
                    style={{ width: 100 }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="skill-order" className="form-label">
                    Orden
                  </label>
                  <input
                    id="skill-order"
                    name="order"
                    type="number"
                    className="form-input"
                    defaultValue={editing?.order || 0}
                    style={{ width: 80 }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-small"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary btn-small">
                  {editing ? "Guardar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
