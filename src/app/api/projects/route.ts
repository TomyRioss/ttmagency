import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET all projects
export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(projects);
}

// POST create project
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const project = await prisma.project.create({
    data: {
      name: body.name,
      description: body.description,
      imageUrl: body.imageUrl || "/images/projects/default.jpg",
      liveUrl: body.liveUrl || null,
      repoUrl: body.repoUrl || null,
      technologies: JSON.stringify(body.technologies || []),
      featured: body.featured ?? true,
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(project, { status: 201 });
}
