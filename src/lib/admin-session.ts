import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "blog-admin-session";

function safeEqual(value: string, expected: string) {
  const left = Buffer.from(value);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function validateAdminPassword(password: string) {
  const expected = process.env.BLOG_ADMIN_PASSWORD;
  return Boolean(expected && safeEqual(password, expected));
}

export function createAdminSessionToken() {
  const password = process.env.BLOG_ADMIN_PASSWORD;
  const secret = process.env.BLOG_ADMIN_SECRET;
  if (!password || !secret) throw new Error("Admin credentials are not configured");
  return createHmac("sha256", secret).update(password).digest("hex");
}

export function isValidAdminSession(token: string | undefined) {
  if (!token || !process.env.BLOG_ADMIN_PASSWORD || !process.env.BLOG_ADMIN_SECRET) return false;
  return safeEqual(token, createAdminSessionToken());
}

export async function hasAdminSession() {
  const jar = await cookies();
  return isValidAdminSession(jar.get(COOKIE_NAME)?.value);
}

export const adminCookieName = COOKIE_NAME;
