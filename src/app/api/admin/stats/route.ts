import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [totalUsers, totalCourses, totalEnrollments, totalTests, totalQuestions, issuedCertificates, revokedCertificates] =
      await Promise.all([
        prisma.user.count(),
        prisma.course.count(),
        prisma.enrollment.count(),
        prisma.test.count(),
        prisma.question.count(),
        prisma.certificate.count({ where: { isValid: true } }),
        prisma.certificate.count({ where: { isValid: false } }),
      ]);

    const activeStudents = await prisma.user.count({
      where: { role: "student" },
    });

    const stats = {
      totalUsers,
      totalCourses,
      totalEnrollments,
      totalTests,
      totalQuestions,
      activeStudents,
      pendingCertificates: revokedCertificates,
      issuedCertificates,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
