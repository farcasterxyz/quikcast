import { getFeed } from "@lib/services/feed";
import { FeedApiResponse } from "@shared/types/api";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const fid = new URL(request.url).searchParams.get("fid");
  if (!fid) {
    return NextResponse.json({ error: "fid is required" }, { status: 400 });
  }
  const payload: FeedApiResponse = { feed: await getFeed({ fid }) };
  return NextResponse.json(payload);
}
