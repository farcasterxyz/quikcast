import { AuthKitProvider, useSignIn } from '@farcaster/auth-kit';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Linking } from 'react-native';

const AuthContext = createContext<{
  isSignedIn: boolean;
  signIn: () => Promise<void>;
  token: string | undefined;
}>({
  isSignedIn: false,
  signIn: async () => {
    throw new Error(
      'You need to add an AuthProvider to the top of your React tree.',
    );
  },
  token: undefined,
});

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProviderContent({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string>();

  const {
    connect,
    url,
    signIn: authKitSignIn,
  } = useSignIn({
    onSuccess: (res) => {
      // setToken(res);
    },
  });
  const signIn = useCallback(async () => {
    // if (url) {
    await connect();
    await authKitSignIn(); // Starts polling
    Linking.openURL(url);
    // }
  }, [authKitSignIn, connect, url]);

  return (
    <AuthContext.Provider value={{ isSignedIn: !!token, signIn, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider(props: AuthProviderProps) {
  return (
    <AuthKitProvider
      config={{
        relay: 'https://relay.farcaster.xyz',
        rpcUrl: 'https://mainnet.optimism.io',
        siweUri: 'http://localhost:3000',
        domain: 'localhost:3000',
      }}
    >
      <AuthProviderContent {...props} />
    </AuthKitProvider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
