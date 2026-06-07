"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email o contraseña incorrectos");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "var(--space-lg)",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "var(--radius-md)",
              background: "var(--color-accent-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-accent)",
            }}
          >
            <Lock size={22} />
          </div>
        </div>

        <h1>Panel de Admin</h1>
        <p className="login-subtitle">Inicia sesión para gestionar tu web</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              className="form-input"
              placeholder="admin@ttm.dev"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Contraseña
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
