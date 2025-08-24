"use server";

import { cookies } from "next/headers";
import crypto from "crypto";
import { getEnv } from "./utils";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24; // 1 day

function sign(value: string, secret: string): string {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(value);
  return hmac.digest("hex");
}

export async function loginWithCredentials(username: string, password: string) {
  const envUser = getEnv("ADMIN_USERNAME");
  const envPass = getEnv("ADMIN_PASSWORD");
  const secret = getEnv("AUTH_SECRET");

  if (username !== envUser || password !== envPass) {
    return { ok: false as const, error: "Geçersiz kullanıcı adı veya şifre" };
  }

  const payload = JSON.stringify({ u: username, iat: Date.now() });
  const signature = sign(payload, secret);
  const token = Buffer.from(`${payload}.${signature}`).toString("base64url");

  (await cookies()).set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
    secure: process.env.NODE_ENV === "production",
  });

  return { ok: true as const };
}

export async function isAuthenticated(): Promise<boolean> {
  const cookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!cookie) return false;

  try {
    const secret = getEnv("AUTH_SECRET");
    const raw = Buffer.from(cookie, "base64url").toString("utf8");
    const [payload, signature] = raw.split(".");
    if (!payload || !signature) return false;

    const expected = sign(payload, secret);
    if (
      !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
    ) {
      return false;
    }

    const data = JSON.parse(payload) as { u: string; iat: number };
    if (!data?.u || !data?.iat) return false;

    const ageSeconds = (Date.now() - data.iat) / 1000;
    if (ageSeconds > SESSION_TTL_SECONDS) return false;

    return true;
  } catch {
    return false;
  }
}

export async function logout() {
  (await cookies()).set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
  });
}
