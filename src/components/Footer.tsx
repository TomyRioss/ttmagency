"use client";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      borderTop: "1px solid var(--border)", 
      background: "var(--bg)", 
      padding: "4rem 0",
      marginTop: "auto"
    }}>
      <div className="container">
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center",
          textAlign: "center",
          gap: "1.5rem"
        }}>
          
          {/* Logo */}
          <div style={{ fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-0.03em" }}>
            ttm<span style={{ color: "var(--text-secondary)" }}>.</span>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
            <a href="#about" style={{ color: "var(--text-secondary)", fontSize: "0.9rem", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "white"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>Sobre mí</a>
            <a href="#services" style={{ color: "var(--text-secondary)", fontSize: "0.9rem", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "white"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>Servicios</a>
            <a href="#projects" style={{ color: "var(--text-secondary)", fontSize: "0.9rem", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "white"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>Proyectos</a>
            <a href="/admin/login" style={{ color: "var(--text-secondary)", fontSize: "0.9rem", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "white"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>Admin</a>
          </div>

          {/* Copyright */}
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", opacity: 0.6, marginTop: "2rem" }}>
            © {currentYear} TTM Agency. Todos los derechos reservados. <br/>
            Construido para dominar el entorno digital.
          </p>

        </div>
      </div>
    </footer>
  );
}
