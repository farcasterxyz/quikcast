import { User } from '@shared/types/models';
import { Image } from 'react-native';

const pfpDiameter = 46;

type AvatarProps = {
  user: User;
};

export function Avatar({ user }: AvatarProps) {
  return (
    <Image
      className="rounded-full"
      source={{ uri: user.pfp_url }}
      width={pfpDiameter}
      height={pfpDiameter}
    />
  );
}
