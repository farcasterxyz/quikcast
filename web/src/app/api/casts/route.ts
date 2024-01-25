import { type NextRequest, NextResponse } from 'next/server';

import { getCasts } from '@/lib/services/casts';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const fid = searchParams.get('fid');
  if (!fid) {
    return NextResponse.json({ error: 'fid is required' }, { status: 400 });
  }
  const casts = await getCasts({ fid });
  return NextResponse.json({ casts });
}
