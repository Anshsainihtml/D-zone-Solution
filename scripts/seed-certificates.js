const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const sampleCertificates = [
  {
    serialNumber: "1442",
    rollNumber: "DFA-1442",
    studentName: "PRIYA PATEL",
    fatherName: "RAMESH PATEL",
    motherName: "SUNITA PATEL",
    dateOfBirth: "15/07/04",
    gender: "Female",
    courseName: "DFA",
    courseDuration: "6 Months",
    session: "July-December (2025)",
    grade: "A",
    completionDate: new Date("2025-12-31"),
    issueDate: new Date("2026-01-05"),
    verificationCode: "VER1442002",
    isValid: true,
  },
  {
    serialNumber: "1443",
    rollNumber: "CCC-1443",
    studentName: "AMIT KUMAR",
    fatherName: "SURESH KUMAR",
    motherName: "REKHA KUMAR",
    dateOfBirth: "20/01/05",
    gender: "Male",
    courseName: "CCC",
    courseDuration: "6 Months",
    session: "July-December (2025)",
    grade: "A+",
    completionDate: new Date("2025-12-31"),
    issueDate: new Date("2026-01-05"),
    verificationCode: "VER1443003",
    isValid: true,
  },
  {
    serialNumber: "1444",
    rollNumber: "DCA-1444",
    studentName: "RAVI SINGH",
    fatherName: "ARUN SINGH",
    motherName: "MEENA SINGH",
    dateOfBirth: "12/06/04",
    gender: "Male",
    courseName: "DCA",
    courseDuration: "6 Months",
    session: "July-December (2025)",
    grade: "A",
    completionDate: new Date("2025-12-31"),
    issueDate: new Date("2026-01-05"),
    verificationCode: "VER1444004",
    isValid: true,
  },
];

async function main() {
  console.log("Seeding certificates...");

  for (const cert of sampleCertificates) {
    const existing = await prisma.certificate.findUnique({
      where: { serialNumber: cert.serialNumber },
    });

    if (existing) {
      console.log(`Certificate ${cert.serialNumber} already exists, skipping.`);
      continue;
    }

    await prisma.certificate.create({ data: cert });
    console.log(`Created certificate ${cert.serialNumber} - ${cert.studentName}`);
  }

  const count = await prisma.certificate.count();
  console.log(`Done. Total certificates in database: ${count}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
