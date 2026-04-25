import { NextResponse } from "next/server";
import { logout } from "@/lib/auth";

export async function POST(request: Request) {
  logout();
  const url = new URL("/login", request.url);
  return NextResponse.redirect(url, { status: 303 });
}

export async function GET(request: Request) {
  // Do NOT destroy the session on GET to avoid CSRF-based forced logout
  // (cross-origin <img>/<link rel="prefetch"> could otherwise log users out).
  // The app's UI uses POST via a form in AppShell.
  const url = new URL("/login", request.url);
  return NextResponse.redirect(url, { status: 303 });
}
