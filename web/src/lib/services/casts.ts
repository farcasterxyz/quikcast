import { sql } from 'kysely';

import { db } from '../database/db';

export function formatHash(hash: Buffer) {
  return hash.toString('hex');
}

export async function getCasts(fid: string, limit = 100) {
  const profile = db
    .selectFrom('user_data')
    .select([
      'fid',
      sql`MAX(CASE WHEN type = 1 THEN value ELSE NULL END)`.as('pfp_url'),
      sql`MAX(CASE WHEN type = 2 THEN value ELSE NULL END)`.as('display_name'),
      sql`MAX(CASE WHEN type = 3 THEN value ELSE NULL END)`.as('bio'),
      sql`MAX(CASE WHEN type = 6 THEN value ELSE NULL END)`.as('username'),
    ])
    .where('deleted_at', 'is', null)
    .where('fid', '=', fid)
    .groupBy('fid')
    .as('profile');

  const casts = await db
    .selectFrom('casts')
    .leftJoin(profile, 'profile.fid', 'casts.fid')
    .select([
      'casts.hash',
      'casts.timestamp',
      'casts.text',
      'casts.embeds',
      'casts.mentions',
      'casts.mentions_positions',
      'casts.fid',
      'profile.pfp_url',
      'profile.display_name',
      'profile.bio',
      'profile.username',
    ])
    .where('casts.fid', '=', fid)
    .where('casts.deleted_at', 'is', null)
    .where('casts.parent_hash', 'is', null)
    .orderBy('casts.timestamp', 'desc')
    .limit(limit)
    .execute();

  return casts.map((row) => {
    const { fid, pfp_url, display_name, bio, username, ...rest } = row;
    return {
      ...rest,
      hash: formatHash(row.hash),
      user: {
        fid,
        pfp_url,
        display_name,
        bio,
        username,
      },
    };
  });
}
