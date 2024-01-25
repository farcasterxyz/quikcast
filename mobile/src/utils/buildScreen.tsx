import { FullscreenLoader } from '@components/loader/FullscreenLoader';
import { FC, Suspense } from 'react';
import { SafeAreaView } from 'react-native';

export function buildScreen<Props extends Record<string, unknown>>(
  Component: FC<Props>,
) {
  return (props: Props) => (
    <SafeAreaView className="flex-1">
      <Suspense fallback={<FullscreenLoader />}>
        {<Component {...props} />}
      </Suspense>
    </SafeAreaView>
  );
}
