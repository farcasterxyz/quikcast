import { Avatar } from '@mobile/components/avatar/Avatar';
import { Cast } from '@mobile/components/feed/Cast';
import { useProfile } from '@mobile/hooks/data/profile';
import {
  useFetchProfileCasts,
  useProfileCasts,
} from '@mobile/hooks/data/profileCasts';
import { RootParamList } from '@mobile/types/navigation';
import { buildScreen } from '@mobile/utils/buildScreen';
import { useRoute } from '@react-navigation/native';
import { Cast as CastType } from '@shared/types/models';
import { FlashList } from '@shopify/flash-list';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';

function renderItem({ item }: { item: CastType }) {
  return <Cast cast={item} />;
}

export const ProfileScreen = buildScreen(() => {
  const { fid } = useRoute().params as RootParamList['Profile'];

  const { profile } = useProfile({ fid });
  const { casts } = useProfileCasts({ fid });
  const fetchProfileCasts = useFetchProfileCasts();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await fetchProfileCasts({ fid });
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchProfileCasts, fid]);

  return (
    <View className="flex-1 flex-col justify-between">
      <View className="flex-row  p-4">
        <Avatar user={profile} size="lg" />
        <View className="shrink flex-col pl-2">
          <Text className="mt-2 text-2xl font-bold">
            {profile.display_name}
          </Text>
          <Text className="text-gray-600">@{profile.username}</Text>
          {profile.bio && (
            <Text
              className="mt-1 flex-wrap text-xs"
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {profile.bio}
            </Text>
          )}
        </View>
      </View>
      <View className="grow ">
        <FlashList
          data={casts}
          renderItem={renderItem}
          estimatedItemSize={190}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      </View>
    </View>
  );
});
