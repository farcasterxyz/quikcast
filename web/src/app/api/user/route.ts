import { getProfile } from '@lib/services/user';
import { ProfileApiResponse } from '@shared/types/api';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const fid = searchParams.get('fid');
  if (!fid) {
    return NextResponse.json({ error: 'fid is required' }, { status: 400 });
  }
  const payload: ProfileApiResponse = { profile: await getProfile({ fid }) };
  return NextResponse.json(payload);
}