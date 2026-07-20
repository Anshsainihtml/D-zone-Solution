import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import {
  buildRollNumber,
  buildVerificationCode,
  generateNextSerialNumber,
} from "@/lib/certificateUtils";

function parseRequiredDate(value: string, fieldName: string) {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) {
    throw new Error(`Invalid ${fieldName}`);
  }
  return date;
}

function cleanOptionalString(value: unknown) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim();

    const certificates = await prisma.certificate.findMany({
      where: search
        ? {
            OR: [
              { studentName: { contains: search, mode: "insensitive" } },
              { serialNumber: { contains: search, mode: "insensitive" } },
              { rollNumber: { contains: search, mode: "insensitive" } },
              { verificationCode: { contains: search, mode: "insensitive" } },
              { courseName: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(certificates);
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
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
      serialNumber: inputSerial,
      rollNumber: inputRoll,
      verificationCode: inputCode,
      isValid,
    } = body;

    if (!studentName?.trim() || !courseName?.trim() || !dateOfBirth?.trim() || !completionDate) {
      return NextResponse.json(
        { error: "Student name, course, date of birth, and completion date are required" },
        { status: 400 }
      );
    }

    const serialNumber =
      cleanOptionalString(inputSerial) ||
      (await generateNextSerialNumber(() =>
        prisma.certificate.findMany({
          select: { serialNumber: true },
        })
      ));

    const rollNumber =
      cleanOptionalString(inputRoll) || buildRollNumber(courseName, serialNumber);
    const verificationCode =
      cleanOptionalString(inputCode) || buildVerificationCode(serialNumber);

    const certificate = await prisma.certificate.create({
      data: {
        serialNumber,
        rollNumber,
        studentName: studentName.trim(),
        fatherName: fatherName?.trim() || "",
        motherName: motherName?.trim() || "",
        dateOfBirth: dateOfBirth.trim(),
        gender: gender?.trim() || "",
        courseName: courseName.trim(),
        courseDuration: courseDuration?.trim() || "6 Months",
        session: session?.trim() || "",
        grade: grade?.trim() || "",
        completionDate: parseRequiredDate(completionDate, "completion date"),
        issueDate: issueDate
          ? parseRequiredDate(issueDate, "issue date")
          : new Date(),
        verificationCode,
        isValid: isValid !== false,
      },
    });

    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    console.error("Error creating certificate:", error);
    const err = error as { code?: string; message?: string };

    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Serial number, roll number, or verification code already exists" },
        { status: 409 }
      );
    }

    if (err.message?.startsWith("Invalid ")) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: err.message || "Failed to create certificate" },
      { status: 500 }
    );
  }
}
