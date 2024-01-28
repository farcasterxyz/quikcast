import { Loader } from '@mobile/components/loader/Loader';
import { useAuth } from '@mobile/contexts/AuthProvider';
import { buildScreen } from '@mobile/utils/buildScreen';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export const LandingScreen = buildScreen(() => {
  const { signIn } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  return (
    <View className="flex-1 items-center justify-center">
      <Pressable
        onPress={async () => {
          setIsSigningIn(true);

          try {
            await signIn();
          } catch (error) {
            console.error(error);
          } finally {
            setIsSigningIn(false);
          }
        }}
      >
        <View className="bg-fc-purple min-h-[60px] min-w-[120px]  flex-row items-center justify-center rounded-lg p-4">
          {isSigningIn ? (
            <Loader />
          ) : (
            <Text className="text-lg font-bold text-white">Login</Text>
          )}
        </View>
      </Pressable>
    </View>
  );
});
