import type { SkillType } from "@/lib/types";

interface Props {
  skills: SkillType[];
}

export function SkillsSection({ skills }: Props) {
  const grouped = skills.reduce(
    (acc, skill) => {
      const cat = skill.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    },
    {} as Record<string, SkillType[]>
  );

  const categoryLabels: Record<string, string> = {
    frontend: "Frontend",
    backend: "Backend",
    tools: "Herramientas",
    other: "Otros",
  };

  return (
    <section className="section" id="skills">
      <div className="container">
        <p className="section-subtitle animate-fade-up">Tecnologías</p>
        <h2 className="section-title animate-fade-up delay-1">
          Stack
        </h2>

        <div className="grid-2 animate-fade-up delay-2" style={{ marginTop: "4rem" }}>
          {Object.entries(grouped).map(([category, catSkills]) => (
            <div key={category} className="glass-card">
              <h3 style={{
                fontSize: "1.2rem",
                fontWeight: 500,
                color: "var(--text-primary)",
                marginBottom: "2rem"
              }}>
                {categoryLabels[category] || category}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {catSkills.map((skill) => (
                  <div key={skill.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>{skill.name}</span>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", opacity: 0.5 }}>{skill.level}%</span>
                    </div>
                    <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "99px", overflow: "hidden" }}>
                      <div style={{ 
                        height: "100%", 
                        width: `${skill.level}%`, 
                        background: "linear-gradient(90deg, rgba(255,255,255,0.3), #fff)",
                        borderRadius: "99px"
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
