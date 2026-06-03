import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const modules = await prisma.module.findMany({
      include: {
        course: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(modules);
  } catch (error) {
    console.error("Error fetching modules:", error);
    return NextResponse.json(
      { error: "Failed to fetch modules" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId, title, description, order } = body;

    const module = await prisma.module.create({
      data: {
        courseId,
        title,
        description,
        order,
      },
    });

    return NextResponse.json(module, { status: 201 });
  } catch (error) {
    console.error("Error creating module:", error);
    const err = error as any;
    if (err.code === "P2003") {
      return NextResponse.json(
        { error: "Invalid course ID" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create module" },
      { status: 500 }
    );
  }
}
