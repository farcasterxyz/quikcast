import { AuthKitProvider } from '@farcaster/auth-kit';
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

const sessionKey = 'session';

type SignInParams = {
  message: string;
  nonce: string;
  signature: string;
};

type Session = {
  fid: string;
  token: string;
};

type State =
  | { isInitialized: false; currentUser: undefined; session: undefined }
  | {
      isInitialized: true;
      currentUser: undefined;
      session: undefined;
    }
  | {
      currentUser: User;
      isInitialized: true;
      session: Session;
    };

type Action =
  | { type: 'onSignIn'; session: Session; user: User }
  | { type: 'onSignOut' };

type AuthContextMethods = {
  signIn: (params: SignInParams) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthContextValue = AuthContextMethods &
  Pick<State, 'currentUser' | 'session'>;

type AuthenticatedAuthContextValue = AuthContextMethods & {
  currentUser: User;
  session: Session;
};

const AuthContext = createContext<AuthContextValue>({
  currentUser: undefined,
  session: undefined,
  signIn: async () => undefined,
  signOut: async () => undefined,
});

const initialState: State = {
  currentUser: undefined,
  isInitialized: false,
  session: undefined,
};

function reducer(_state: State, action: Action): State {
  switch (action.type) {
    case 'onSignIn':
      return {
        isInitialized: true,
        currentUser: action.user,
        session: action.session,
      };
    case 'onSignOut':
      return {
        isInitialized: true,
        session: undefined,
        currentUser: undefined,
      };
  }
}

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProviderContent({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchProfile = useFetchProfile();

  const signIn = useCallback(
    async (body: SignInParams) => {
      const reject = (message: string) => {
        throw new Error(`Sign in failed: ${message}`);
      };

      try {
        const signInResponse = await fetch(
          'http://localhost:3000/api/auth/sign-in',
          {
            method: 'POST',
            body: JSON.stringify(body),
          },
        );

        if (!signInResponse.ok) {
          reject(await signInResponse.text());
        }

        const session: Session = await signInResponse.json();
        await SecureStore.setItemAsync(sessionKey, JSON.stringify(session));
        const { profile: user } = await fetchProfile({ fid: session.fid });
        dispatch({ type: 'onSignIn', session, user });
      } catch (error) {
        reject((error as Error).message);
      }
    },
    [fetchProfile],
  );

  const signOut = useCallback(async () => {
    SecureStore.deleteItemAsync(sessionKey);
    if (state.session) {
      await fetch('http://localhost:3000/api/auth/sign-out', {
        method: 'POST',
      });
    }

    dispatch({ type: 'onSignOut' });
  }, [state.session]);

  const init = useCallback(async () => {
    const persistedSessionJson = await SecureStore.getItemAsync(sessionKey);

    if (persistedSessionJson) {
      try {
        const session: Session = JSON.parse(persistedSessionJson);
        const { profile: user } = await fetchProfile({ fid: session.fid });
        dispatch({ type: 'onSignIn', session, user });
      } catch (error) {
        console.error(error);
        dispatch({ type: 'onSignOut' });
      }
    } else {
      dispatch({ type: 'onSignOut' });
    }
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
        session: state.session,
        signIn,
        signOut,
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

export function useAuthed() {
  return useContext(AuthContext) as AuthenticatedAuthContextValue;
}
