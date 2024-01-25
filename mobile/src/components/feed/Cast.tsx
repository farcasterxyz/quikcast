import { Avatar } from '@components/avatar/Avatar';
import { Cast as CastType } from '@shared/types/models';
import { Text, View } from 'react-native';

type CastProps = {
  cast: CastType;
};

export function Cast({ cast }: CastProps) {
  return (
    <View className="p-4 border-y border-[0.25px] border-gray-200">
      <Avatar user={cast.user} />
      <Text>{cast.text}</Text>
    </View>
  );
}
