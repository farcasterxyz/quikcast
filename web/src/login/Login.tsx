'use client';

import {
  AuthClientError,
  AuthKitProvider,
  SignInButton,
  StatusAPIResponse,
} from '@farcaster/auth-kit';
import { signIn, getCsrfToken } from 'next-auth/react';
import { useState } from 'react';

async function getNonce() {
  const nonce = await getCsrfToken();
  if (!nonce) throw new Error('Unable to generate nonce');
  return nonce;
}

async function handleSuccess(res: StatusAPIResponse) {
  const signInResponse = await signIn('credentials', {
    message: res.message,
    signature: res.signature,
    name: res.username,
    pfp: res.pfpUrl,
    redirect: false,
  });
  console.log({ signInResponse });
}

export default function Login() {
  const [error, setError] = useState<AuthClientError>();

  return (
    <AuthKitProvider
      config={{
        relay: 'https://relay.farcaster.xyz',
        rpcUrl: 'https://mainnet.optimism.io',
        siweUri: 'http://example.com/login',
        domain: 'example.com',
      }}
    >
      <SignInButton
        nonce={getNonce}
        onSuccess={handleSuccess}
        onError={setError}
      />
      {error && <div className="pt-4 text-red-500">{error.message}</div>}
    </AuthKitProvider>
  );
}
