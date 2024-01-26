import { usePush } from '@mobile/hooks/navigation/usePush';
import { User } from '@shared/types/models';
import { useMemo } from 'react';
import { Image, Pressable } from 'react-native';

type AvatarProps = {
  size?: 'sm' | 'md' | 'lg';
  user: User;
};

export function Avatar({ size = 'md', user }: AvatarProps) {
  const push = usePush();

  const diameter = useMemo(() => {
    switch (size) {
      case 'sm':
        return 32;
      case 'md':
        return 46;
      default:
        return 86;
    }
  }, [size]);

  return (
    <Pressable
      onPress={() =>
        push('Profile', { displayName: user.display_name, fid: user.fid })
      }
    >
      <Image
        className="rounded-full"
        source={{ uri: user.pfp_url }}
        width={diameter}
        height={diameter}
      />
    </Pressable>
  );
}
