import { hash, compare } from "bcryptjs";
import { jwtSign, jwtVerify } from "./jwt";
import prisma from "./prisma";

export interface AuthPayload {
  userId: string;
  email: string;
  role: string;
}

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword);
}

export async function createSession(
  userId: string,
  expiresAt: Date
): Promise<string> {
  const token = jwtSign({ userId }, expiresAt);

  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  return token;
}

export async function validateSession(token: string): Promise<AuthPayload | null> {
  try {
    const payload = jwtVerify(token) as any;

    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: true,
      },
    });

    if (!session || new Date() > session.expiresAt) {
      // Delete expired session
      if (session) {
        await prisma.session.delete({
          where: { id: session.id },
        });
      }
      return null;
    }

    return {
      userId: session.user.id,
      email: session.user.email,
      role: session.user.role,
    };
  } catch (error) {
    return null;
  }
}

export async function invalidateSession(token: string): Promise<void> {
  await prisma.session.deleteMany({
    where: { token },
  });
}

export async function invalidateAllUserSessions(userId: string): Promise<void> {
  await prisma.session.deleteMany({
    where: { userId },
  });
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ token: string; user: any } | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    // Check if user is admin
    if (user.role !== "admin") {
      return null;
    }

    const expiresAt = new Date(
      Date.now() + (parseInt(process.env.SESSION_EXPIRY_HOURS || "24") * 60 * 60 * 1000)
    );

    const token = await createSession(user.id, expiresAt);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}
