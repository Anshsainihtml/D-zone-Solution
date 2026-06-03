import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [totalUsers, totalCourses, totalEnrollments, totalTests, totalQuestions] =
      await Promise.all([
        prisma.user.count(),
        prisma.course.count(),
        prisma.enrollment.count(),
        prisma.test.count(),
        prisma.question.count(),
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
      pendingCertificates: 0,
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
