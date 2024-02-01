import { clearSessionToken } from "@lib/redis/sessions";
import { cookies } from "next/headers";

import { getTokenFromCookieOrHeader } from "./getTokenFromCookieOrHeader";
import { tokenKey } from "./shared";

export async function clearCurrentUser() {
  const token = getTokenFromCookieOrHeader();

  cookies().delete(tokenKey);

  if (token) {
    await clearSessionToken({ token });
  }
}
