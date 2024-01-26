import { View } from 'react-native';

import { Loader } from './Loader';

export function FullscreenLoader() {
  return (
    <View className="flex-1 flex-col items-center justify-center">
      <Loader />
    </View>
  );
}
