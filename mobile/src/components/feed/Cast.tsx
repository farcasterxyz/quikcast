import { Avatar } from '@components/avatar/Avatar';
import { Cast as CastType } from '@shared/types/models';
import { formatDistance } from 'date-fns';
import { Text, View } from 'react-native';

type CastProps = {
  cast: CastType;
};

export function Cast({ cast }: CastProps) {
  return (
    <View className="w-full flex-row border-[0.25px] border-y border-gray-200 p-4">
      <Avatar user={cast.user} />
      <View className="ml-2 mt-1 shrink grow flex-col ">
        <Text ellipsizeMode="tail" numberOfLines={1}>
          <Text className="font-bold">{cast.user.display_name}</Text>{' '}
          <Text className="text-gray-500">
            @{cast.user.username} · {formatDistance(new Date(), cast.timestamp)}
          </Text>
        </Text>
        <View className="flex-row">
          <Text className="flex-1 flex-wrap">{cast.text}</Text>
        </View>
      </View>
    </View>
  );
}
