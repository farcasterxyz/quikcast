import { FullscreenLoader } from '@components/loader/FullscreenLoader';
import { FC, Suspense } from 'react';

export function buildScreen<Props>(Component: FC<Props>) {
  return (props: Props) => (
    <Suspense fallback={<FullscreenLoader />}>
      {<Component {...props} />}
    </Suspense>
  );
}
