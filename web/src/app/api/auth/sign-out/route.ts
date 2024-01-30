import { clearCurrentUser } from '@lib/auth/clearCurrentUser';
import { NextResponse } from 'next/server';

export async function POST() {
  clearCurrentUser();
  return NextResponse.json({ success: true });
}
