import { cookies, headers } from 'next/headers';

import { tokenKey } from './shared';

export function getTokenFromCookieOrHeader(): string | null {
  return cookies().get(tokenKey)?.value || headers().get(tokenKey);
}
