"use client";

import type { ProjectType } from "@/lib/types";
import { parseTechnologies } from "@/lib/types";
import { ArrowUpRight, Github } from "lucide-react";

interface Props {
  projects: ProjectType[];
}

export function ProjectsSection({ projects }: Props) {
  return (
    <section className="section" id="projects">
      <div className="container">
        <p className="section-subtitle animate-fade-up">Trabajos Recientes</p>
        <h2 className="section-title animate-fade-up delay-1">
          Portafolio
        </h2>

        {projects && projects.length > 0 ? (
          <div className="grid-2 animate-fade-up delay-2" style={{ marginTop: "4rem" }}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="glass-card animate-fade-up delay-2" style={{ marginTop: "4rem", textAlign: "center", padding: "6rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h3 style={{ fontSize: "2rem", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Próximamente</h3>
            <p style={{ color: "var(--border-hover)", marginTop: "1rem" }}>Estamos cocinando proyectos de alto nivel.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: ProjectType }) {
  const technologies = parseTechnologies(project.technologies);

  return (
    <div className="glass-card" style={{ padding: "0", display: "flex", flexDirection: "column" }}>
      <div style={{
        height: "240px",
        background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 100%)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "var(--text-secondary)",
        letterSpacing: "-0.02em"
      }}>
        {project.name}
      </div>

      <div style={{ padding: "2rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.5rem" }}>{project.name}</h3>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", flexGrow: 1 }}>{project.description}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
          {technologies.map((tech) => (
            <span key={tech} style={{ 
              fontSize: "0.8rem", 
              padding: "0.3rem 0.8rem", 
              background: "rgba(255,255,255,0.03)", 
              border: "1px solid var(--border)", 
              borderRadius: "99px",
              color: "var(--text-secondary)"
            }}>
              {tech}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "0.6rem 1.2rem" }}>
              Visitar
              <ArrowUpRight size={16} />
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: "0.6rem 1.2rem" }}>
              Código
              <Github size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
