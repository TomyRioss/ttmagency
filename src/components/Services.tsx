import { Code2, MonitorPlay, Zap, Shield } from "lucide-react";

const services = [
  {
    icon: MonitorPlay,
    title: "Diseño de Interfaces",
    description: "Interfaces limpias, intuitivas y que enamoran a primera vista.",
  },
  {
    icon: Zap,
    title: "Rendimiento Absoluto",
    description: "Cada milisegundo cuenta. Optimizamos hasta la última línea de código.",
  },
  {
    icon: Code2,
    title: "Desarrollo Frontend",
    description: "Tecnología de vanguardia con Next.js y React para webs reactivas.",
  },
  {
    icon: Shield,
    title: "Sistemas Robustos",
    description: "Arquitecturas escalables y seguras preparadas para el futuro.",
  },
];

export function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <p className="section-subtitle animate-fade-up">Experiencia</p>
        <h2 className="section-title animate-fade-up delay-1">
          Nuestra Especialidad
        </h2>
        
        <div className="grid-2 animate-fade-up delay-2" style={{ marginTop: "4rem" }}>
          {services.map((service, i) => (
            <div key={service.title} className="glass-card" style={{ animationDelay: `${0.2 + (i * 0.1)}s` }}>
              <div style={{ 
                width: "48px", height: "48px", 
                borderRadius: "12px", 
                background: "rgba(255,255,255,0.05)", 
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1.5rem",
                border: "1px solid rgba(255,255,255,0.1)"
              }}>
                <service.icon size={24} style={{ color: "var(--text-primary)" }} />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 500, marginBottom: "0.75rem" }}>
                {service.title}
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
