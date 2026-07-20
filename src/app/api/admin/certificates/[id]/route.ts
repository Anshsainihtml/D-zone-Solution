import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const certificate = await prisma.certificate.findUnique({ where: { id } });

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(certificate);
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificate" },
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
    const {
      serialNumber,
      rollNumber,
      studentName,
      fatherName,
      motherName,
      dateOfBirth,
      gender,
      courseName,
      courseDuration,
      session,
      grade,
      completionDate,
      issueDate,
      verificationCode,
      isValid,
    } = body;

    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        serialNumber,
        rollNumber,
        studentName,
        fatherName: fatherName || "",
        motherName: motherName || "",
        dateOfBirth,
        gender: gender || "",
        courseName,
        courseDuration: courseDuration || "6 Months",
        session: session || "",
        grade: grade || "",
        completionDate: new Date(completionDate),
        issueDate: issueDate ? new Date(issueDate) : undefined,
        verificationCode,
        isValid: isValid !== false,
      },
    });

    return NextResponse.json(certificate);
  } catch (error) {
    console.error("Error updating certificate:", error);
    const err = error as { code?: string };
    if (err.code === "P2025") {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Serial number, roll number, or verification code already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update certificate" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { isValid } = await request.json();

    const certificate = await prisma.certificate.update({
      where: { id },
      data: { isValid: Boolean(isValid) },
    });

    return NextResponse.json(certificate);
  } catch (error) {
    console.error("Error updating certificate status:", error);
    const err = error as { code?: string };
    if (err.code === "P2025") {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update certificate status" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.certificate.delete({ where: { id } });
    return NextResponse.json({ message: "Certificate deleted successfully" });
  } catch (error) {
    console.error("Error deleting certificate:", error);
    const err = error as { code?: string };
    if (err.code === "P2025") {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to delete certificate" },
      { status: 500 }
    );
  }
}
