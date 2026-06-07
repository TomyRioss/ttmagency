"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  liveUrl: string | null;
  repoUrl: string | null;
  technologies: string;
  featured: boolean;
  order: number;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const techString = formData.get("technologies") as string;
    const technologies = techString
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const body = {
      name: formData.get("name"),
      description: formData.get("description"),
      imageUrl: formData.get("imageUrl") || "/images/projects/default.jpg",
      liveUrl: formData.get("liveUrl") || null,
      repoUrl: formData.get("repoUrl") || null,
      technologies,
      featured: formData.get("featured") === "on",
      order: parseInt(formData.get("order") as string) || 0,
    };

    if (editing) {
      await fetch(`/api/projects/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    setShowModal(false);
    setEditing(null);
    fetchProjects();
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Seguro que quieres eliminar este proyecto?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  }

  function openEdit(project: Project) {
    setEditing(project);
    setShowModal(true);
  }

  function openCreate() {
    setEditing(null);
    setShowModal(true);
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
          Proyectos ({projects.length})
        </h2>
        <button className="btn btn-primary btn-small" onClick={openCreate}>
          <Plus size={15} />
          Nuevo proyecto
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tecnologías</th>
            <th>Destacado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            let techs: string[] = [];
            try {
              techs = JSON.parse(project.technologies);
            } catch {
              techs = [];
            }
            return (
              <tr key={project.id}>
                <td style={{ fontWeight: 500, color: "var(--color-text)" }}>
                  {project.name}
                </td>
                <td>
                  <div className="tech-tags">
                    {techs.map((t: string) => (
                      <span key={t} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td>{project.featured ? "Sí" : "No"}</td>
                <td>
                  <div className="actions">
                    <button
                      className="btn btn-small btn-secondary"
                      onClick={() => openEdit(project)}
                      aria-label="Editar proyecto"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      className="btn btn-small btn-danger"
                      onClick={() => handleDelete(project.id)}
                      aria-label="Eliminar proyecto"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {projects.length === 0 && (
        <p
          style={{
            textAlign: "center",
            padding: "var(--space-2xl)",
            color: "var(--color-text-muted)",
          }}
        >
          No hay proyectos todavía. ¡Crea el primero!
        </p>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? "Editar proyecto" : "Nuevo proyecto"}</h2>
              <button
                onClick={() => setShowModal(false)}
                aria-label="Cerrar modal"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="project-name" className="form-label">
                    Nombre *
                  </label>
                  <input
                    id="project-name"
                    name="name"
                    className="form-input"
                    defaultValue={editing?.name || ""}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="project-desc" className="form-label">
                    Descripción *
                  </label>
                  <textarea
                    id="project-desc"
                    name="description"
                    className="form-textarea"
                    defaultValue={editing?.description || ""}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="project-tech" className="form-label">
                    Tecnologías (separadas por coma)
                  </label>
                  <input
                    id="project-tech"
                    name="technologies"
                    className="form-input"
                    placeholder="React, TypeScript, Node.js"
                    defaultValue={
                      editing
                        ? (() => {
                            try {
                              return JSON.parse(editing.technologies).join(
                                ", "
                              );
                            } catch {
                              return "";
                            }
                          })()
                        : ""
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="project-image" className="form-label">
                    URL de imagen
                  </label>
                  <input
                    id="project-image"
                    name="imageUrl"
                    className="form-input"
                    defaultValue={editing?.imageUrl || ""}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="project-live" className="form-label">
                    URL del proyecto
                  </label>
                  <input
                    id="project-live"
                    name="liveUrl"
                    className="form-input"
                    defaultValue={editing?.liveUrl || ""}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="project-repo" className="form-label">
                    URL del repositorio
                  </label>
                  <input
                    id="project-repo"
                    name="repoUrl"
                    className="form-input"
                    defaultValue={editing?.repoUrl || ""}
                  />
                </div>
                <div
                  style={{ display: "flex", gap: "var(--space-lg)" }}
                >
                  <div className="form-group">
                    <label htmlFor="project-order" className="form-label">
                      Orden
                    </label>
                    <input
                      id="project-order"
                      name="order"
                      type="number"
                      className="form-input"
                      defaultValue={editing?.order || 0}
                      style={{ width: 80 }}
                    />
                  </div>
                  <div
                    className="form-group"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      paddingTop: "1.2rem",
                    }}
                  >
                    <input
                      id="project-featured"
                      name="featured"
                      type="checkbox"
                      defaultChecked={editing?.featured ?? true}
                    />
                    <label htmlFor="project-featured" className="form-label" style={{ margin: 0 }}>
                      Destacado
                    </label>
                  </div>
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
