import { type NextRequest, NextResponse } from 'next/server';

import { getProfile } from '@/lib/services/user';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const fid = searchParams.get('fid');
  if (!fid) {
    return NextResponse.json({ error: 'fid is required' }, { status: 400 });
  }
  const profile = await getProfile(fid);
  return NextResponse.json({ profile });
}
