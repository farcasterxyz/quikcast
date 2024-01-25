import { Cast } from '@components/feed/Cast';
import { baseApiUrl } from '@constants/api';
import { FeedApiResponse } from '@shared/types/api';
import { Cast as CastType } from '@shared/types/models';
import { FlashList } from '@shopify/flash-list';
import { useSuspenseQuery } from '@tanstack/react-query';
import { buildScreen } from '@utils/buildScreen';
import { View } from 'react-native';

async function fetchFeed(): Promise<FeedApiResponse> {
  const res = await fetch(`${baseApiUrl}/feed?fid=145`);
  return res.json();
}

function renderItem({ item }: { item: CastType }) {
  return <Cast cast={item} />;
}

export const FeedScreen = buildScreen(() => {
  const { feed } = useSuspenseQuery({
    queryKey: ['feed'],
    queryFn: fetchFeed,
  }).data;

  return (
    <View className="h-full">
      <FlashList data={feed} renderItem={renderItem} estimatedItemSize={190} />
    </View>
  );
});
