import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, skills, testimonials] = await Promise.all([
    prisma.project.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
    }),
    prisma.skill.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.testimonial.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <ProjectsSection projects={projects} />
        <SkillsSection skills={skills} />
        <TestimonialsSection testimonials={testimonials} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
