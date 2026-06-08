import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  certificateToVerifyResponse,
  normalize,
  parseDate,
} from "@/lib/certificateUtils";

interface CertificateVerifyRequest {
  serialNumber?: string;
  rollNumber?: string;
  studentName?: string;
  fatherName?: string;
  verificationCode?: string;
  dateOfBirth?: string;
}

export async function POST(request: Request) {
  try {
    const {
      serialNumber,
      rollNumber,
      studentName,
      fatherName,
      verificationCode,
      dateOfBirth,
    } = (await request.json()) as CertificateVerifyRequest;

    const normalizedSearch = normalize(
      serialNumber || rollNumber || studentName || fatherName || verificationCode
    );

    if (!normalizedSearch && !(normalizedStudentName && normalizedFatherName)) {
      return NextResponse.json({
        found: false,
        message: "Certificate not found. Please check your details and try again.",
      });
    }

    const certificate = await prisma.certificate.findFirst({
      where: {
        OR: [
          ...(serialNumber
            ? [{ serialNumber: { equals: serialNumber.trim(), mode: "insensitive" as const } }]
            : []),
          ...(rollNumber
            ? [{ rollNumber: { equals: rollNumber.trim(), mode: "insensitive" as const } }]
            : []),
          ...(verificationCode
            ? [{ verificationCode: { equals: verificationCode.trim(), mode: "insensitive" as const } }]
            : []),
          ...(studentName && fatherName
            ? [
                {
                  AND: [
                    { studentName: { equals: studentName.trim(), mode: "insensitive" as const } },
                    { fatherName: { equals: fatherName.trim(), mode: "insensitive" as const } },
                  ],
                },
              ]
            : []),
          ...(normalizedSearch
            ? [
                { serialNumber: { equals: normalizedSearch, mode: "insensitive" as const } },
                { rollNumber: { equals: normalizedSearch, mode: "insensitive" as const } },
                { verificationCode: { equals: normalizedSearch, mode: "insensitive" as const } },
                { rollNumber: { endsWith: normalizedSearch, mode: "insensitive" as const } },
              ]
            : []),
        ],
      },
    });

    if (!certificate) {
      return NextResponse.json({
        found: false,
        message: "Certificate not found. Please check your details and try again.",
      });
    }

    if (!dateOfBirth) {
      return NextResponse.json({
        found: true,
        valid: false,
        message: "Date of birth is required for verification.",
      });
    }

    const inputDob = parseDate(dateOfBirth);
    const certificateDob = parseDate(certificate.dateOfBirth);

    if (
      !inputDob ||
      !certificateDob ||
      inputDob.getTime() !== certificateDob.getTime()
    ) {
      return NextResponse.json({
        found: true,
        valid: false,
        message: "Date of birth does not match the certificate.",
      });
    }

    if (!certificate.isValid) {
      return NextResponse.json({
        found: true,
        valid: false,
        message: "This certificate has been invalidated.",
      });
    }

    return NextResponse.json({
      found: true,
      valid: true,
      certificate: certificateToVerifyResponse(certificate),
    });
  } catch (error) {
    console.error("Certificate verify error:", error);
    return NextResponse.json(
      { error: "Failed to verify certificate" },
      { status: 500 }
    );
  }
}
