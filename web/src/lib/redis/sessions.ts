import { tokenKey } from "@lib/auth/shared";

import { redis } from "./client";

const ttl = 60 * 60 * 24 * 30;

interface Session {
  fid?: string;
}

export async function setSessionToken({
  token,
  fid,
}: {
  token: string;
  fid: string;
}) {
  return redis.set(`${tokenKey}:${token}`, JSON.stringify({ fid }), "EX", ttl);
}

export async function clearSessionToken({ token }: { token: string }) {
  return redis.del(`${tokenKey}:${token}`);
}

export async function getSessionByToken({ token }: { token: string }) {
  const session = (await redis.get(`${tokenKey}:${token}`)) ?? "{}";
  return JSON.parse(session) as Session;
}
