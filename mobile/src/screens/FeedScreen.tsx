import { Cast } from '@components/feed/Cast';
import { baseApiUrl } from '@constants/api';
import { FeedApiResponse } from '@shared/types/api';
import { Cast as CastType } from '@shared/types/models';
import { FlashList } from '@shopify/flash-list';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { buildScreen } from '@utils/buildScreen';
import { useCallback, useState } from 'react';

const feedKey = ['feed'];

async function fetchFeed(): Promise<FeedApiResponse> {
  const res = await fetch(`${baseApiUrl}/feed?fid=145`);
  return res.json();
}

function renderItem({ item }: { item: CastType }) {
  return <Cast cast={item} />;
}

export const FeedScreen = buildScreen(() => {
  const queryClient = useQueryClient();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const { feed } = useSuspenseQuery({
    queryKey: feedKey,
    queryFn: fetchFeed,
  }).data;

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      queryClient.setQueryData(feedKey, await fetchFeed());
    } finally {
      setIsRefreshing(false);
    }
  }, [queryClient]);

  return (
    <FlashList
      data={feed}
      renderItem={renderItem}
      estimatedItemSize={190}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  );
});
