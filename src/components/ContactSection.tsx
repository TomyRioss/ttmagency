"use client";

import { useState, type FormEvent, useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState<{name?: string, email?: string, message?: string}>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const newErrors: {name?: string, email?: string, message?: string} = {};
    if (!name || name.trim() === "") newErrors.name = "Obligatorio";
    if (!email || email.trim() === "" || !email.includes("@")) newErrors.email = "Email no válido";
    if (!message || message.trim() === "") newErrors.message = "Obligatorio";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("sending");
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStatus("sent");
    setShowToast(true);
    (e.target as HTMLFormElement).reset();
    
    setTimeout(() => setStatus("idle"), 3000);
  }

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <section className="section" id="contact" style={{ paddingBottom: "12rem", position: "relative" }}>
      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="section-title animate-fade-up" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Comencemos.
            </h2>
            <p className="animate-fade-up delay-1" style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginTop: "1rem" }}>
              Sin fricciones. Déjanos tu mensaje y nos pondremos a trabajar.
            </p>
          </div>
          
          <div className="animate-fade-up delay-2">
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Nombre completo"
                  style={{ 
                    width: "100%",
                    background: "rgba(255,255,255,0.02)", 
                    border: "1px solid",
                    borderColor: errors.name ? "#ff3333" : "rgba(255,255,255,0.05)",
                    padding: "1.2rem",
                    color: "#fff",
                    fontSize: "1rem",
                    borderRadius: "8px",
                    outline: "none",
                    transition: "all 0.3s ease"
                  }}
                  onFocus={(e) => e.target.style.background = "rgba(255,255,255,0.05)"}
                  onBlur={(e) => e.target.style.background = "rgba(255,255,255,0.02)"}
                  onChange={() => setErrors({ ...errors, name: undefined })}
                />
                {errors.name && <span style={{ color: "#ff3333", fontSize: "0.85rem", paddingLeft: "0.5rem" }}>* {errors.name}</span>}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Correo electrónico"
                  style={{ 
                    width: "100%",
                    background: "rgba(255,255,255,0.02)", 
                    border: "1px solid",
                    borderColor: errors.email ? "#ff3333" : "rgba(255,255,255,0.05)",
                    padding: "1.2rem",
                    color: "#fff",
                    fontSize: "1rem",
                    borderRadius: "8px",
                    outline: "none",
                    transition: "all 0.3s ease"
                  }}
                  onFocus={(e) => e.target.style.background = "rgba(255,255,255,0.05)"}
                  onBlur={(e) => e.target.style.background = "rgba(255,255,255,0.02)"}
                  onChange={() => setErrors({ ...errors, email: undefined })}
                />
                {errors.email && <span style={{ color: "#ff3333", fontSize: "0.85rem", paddingLeft: "0.5rem" }}>* {errors.email}</span>}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <textarea 
                  name="message"
                  placeholder="Mensaje o detalles del proyecto..."
                  rows={4}
                  style={{ 
                    width: "100%",
                    background: "rgba(255,255,255,0.02)", 
                    border: "1px solid",
                    borderColor: errors.message ? "#ff3333" : "rgba(255,255,255,0.05)",
                    padding: "1.2rem",
                    color: "#fff",
                    fontSize: "1rem",
                    borderRadius: "8px",
                    outline: "none",
                    resize: "vertical",
                    transition: "all 0.3s ease"
                  }}
                  onFocus={(e) => e.target.style.background = "rgba(255,255,255,0.05)"}
                  onBlur={(e) => e.target.style.background = "rgba(255,255,255,0.02)"}
                  onChange={() => setErrors({ ...errors, message: undefined })}
                />
                {errors.message && <span style={{ color: "#ff3333", fontSize: "0.85rem", paddingLeft: "0.5rem" }}>* {errors.message}</span>}
              </div>

              <button 
                type="submit" 
                disabled={status === "sending"}
                style={{ 
                  background: "#fff", 
                  color: "#000", 
                  padding: "1.2rem", 
                  fontSize: "1rem", 
                  fontWeight: 600, 
                  fontFamily: "var(--font-display)",
                  border: "none", 
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  marginTop: "1rem"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {status === "sending" ? "ENVIANDO..." : status === "sent" ? "MENSAJE ENVIADO" : "ENVIAR MENSAJE"}
              </button>

            </form>
          </div>

        </div>
      </div>

      {/* NOTIFICACIÓN (TOAST) "GUAPA" */}
      <div style={{
        position: "fixed",
        bottom: showToast ? "2rem" : "-5rem",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(10, 10, 10, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(0, 255, 128, 0.1)",
        padding: "1rem 1.5rem",
        borderRadius: "999px",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        zIndex: 9999,
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: showToast ? 1 : 0,
        pointerEvents: showToast ? "auto" : "none"
      }}>
        <div style={{ 
          background: "linear-gradient(135deg, #00FF80, #00B359)", 
          borderRadius: "50%", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          padding: "4px" 
        }}>
          <CheckCircle2 size={16} color="#000" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>¡Transmisión exitosa!</span>
          <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>He recibido tu mensaje. Hablaremos pronto.</span>
        </div>
        <button 
          onClick={() => setShowToast(false)} 
          style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer", marginLeft: "1rem" }}
        >
          <X size={18} />
        </button>
      </div>
    </section>
  );
}
