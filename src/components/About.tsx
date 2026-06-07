export function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p className="section-subtitle animate-fade-up">Filosofía</p>
          <h2 className="section-title animate-fade-up delay-1">
            Menos ruido. Más impacto.
          </h2>
          
          <div className="animate-fade-up delay-2" style={{ marginTop: "3rem", fontSize: "1.25rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <p>
              Creemos firmemente que la elegancia radica en la simplicidad. Cada pixel, cada transición y cada línea de código tiene un propósito singular: crear una experiencia inolvidable.
            </p>
            <p>
              No usamos plantillas saturadas de información. Diseñamos con espacios en blanco, tipografías perfectas y animaciones fluidas que hacen que interactuar con tu marca sea un placer absoluto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
