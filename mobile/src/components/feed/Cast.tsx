import { Avatar } from '@mobile/components/avatar/Avatar';
import { usePush } from '@mobile/hooks/navigation/usePush';
import { Cast as CastType } from '@shared/types/models';
import { formatDistance } from 'date-fns';
import { useCallback } from 'react';
import { Text, View } from 'react-native';

import { CastEmbeds } from './CastEmbeds';

type CastProps = {
  cast: CastType;
};

export function Cast({ cast }: CastProps) {
  const push = usePush();

  const pushProfile = useCallback(() => {
    push('Profile', {
      displayName: cast.user.display_name,
      fid: cast.user.fid,
    });
  }, [push, cast.user]);

  return (
    <View className="w-full flex-row border-[0.25px] border-y border-gray-200 p-4">
      <Avatar user={cast.user} />
      <View className="ml-2 mt-1 shrink grow flex-col">
        <Text ellipsizeMode="tail" numberOfLines={1}>
          <Text className="font-bold" onPress={pushProfile}>
            {cast.user.display_name}
          </Text>{' '}
          <Text className="text-gray-500" onPress={pushProfile}>
            @{cast.user.username}
          </Text>
          · {formatDistance(new Date(), cast.timestamp)}
        </Text>
        <View className="flex-row">
          <Text className="flex-1 flex-wrap">{cast.text}</Text>
        </View>
        <CastEmbeds embeds={cast.embeds} />
      </View>
    </View>
  );
}
