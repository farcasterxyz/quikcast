'use client';

import {
  AuthClientError,
  AuthKitProvider,
  SignInButton,
  StatusAPIResponse,
} from '@farcaster/auth-kit';
import { useState } from 'react';

async function handleSuccess(res: StatusAPIResponse) {
  await fetch('/api/auth/sign-in', {
    method: 'POST',
    body: JSON.stringify({
      message: res.message,
      signature: res.signature,
    }),
  });

  window.location.reload();
}

export default function Login() {
  const [error, setError] = useState<AuthClientError>();

  return (
    <AuthKitProvider
      config={{
        relay: 'https://relay.farcaster.xyz',
        rpcUrl: 'https://mainnet.optimism.io',
        siweUri: 'http://localhost:3000',
        domain: 'localhost:3000',
      }}
    >
      <div className="flex flex-col gap-2">
        <SignInButton onSuccess={handleSuccess} onError={setError} />
        {error && <div className="pt-4 text-red-500">{error.message}</div>}
      </div>
    </AuthKitProvider>
  );
}

function Button() {}
