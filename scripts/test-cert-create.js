const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    const cert = await prisma.certificate.create({
      data: {
        serialNumber: "9998",
        rollNumber: "DCA-9998",
        studentName: "TEST",
        fatherName: "F",
        motherName: "M",
        dateOfBirth: "01/01/05",
        gender: "Male",
        courseName: "DCA",
        courseDuration: "6 Months",
        session: "Test",
        grade: "A",
        completionDate: new Date("2026-06-01"),
        issueDate: new Date(),
        verificationCode: "VER9998TEST",
        isValid: true,
      },
    });
    console.log("OK", cert.id);
  } catch (error) {
    console.error("ERR", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
