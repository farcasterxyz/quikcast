import { getProfile } from '@lib/services/user';
import { ProfileApiResponse } from '@shared/types/api';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params: { fid } }: { params: { fid: string } },
) {
  if (!fid) {
    return NextResponse.json({ error: 'fid is required' }, { status: 400 });
  }

  const payload: ProfileApiResponse = { profile: await getProfile({ fid }) };
  return NextResponse.json(payload);
}
