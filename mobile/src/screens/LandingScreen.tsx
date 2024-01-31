import { Login } from '@mobile/components/auth/Login';
import { buildScreen } from '@mobile/utils/buildScreen';
import { View } from 'react-native';

export const LandingScreen = buildScreen(() => {
  return (
    <View className="flex-1 items-center justify-center">
      <Login />
    </View>
  );
});
