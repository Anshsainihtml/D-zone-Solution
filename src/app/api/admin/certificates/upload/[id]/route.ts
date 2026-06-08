import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { certificateUrl } = await request.json();

    if (!certificateUrl || typeof certificateUrl !== "string") {
      return NextResponse.json(
        { error: "Certificate URL is required" },
        { status: 400 }
      );
    }

    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        certificateUrl,
      },
    });

    return NextResponse.json(certificate);
  } catch (error) {
    console.error("Error uploading certificate file:", error);
    return NextResponse.json(
      { error: "Failed to upload certificate file" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const certificate = await prisma.certificate.findUnique({
      where: { id },
    });

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
