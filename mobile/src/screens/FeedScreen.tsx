import { Avatar } from '@mobile/components/avatar/Avatar';
import { Cast } from '@mobile/components/feed/Cast';
import { useAuthed } from '@mobile/contexts/AuthProvider';
import { useFeed, useFetchFeed } from '@mobile/hooks/data/feed';
import { buildScreen } from '@mobile/utils/buildScreen';
import { Cast as CastType } from '@shared/types/models';
import { FlashList } from '@shopify/flash-list';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';

function renderItem({ item }: { item: CastType }) {
  return <Cast cast={item} />;
}

export const FeedScreen = buildScreen(() => {
  const { currentUser, signOut } = useAuthed();
  const { feed } = useFeed({ fid: currentUser!.fid });
  const fetchFeed = useFetchFeed();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await fetchFeed({ fid: currentUser.fid });
    } finally {
      setIsRefreshing(false);
    }
  }, [currentUser, fetchFeed]);

  return (
    <View className="flex-1 justify-between">
      <View className="shrink grow-0 flex-row items-center justify-between px-6 py-2">
        <View className="shrink flex-row items-center gap-2">
          <Avatar user={currentUser} />
        </View>
        <Text className="text-sm text-gray-500" onPress={signOut}>
          Sign out
        </Text>
      </View>
      <FlashList
        data={feed}
        renderItem={renderItem}
        estimatedItemSize={190}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
});
