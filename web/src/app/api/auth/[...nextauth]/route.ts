import { createAppClient, viemConnector } from '@farcaster/auth-client';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { getProfile } from '../../../../lib/services/user';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign in with Farcaster',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
        csrfToken: {
          type: 'text',
        },
      },
      async authorize(credentials) {
        const appClient = createAppClient({
          ethereum: viemConnector(),
        });

        const verifyResponse = await appClient.verifySignInMessage({
          message: credentials!.message as string,
          signature: credentials!.signature as `0x${string}`,
          domain: 'example.com',
          nonce: credentials!.csrfToken,
        });

        const { success, fid } = verifyResponse;

        if (!success) {
          return null;
        }

        return {
          id: fid.toString(),
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      const profile = await getProfile({ fid: token.sub });
      session.user = profile;
      return session;
    },
  },
};

const auth = NextAuth(authOptions) as any;

export const GET = auth;
export const POST = auth;
