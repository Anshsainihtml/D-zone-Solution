import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

/**
 * IMPORTANT: Run this script to create the first admin user
 * Usage: npx ts-node scripts/create-admin.ts
 * 
 * This will create an admin user with:
 * Email: admin@example.com
 * Password: Admin@123
 */

async function main() {
  console.log("Creating admin user...");

  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@example.com" },
    });

    if (existingAdmin) {
      console.log("Admin user already exists!");
      return;
    }

    const hashedPassword = await hashPassword("Admin@123");

    const admin = await prisma.user.create({
      data: {
        email: "admin@example.com",
        name: "Admin User",
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
    console.error("Error creating admin user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
