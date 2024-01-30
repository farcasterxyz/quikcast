import { cookies } from 'next/headers';

import { tokenKey, tokens } from './shared';

export function setCurrentUser({ token, fid }: { token: string; fid: string }) {
  cookies().set(tokenKey, token, { secure: true });
  tokens[token] = fid;
}
