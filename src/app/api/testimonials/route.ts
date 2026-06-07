import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const testimonial = await prisma.testimonial.create({
    data: {
      name: body.name,
      comment: body.comment,
      company: body.company || null,
      avatarUrl: body.avatarUrl || null,
      rating: body.rating ?? 5,
      featured: body.featured ?? true,
    },
  });

  return NextResponse.json(testimonial, { status: 201 });
}
