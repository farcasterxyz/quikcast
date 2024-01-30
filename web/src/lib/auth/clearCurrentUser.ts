import { cookies } from 'next/headers';

import { getTokenFromCookieOrHeader } from './getTokenFromCookieOrHeader';
import { tokenKey, tokens } from './shared';

export function clearCurrentUser() {
  const token = getTokenFromCookieOrHeader();

  cookies().delete(tokenKey);

  if (token) {
    delete tokens[token];
  }
}
