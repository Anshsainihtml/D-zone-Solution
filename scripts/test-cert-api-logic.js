const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function generateNextSerialNumber() {
  const certificates = await prisma.certificate.findMany({
    select: { serialNumber: true },
  });

  let max = 1000;
  for (const cert of certificates) {
    const numeric = parseInt(cert.serialNumber, 10);
    if (Number.isFinite(numeric) && numeric > max) {
      max = numeric;
    }
  }
  return String(max + 1);
}

async function main() {
  const body = {
    studentName: "TEST USER 2",
    fatherName: "TEST FATHER",
    motherName: "TEST MOTHER",
    dateOfBirth: "01/01/05",
    gender: "Male",
    courseName: "DCA",
    courseDuration: "6 Months",
    session: "Jan-June 2026",
    grade: "A",
    completionDate: "2026-06-01",
    issueDate: "2026-06-06",
    isValid: true,
  };

  try {
    const serialNumber = await generateNextSerialNumber();
    console.log("next serial:", serialNumber);

    const existing = await prisma.certificate.findUnique({
      where: { serialNumber },
    });
    console.log("existing for serial:", existing?.id || "none");

    const rollNumber = `DCA-${serialNumber}`;
    const verificationCode = `VER${serialNumber}${String(Date.now()).slice(-3)}`;

    const certificate = await prisma.certificate.create({
      data: {
        serialNumber,
        rollNumber,
        studentName: body.studentName.trim(),
        fatherName: body.fatherName?.trim() || "",
        motherName: body.motherName?.trim() || "",
        dateOfBirth: body.dateOfBirth.trim(),
        gender: body.gender?.trim() || "",
        courseName: body.courseName.trim(),
        courseDuration: body.courseDuration?.trim() || "6 Months",
        session: body.session?.trim() || "",
        grade: body.grade?.trim() || "",
        completionDate: new Date(body.completionDate),
        issueDate: body.issueDate ? new Date(body.issueDate) : new Date(),
        verificationCode,
        isValid: body.isValid !== false,
      },
    });
    console.log("OK", certificate.id);
  } catch (error) {
    console.error("ERR code:", error.code, "message:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
