import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "admin123",
    12
  );
  await prisma.admin.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@ttm.dev" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@ttm.dev",
      password: hashedPassword,
      name: "TTM Admin",
    },
  });
  console.log("✅ Admin user created");

  // Create skills
  const skills = [
    { name: "HTML", category: "frontend", level: 85, order: 1 },
    { name: "CSS", category: "frontend", level: 80, order: 2 },
    { name: "JavaScript", category: "frontend", level: 75, order: 3 },
    { name: "TypeScript", category: "frontend", level: 65, order: 4 },
    { name: "React", category: "frontend", level: 70, order: 5 },
    { name: "Next.js", category: "frontend", level: 60, order: 6 },
    { name: "Node.js", category: "backend", level: 60, order: 7 },
    { name: "Supabase", category: "backend", level: 55, order: 8 },
    { name: "Prisma", category: "backend", level: 50, order: 9 },
    { name: "Git", category: "tools", level: 70, order: 10 },
    { name: "Figma", category: "tools", level: 45, order: 11 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }
  console.log("✅ Skills created");

  // Create projects
  const projects = [
    {
      name: "Portfolio Personal",
      description:
        "Mi primera página web personal donde muestro mis proyectos y habilidades. Diseñada con HTML y CSS puro.",
      imageUrl: "/images/projects/portfolio.jpg",
      technologies: JSON.stringify(["HTML", "CSS", "JavaScript"]),
      featured: true,
      order: 1,
    },
    {
      name: "Task Manager App",
      description:
        "Aplicación de gestión de tareas con funcionalidad CRUD completa. Mi primer proyecto con React y una base de datos real.",
      imageUrl: "/images/projects/taskmanager.jpg",
      technologies: JSON.stringify(["React", "Node.js", "Supabase"]),
      featured: true,
      order: 2,
    },
    {
      name: "Blog Tech",
      description:
        "Un blog sobre tecnología construido con Next.js. Incluye SSR, rutas dinámicas y un CMS sencillo.",
      imageUrl: "/images/projects/blog.jpg",
      technologies: JSON.stringify(["Next.js", "TypeScript", "Prisma"]),
      featured: true,
      order: 3,
    },
    {
      name: "Landing Page Café",
      description:
        "Landing page para una cafetería local. Proyecto freelance donde practiqué diseño responsive y animaciones CSS.",
      imageUrl: "/images/projects/cafe.jpg",
      technologies: JSON.stringify(["HTML", "CSS", "JavaScript"]),
      featured: false,
      order: 4,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log("✅ Projects created");

  // Create testimonials
  const testimonials = [
    {
      name: "Laura García",
      comment:
        "Me hizo una landing page para mi negocio y quedó genial. Muy profesional y atento a los detalles.",
      company: "Café La Esquina",
      rating: 5,
    },
    {
      name: "Carlos Ruiz",
      comment:
        "Trabajamos juntos en un proyecto del bootcamp. Siempre dispuesto a aprender y a ayudar al equipo.",
      company: null,
      rating: 5,
    },
    {
      name: "Ana Martínez",
      comment:
        "Le pedí una web sencilla para mi portfolio de fotografía y superó mis expectativas. Muy recomendable.",
      company: "Ana Martínez Fotografía",
      rating: 4,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log("✅ Testimonials created");

  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
