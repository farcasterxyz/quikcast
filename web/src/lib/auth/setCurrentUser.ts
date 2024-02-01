import { setSessionToken } from '@lib/redis/sessions';
import { cookies } from 'next/headers';

import { tokenKey } from './shared';

export async function setCurrentUser({ token, fid }: { token: string; fid: string }) {
  cookies().set(tokenKey, token, { secure: true });
  return setSessionToken({ token, fid });
}
