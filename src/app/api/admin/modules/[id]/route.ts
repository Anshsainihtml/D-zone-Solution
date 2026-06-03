import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.module.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Module deleted successfully" });
  } catch (error) {
    console.error("Error deleting module:", error);
    const err = error as any;
    if (err.code === "P2025") {
      return NextResponse.json(
        { error: "Module not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to delete module" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { title, description, order } = body;

    const module = await prisma.module.update({
      where: { id },
      data: {
        title,
        description,
        order,
      },
    });

    return NextResponse.json(module);
  } catch (error) {
    console.error("Error updating module:", error);
    const err = error as any;
    if (err.code === "P2025") {
      return NextResponse.json(
        { error: "Module not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update module" },
      { status: 500 }
    );
  }
}
