import { Cast } from '@mobile/components/feed/Cast';
import { useFeed, useFetchFeed } from '@mobile/hooks/data/feed';
import { buildScreen } from '@mobile/utils/buildScreen';
import { Cast as CastType } from '@shared/types/models';
import { FlashList } from '@shopify/flash-list';
import { useCallback, useState } from 'react';

function renderItem({ item }: { item: CastType }) {
  return <Cast cast={item} />;
}

export const FeedScreen = buildScreen(() => {
  const { feed } = useFeed({ fid });
  const fetchFeed = useFetchFeed();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await fetchFeed({ fid });
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchFeed]);

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
