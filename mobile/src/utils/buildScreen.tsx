import { FullscreenLoader } from '@components/loader/FullscreenLoader';
import { FC, Suspense } from 'react';

export function buildScreen<Props extends Record<string, unknown>>(
  Component: FC<Props>,
) {
  return (props: Props) => (
    <Suspense fallback={<FullscreenLoader />}>
      {<Component {...props} />}
    </Suspense>
  );
}
