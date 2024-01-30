import { createAppClient, viemConnector } from '@farcaster/auth-kit';
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

  if (!verifyResult.success) {
    return NextResponse.json(verifyResult.error || 'Sign in failed', {
      status: 401,
    });
  }

  const token = window.crypto.randomUUID();

  return NextResponse.json({
    id: verifyResult.fid.toString(),
    token,
  });
}
