import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.instructorId) {
      return NextResponse.json(
        { error: "Title and instructorId are required" },
        { status: 400 },
      );
    }

    const course = await prisma.course.create({
      data: {
        title: body.title,
        description: body.description || null,
        content: body.content || null,
        imageUrl: body.imageUrl || null,
        instructorId: Number(body.instructorId),
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("POST /api/courses error:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        instructor: {
          select: { id: true, name: true, email: true },
        },
        _count: {
          select: { students: true, lessons: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("GET /api/courses error:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 },
    );
  }
}
