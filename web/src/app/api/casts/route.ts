import { getCasts } from '@lib/services/casts';
import { CastsApiResponse } from '@shared/types/api';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const fid = searchParams.get('fid');
  if (!fid) {
    return NextResponse.json({ error: 'fid is required' }, { status: 400 });
  }
  const payload: CastsApiResponse = { casts: await getCasts({ fid }) };
  return NextResponse.json(payload);
}
