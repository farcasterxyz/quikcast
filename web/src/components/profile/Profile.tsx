import { User } from '@shared/types/models';

import { Avatar } from '../avatar/Avatar';

type ProfileProps = {
  user: User;
};

export function Profile({ user }: ProfileProps) {
  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row place-items-center">
        <Avatar user={user} pfpDiameter={72} />
        <div className="flex flex-col ml-4 text-l">
          <span className="font-bold">{user.display_name}</span>
          <span className="text-gray-500">@{user.username}</span>
          <div className="mt-2">{user.bio}</div>
        </div>
      </div>
    </div>
  );
}
