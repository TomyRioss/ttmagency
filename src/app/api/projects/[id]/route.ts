import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// PUT update project
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const project = await prisma.project.update({
    where: { id },
    data: {
      name: body.name,
      description: body.description,
      imageUrl: body.imageUrl,
      liveUrl: body.liveUrl || null,
      repoUrl: body.repoUrl || null,
      technologies: JSON.stringify(body.technologies || []),
      featured: body.featured,
      order: body.order,
    },
  });

  return NextResponse.json(project);
}

// DELETE project
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.project.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
