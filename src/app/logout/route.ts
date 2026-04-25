import { NextResponse } from "next/server";
import { logout } from "@/lib/auth";

export async function POST(request: Request) {
  logout();
  const url = new URL("/login", request.url);
  return NextResponse.redirect(url, { status: 303 });
}

export async function GET(request: Request) {
  logout();
  const url = new URL("/login", request.url);
  return NextResponse.redirect(url, { status: 303 });
}
