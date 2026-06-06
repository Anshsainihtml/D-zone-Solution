import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateSession } from "@/lib/auth";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    redirect("/login");
  }

  const auth = await validateSession(token);

  if (!auth || auth.role !== "admin") {
    redirect("/login");
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
