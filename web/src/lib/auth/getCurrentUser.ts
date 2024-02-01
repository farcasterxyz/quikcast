import { getSessionByToken } from '@lib/redis/sessions';
import { getProfile } from '@lib/services/user';
import { User } from '@shared/types/models';

import { getTokenFromCookieOrHeader } from './getTokenFromCookieOrHeader';

export async function getCurrentUser(): Promise<User | null> {
  const token = getTokenFromCookieOrHeader();

  if (!token) {
    return null;
  }

  const res = await getSessionByToken({ token });
  const { fid } = res;

  if (!fid) {
    return null;
  }

  return getProfile({ fid });
}
