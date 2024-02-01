import { createAppClient, viemConnector } from '@farcaster/auth-client';
import { setCurrentUser } from '@lib/auth/setCurrentUser';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

type RequestBody = {
  message: string;
  signature: `0x${string}`;
  nonce: string;
};

export async function POST(request: Request) {
  const { message, signature, nonce }: RequestBody = await request.json();

  const appClient = createAppClient({
    ethereum: viemConnector(),
  });

  const verifyResult = await appClient.verifySignInMessage({
    domain: 'localhost:3000',
    message,
    nonce,
    signature,
  });

  if (verifyResult.isError) {
    return NextResponse.json(verifyResult.error?.message || 'Sign in failed', {
      status: 401,
    });
  }

  const token = randomUUID();
  const fid = verifyResult.fid.toString();

  await setCurrentUser({ token, fid });

  return NextResponse.json({ fid, token });
}
