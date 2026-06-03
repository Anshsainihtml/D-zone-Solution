import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        modules: true,
        enrollments: {
          include: {
            user: true,
          },
        },
        tests: true,
      },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, slug, description, category, duration, instructor, image } =
      body;

    const course = await prisma.course.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        category,
        duration,
        instructor,
        image,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error updating course:", error);
    const err = error as any;
    if (err.code === "P2025") {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Course slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    const err = error as any;
    if (err.code === "P2025") {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    );
  }
}
