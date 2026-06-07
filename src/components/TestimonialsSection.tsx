import type { TestimonialType } from "@/lib/types";

interface Props {
  testimonials: TestimonialType[];
}

export function TestimonialsSection({ testimonials }: Props) {
  if (testimonials.length === 0) return null;

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <p className="section-subtitle animate-fade-up">Testimonios</p>
        <h2 className="section-title animate-fade-up delay-1">
          Lo que dicen de nosotros
        </h2>

        <div className="grid-2 animate-fade-up delay-2" style={{ marginTop: "4rem" }}>
          {testimonials.map((testimonial, i) => {
            const initials = testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            return (
              <div key={testimonial.id} className="glass-card" style={{ animationDelay: `${0.2 + (i * 0.1)}s` }}>
                <p style={{ 
                  fontSize: "1.2rem", 
                  color: "var(--text-primary)", 
                  lineHeight: 1.6,
                  marginBottom: "2rem",
                  fontStyle: "italic"
                }}>
                  "{testimonial.comment}"
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #333, #000)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                    fontSize: "0.9rem"
                  }}>
                    {initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "1rem" }}>{testimonial.name}</div>
                    {testimonial.company && (
                      <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                        {testimonial.company}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
