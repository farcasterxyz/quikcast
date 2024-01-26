"use client";

import {
  AuthClientError,
  AuthKitProvider,
  SignInButton,
  StatusAPIResponse,
} from "@farcaster/auth-kit";
import { getCsrfToken, signIn } from "next-auth/react";
import { useState } from "react";

async function getNonce() {
  const nonce = await getCsrfToken();
  if (!nonce) throw new Error("Unable to generate nonce");
  return nonce;
}

async function handleSuccess(res: StatusAPIResponse) {
  await signIn("credentials", {
    message: res.message,
    signature: res.signature,
    name: res.username,
    pfp: res.pfpUrl,
    redirect: true,
  });
}

export default function Login() {
  const [error, setError] = useState<AuthClientError>();

  return (
    <AuthKitProvider
      config={{
        relay: "https://relay.farcaster.xyz",
        rpcUrl: "https://mainnet.optimism.io",
        siweUri: "http://example.com/login",
        domain: "example.com",
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
