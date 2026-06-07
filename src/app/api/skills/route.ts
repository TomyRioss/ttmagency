import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const skills = await prisma.skill.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(skills);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const skill = await prisma.skill.create({
    data: {
      name: body.name,
      category: body.category || "frontend",
      level: body.level ?? 50,
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(skill, { status: 201 });
}
