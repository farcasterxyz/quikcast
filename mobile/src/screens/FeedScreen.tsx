import { Cast } from '@mobile/components/feed/Cast';
import { useAuth } from '@mobile/contexts/AuthProvider';
import { useFeed, useFetchFeed } from '@mobile/hooks/data/feed';
import { buildScreen } from '@mobile/utils/buildScreen';
import { Cast as CastType } from '@shared/types/models';
import { FlashList } from '@shopify/flash-list';
import { useCallback, useState } from 'react';

function renderItem({ item }: { item: CastType }) {
  return <Cast cast={item} />;
}

export const FeedScreen = buildScreen(() => {
  const { currentUser } = useAuth();
  const { feed } = useFeed({ fid: currentUser!.fid });
  const fetchFeed = useFetchFeed();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await fetchFeed({ fid: currentUser!.fid });
    } finally {
      setIsRefreshing(false);
    }
  }, [currentUser, fetchFeed]);

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
