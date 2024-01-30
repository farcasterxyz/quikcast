import { Embeds } from "@shared/types/models";
import { sql } from "kysely";

import { db } from "../database/db";
import { processEmbeds } from "./embeds";

export function formatHash(hash: Buffer) {
  return hash.toString("hex");
}

export async function getCasts({
  fid,
  limit = 25,
}: {
  fid: string;
  limit?: number;
}) {
  const profile = db
    .selectFrom("user_data")
    .select([
      "fid",
      sql`MAX(CASE WHEN type = 1 THEN value ELSE NULL END)`.as("pfp_url"),
      sql`MAX(CASE WHEN type = 2 THEN value ELSE NULL END)`.as("display_name"),
      sql`MAX(CASE WHEN type = 3 THEN value ELSE NULL END)`.as("bio"),
      sql`MAX(CASE WHEN type = 6 THEN value ELSE NULL END)`.as("username"),
    ])
    .where("deleted_at", "is", null)
    .where("fid", "=", fid)
    .groupBy("fid")
    .as("profile");

  const casts = await db
    .selectFrom("casts")
    .leftJoin(profile, "profile.fid", "casts.fid")
    .select([
      "casts.hash",
      "casts.timestamp",
      "casts.text",
      "casts.embeds",
      "casts.mentions",
      "casts.mentions_positions",
      "casts.fid",
      "profile.pfp_url",
      "profile.display_name",
      "profile.bio",
      "profile.username",
    ])
    .where("casts.fid", "=", fid)
    .where("casts.deleted_at", "is", null)
    .where("casts.parent_hash", "is", null)
    .orderBy("casts.timestamp", "desc")
    .limit(limit)
    .execute();

  return casts.map((row) => {
    const { fid, pfp_url, display_name, bio, username, embeds, ...rest } = row;
    return {
      ...rest,
      hash: formatHash(row.hash),
      embeds: processEmbeds(row.embeds as any) as Embeds,
      user: {
        fid,
        pfp_url: pfp_url as string,
        display_name: display_name as string,
        bio: bio as string,
        username: username as string,
      },
    };
  });
}
