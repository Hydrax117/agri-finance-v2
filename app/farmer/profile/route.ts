import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();

  if (!session?.user) {
    return NextResponse.redirect("/login");
  }

  return NextResponse.next();
}
