import { clearCurrentUser } from '@lib/auth/clearCurrentUser';
import { NextResponse } from 'next/server';

export async function POST() {
  await clearCurrentUser();
  return NextResponse.json({ success: true });
}
