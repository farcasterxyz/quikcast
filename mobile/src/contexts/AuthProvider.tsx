import {
  AuthKitProvider,
  StatusAPIResponse,
  useSignIn,
} from '@farcaster/auth-kit';
import { FullscreenLoader } from '@mobile/components/loader/FullscreenLoader';
import { useFetchProfile } from '@mobile/hooks/data/profile';
import { User } from '@shared/types/models';
import * as SecureStore from 'expo-secure-store';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { Linking } from 'react-native';

const AuthContext = createContext<{
  currentUser: User | undefined;
  isSignedIn: boolean;
  requestSignIn: () => Promise<void>;
  signOut: () => Promise<void>;
  token: string | undefined;
}>({
  currentUser: undefined,
  isSignedIn: false,
  requestSignIn: async () => {
    throw new Error(
      'You need to add an AuthProvider to the top of your React tree.',
    );
  },
  signOut: async () => {
    throw new Error(
      'You need to add an AuthProvider to the top of your React tree.',
    );
  },
  token: undefined,
});

type Session = {
  fid: string;
  token: string;
};

type State = {
  currentUser: User | undefined;
  isInitialized: boolean;
  session: Session | undefined;
};

type Action =
  | { type: 'initWitUser'; session: Session; user: User }
  | { type: 'initWithoutUser' }
  | { type: 'signIn'; session: Session; user: User }
  | { type: 'signOut' };

const initialState: State = {
  currentUser: undefined,
  isInitialized: false,
  session: undefined,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'initWitUser':
      return {
        currentUser: action.user,
        isInitialized: true,
        session: action.session,
      };
    case 'initWithoutUser':
      return {
        currentUser: undefined,
        isInitialized: true,
        session: undefined,
      };
    case 'signIn':
      return { ...state, currentUser: action.user, session: action.session };
    case 'signOut':
      return { ...state, session: undefined, currentUser: undefined };
  }
  return state;
}

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProviderContent({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchProfile = useFetchProfile();
  const hasConnectedRef = useRef(false);
  const hasLinkedUserRef = useRef(false);

  const {
    connect,
    url,
    signIn: authKitSignIn,
  } = useSignIn({
    onSuccess: useCallback(
      async (res: StatusAPIResponse) => {
        const signInResponse = await fetch(
          'http://localhost:3000/api/auth/sign-in',
          {
            method: 'POST',
            body: JSON.stringify({
              message: res.message,
              nonce: res.nonce,
              signature: res.signature,
            }),
          },
        );

        if (signInResponse.ok) {
          const { token, fid }: { token: string; fid: string } =
            await signInResponse.json();

          const { profile: user } = await fetchProfile({ fid });
          dispatch({ type: 'signIn', session: { token, fid }, user });
        } else {
          alert('Sign in failed');
        }
      },
      [fetchProfile],
    ),
  });

  const requestSignIn = useCallback(async () => {
    if (!hasConnectedRef.current) {
      hasConnectedRef.current = true;
      connect();
    }
  }, [connect, hasConnectedRef]);

  useEffect(() => {
    if (url) {
      authKitSignIn();
      if (!hasLinkedUserRef.current) {
        hasLinkedUserRef.current = true;
        Linking.openURL(url);
      }
    }
  }, [authKitSignIn, url]);

  const signOut = useCallback(async () => {
    await fetch('http://localhost:3000/api/auth/sign-out', { method: 'POST' });
  }, []);

  const init = useCallback(async () => {
    const persistedSessionJson = await SecureStore.getItemAsync('session');

    if (persistedSessionJson) {
      try {
        const persistedSession: Session = JSON.parse(persistedSessionJson);
        const { profile: user } = await fetchProfile({
          fid: persistedSession.fid,
        });

        return dispatch({
          type: 'initWitUser',
          session: persistedSession,
          user,
        });
      } catch (error) {
        console.error(error);
      }
    }

    dispatch({ type: 'initWithoutUser' });
  }, [fetchProfile]);

  useEffect(() => {
    init();
  }, [init]);

  if (!state.isInitialized) {
    return <FullscreenLoader />;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser: state.currentUser,
        isSignedIn: !!state.session,
        requestSignIn,
        signOut,
        token: state.session?.token,
      }}
    >
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
