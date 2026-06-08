const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Creating admin user...");

  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "anshsainihtml@gmail.com" },
    });

    if (existingAdmin) {
      console.log("✅ Admin user already exists!");
      console.log({
        id: existingAdmin.id,
        email: existingAdmin.email,
        name: existingAdmin.name,
        role: existingAdmin.role,
      });
      return;
    }

    const hashedPassword = await bcrypt.hash("ansh@1234saini", 10);

    const admin = await prisma.user.create({
      data: {
        email: "anshsainihtml@gmail.com",
        name: "Ansh Saini",
        password: hashedPassword,
        role: "admin",
      },
    });

    console.log("✅ Admin user created successfully!");
    console.log({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
