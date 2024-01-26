import { User } from "@shared/types/models";
import { sql } from "kysely";

import { db } from "../database/db";

export async function getProfile({ fid }: { fid: string }) {
  const profile = await db
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
    .execute();
  return profile[0] as User;
}
