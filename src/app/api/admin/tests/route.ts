import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const tests = await prisma.test.findMany({
      include: {
        course: true,
        questions: true,
        results: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(tests);
  } catch (error) {
    console.error("Error fetching tests:", error);
    return NextResponse.json(
      { error: "Failed to fetch tests" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, courseId, module, totalQuestions, description } = body;

    const test = await prisma.test.create({
      data: {
        title,
        slug,
        courseId,
        module,
        totalQuestions,
        description,
      },
    });

    return NextResponse.json(test, { status: 201 });
  } catch (error) {
    console.error("Error creating test:", error);
    return NextResponse.json(
      { error: "Failed to create test" },
      { status: 500 }
    );
  }
}
