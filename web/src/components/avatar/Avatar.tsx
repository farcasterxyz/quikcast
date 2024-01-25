import { User } from '@shared/types/models';

const pfpDiameter = 46;

type AvatarProps = {
  user: User;
};

export function Avatar({ user }: AvatarProps) {
  return (
    <div
      className="rounded-full overflow-hidden border border-gray-200 shrink-0"
      style={{
        width: pfpDiameter,
        height: pfpDiameter,
      }}
    >
      <img
        alt={user.display_name}
        src={user.pfp_url}
        width={pfpDiameter}
        height={pfpDiameter}
      />
    </div>
  );
}
