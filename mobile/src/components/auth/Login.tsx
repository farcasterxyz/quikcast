import {
  AuthClientError,
  StatusAPIResponse,
  useSignIn,
} from '@farcaster/auth-kit';
import { useAuth } from '@mobile/contexts/AuthProvider';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';

import { Loader } from '../loader/Loader';

export function Login() {
  const { signIn } = useAuth();

  const hasInitiatedConnectRef = useRef(false);
  const hasStartedPollingRef = useRef(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const {
    connect,
    isError: isConnectError,
    reconnect,
    signIn: startPolling,
    url,
  } = useSignIn({
    onSuccess: useCallback(
      async (req: StatusAPIResponse) => {
        try {
          signIn({
            message: req.message!,
            nonce: req.nonce!,
            signature: req.signature!,
          });
        } catch (error) {
          alert((error as Error).message);
        }
      },
      [signIn],
    ),
    onError: useCallback((error: AuthClientError | undefined) => {
      console.error(error);
    }, []),
  });

  const initiateConnect = useCallback(async () => {
    setIsSigningIn(true);

    if (!hasInitiatedConnectRef.current) {
      hasInitiatedConnectRef.current = true;
      await connect();
    } else if (isConnectError) {
      reconnect();
    }
  }, [connect, isConnectError, reconnect]);

  useEffect(() => {
    if (url && !hasStartedPollingRef.current) {
      hasStartedPollingRef.current = true;
      startPolling();
      Linking.openURL(url);
    }
  }, [startPolling, url]);

  return (
    <Pressable onPress={initiateConnect}>
      <View className="bg-fc-purple min-h-[60px] min-w-[120px]  flex-row items-center justify-center rounded-lg p-4">
        {isSigningIn ? (
          <Loader />
        ) : (
          <Text className="text-lg font-bold text-white">Login</Text>
        )}
      </View>
    </Pressable>
  );
}
