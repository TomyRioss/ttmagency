import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="section" id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "6rem" }}>
      <div className="bg-glow"></div>
      
      <div className="container" style={{ textAlign: "center", zIndex: 10 }}>
        <div className="animate-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.05)", padding: "0.6rem 1.2rem", borderRadius: "99px", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "2.5rem" }}>
          <Sparkles size={16} style={{ color: "var(--text-primary)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", color: "var(--text-primary)", fontWeight: 500, letterSpacing: "0.05em" }}>AGENCIA DIGITAL TTM</span>
        </div>

        <h1 className="animate-fade-up delay-1" style={{ 
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3.5rem, 8vw, 7rem)", 
          fontWeight: 800, 
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          marginBottom: "1.5rem"
        }}>
          Diseño web llevado <br /> a la <span style={{ 
            color: "transparent", 
            backgroundImage: "linear-gradient(to bottom right, #ffffff, #555555)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "normal",
            paddingRight: "0.1em"
          }}>perfección.</span>
        </h1>

        <p className="animate-fade-up delay-2" style={{ 
          fontSize: "clamp(1.1rem, 3vw, 1.4rem)", 
          color: "var(--text-secondary)", 
          maxWidth: "650px", 
          margin: "0 auto 3.5rem auto",
          lineHeight: 1.6
        }}>
          Construimos experiencias digitales fluidas, elegantes y extremadamente rápidas. Elevando tu marca al estándar más alto del mercado.
        </p>

        <div className="animate-fade-up delay-3" style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#contact" className="btn btn-primary">
            Iniciar Proyecto
            <ArrowRight size={20} />
          </a>
          <a href="#projects" className="btn btn-secondary">
            Ver Portafolio
          </a>
        </div>
      </div>
    </section>
  );
}
