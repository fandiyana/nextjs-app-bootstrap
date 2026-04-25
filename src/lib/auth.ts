import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findUserById, findUserByUsername } from "./store";
import type { Role, User } from "./types";

const SESSION_COOKIE = "koperasi_session";

export function login(username: string, password: string): User | null {
  const user = findUserByUsername(username);
  if (!user || user.password !== password) return null;
  cookies().set(SESSION_COOKIE, user.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return user;
}

export function logout(): void {
  cookies().delete(SESSION_COOKIE);
}

export function getCurrentUser(): User | null {
  const id = cookies().get(SESSION_COOKIE)?.value;
  if (!id) return null;
  return findUserById(id) ?? null;
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
