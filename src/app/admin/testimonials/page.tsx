"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  comment: string;
  company: string | null;
  rating: number;
  featured: boolean;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    const res = await fetch("/api/testimonials");
    const data = await res.json();
    setTestimonials(data);
    setLoading(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const body = {
      name: formData.get("name"),
      comment: formData.get("comment"),
      company: formData.get("company") || null,
      rating: parseInt(formData.get("rating") as string) || 5,
      featured: formData.get("featured") === "on",
    };

    if (editing) {
      await fetch(`/api/testimonials/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    setShowModal(false);
    setEditing(null);
    fetchTestimonials();
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Seguro que quieres eliminar este testimonio?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    fetchTestimonials();
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
          Testimonios ({testimonials.length})
        </h2>
        <button
          className="btn btn-primary btn-small"
          onClick={() => {
            setEditing(null);
            setShowModal(true);
          }}
        >
          <Plus size={15} />
          Nuevo testimonio
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Empresa</th>
            <th>Rating</th>
            <th>Visible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((t) => (
            <tr key={t.id}>
              <td style={{ fontWeight: 500, color: "var(--color-text)" }}>
                {t.name}
              </td>
              <td>{t.company || "—"}</td>
              <td>
                <div style={{ display: "flex", gap: 1 }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill="var(--color-warning)"
                      color="var(--color-warning)"
                    />
                  ))}
                </div>
              </td>
              <td>{t.featured ? "Sí" : "No"}</td>
              <td>
                <div className="actions">
                  <button
                    className="btn btn-small btn-secondary"
                    onClick={() => {
                      setEditing(t);
                      setShowModal(true);
                    }}
                    aria-label="Editar testimonio"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    className="btn btn-small btn-danger"
                    onClick={() => handleDelete(t.id)}
                    aria-label="Eliminar testimonio"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {testimonials.length === 0 && (
        <p
          style={{
            textAlign: "center",
            padding: "var(--space-2xl)",
            color: "var(--color-text-muted)",
          }}
        >
          No hay testimonios todavía.
        </p>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? "Editar testimonio" : "Nuevo testimonio"}</h2>
              <button onClick={() => setShowModal(false)} aria-label="Cerrar">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="test-name" className="form-label">
                    Nombre *
                  </label>
                  <input
                    id="test-name"
                    name="name"
                    className="form-input"
                    defaultValue={editing?.name || ""}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="test-comment" className="form-label">
                    Comentario *
                  </label>
                  <textarea
                    id="test-comment"
                    name="comment"
                    className="form-textarea"
                    defaultValue={editing?.comment || ""}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="test-company" className="form-label">
                    Empresa (opcional)
                  </label>
                  <input
                    id="test-company"
                    name="company"
                    className="form-input"
                    defaultValue={editing?.company || ""}
                  />
                </div>
                <div style={{ display: "flex", gap: "var(--space-lg)" }}>
                  <div className="form-group">
                    <label htmlFor="test-rating" className="form-label">
                      Rating (1-5)
                    </label>
                    <input
                      id="test-rating"
                      name="rating"
                      type="number"
                      min="1"
                      max="5"
                      className="form-input"
                      defaultValue={editing?.rating || 5}
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
                      id="test-featured"
                      name="featured"
                      type="checkbox"
                      defaultChecked={editing?.featured ?? true}
                    />
                    <label htmlFor="test-featured" className="form-label" style={{ margin: 0 }}>
                      Visible
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
