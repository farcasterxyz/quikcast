import { getProfile } from '@lib/services/user';
import { User } from '@shared/types/models';

import { getTokenFromCookieOrHeader } from './getTokenFromCookieOrHeader';
import { tokens } from './shared';

export async function getCurrentUser(): Promise<User | null> {
  const token = getTokenFromCookieOrHeader();

  if (!token) {
    return null;
  }

  const fid = tokens[token];

  if (!fid) {
    return null;
  }

  return getProfile({ fid });
}
