import { AuthKitProvider, useSignIn } from '@farcaster/auth-kit';
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
} from 'react';
import { Linking } from 'react-native';

const AuthContext = createContext<{
  currentUser: User | undefined;
  isSignedIn: boolean;
  signIn: () => Promise<void>;
  token: string | undefined;
}>({
  currentUser: undefined,
  isSignedIn: false,
  signIn: async () => {
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
  | { type: 'signIn' }
  | { type: 'signOut' };

const initialState: State = {
  currentUser: undefined,
  isInitialized: false,
  session: undefined,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'initWitUser':
      return { isInitialized: true, session: action.session };
    case 'initWithoutUser':
      return { isInitialized: true, session: undefined };
    case 'signIn':
      return { ...state };
    case 'signOut':
      return { ...state };
  }
  return state;
}

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProviderContent({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchProfile = useFetchProfile();

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
    if (!url) {
      throw new Error('Expected authkit to provide url');
    }

    if (url) {
      await connect();
      await authKitSignIn(); // Starts polling
      Linking.openURL(url);
    }
  }, [authKitSignIn, connect, url]);

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
        signIn,
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
