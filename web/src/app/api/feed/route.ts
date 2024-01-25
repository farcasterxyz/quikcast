import { getFeed } from '@lib/services/feed';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const fid = searchParams.get('fid');
  if (!fid) {
    return NextResponse.json({ error: 'fid is required' }, { status: 400 });
  }
  const feed = await getFeed({ fid });
  return NextResponse.json({ feed });
}
