import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyPassword } from "./password";
import {
  createSession,
  destroySession,
  findUserById,
  findUserByUsername,
  getUserIdBySession,
} from "./store";
import type { Role, User } from "./types";

const SESSION_COOKIE = "koperasi_session";

function generateToken(): string {
  return randomBytes(32).toString("hex");
}

export function login(username: string, password: string): User | null {
  const user = findUserByUsername(username);
  if (!user || !verifyPassword(user.password, password)) return null;
  const token = generateToken();
  createSession(user.id, token);
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return user;
}

export function logout(): void {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (token) destroySession(token);
  cookies().delete(SESSION_COOKIE);
}

export function getCurrentUser(): User | null {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const userId = getUserIdBySession(token);
  if (!userId) return null;
  return findUserById(userId) ?? null;
}

export function requireUser(): User {
  const user = getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export function requireRole(role: Role): User {
  const user = requireUser();
  if (user.role !== role) {
    redirect(user.role === "pengurus" ? "/pengurus" : "/anggota");
  }
  return user;
}
