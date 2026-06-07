import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

  const testimonial = await prisma.testimonial.update({
    where: { id },
    data: {
      name: body.name,
      comment: body.comment,
      company: body.company || null,
      rating: body.rating,
      featured: body.featured,
    },
  });

  return NextResponse.json(testimonial);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.testimonial.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
