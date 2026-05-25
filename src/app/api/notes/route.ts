import { NextResponse } from "next/server"
import { notes } from "@/lib/notes"

export async function GET() {
  return NextResponse.json({ notes })
}
