import Linkify from 'linkify-react';
import { User } from '@shared/types/models';

import { Avatar } from "../avatar/Avatar";
import Logout from "../logout/Logout";

type ProfileProps = {
  user: User;
};

export function Profile({ user }: ProfileProps) {
  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row place-items-center">
        <Avatar user={user} pfpDiameter={72} />
        <div className="ml-4 flex flex-col">
          <span className="font-bold">{user.display_name}</span>
          <span className="text-gray-500">@{user.username}</span>
          <div className="mt-2">
            <Linkify
              options={{
                attributes: {
                  target: '_blank',
                  rel: 'nofollow',
                  className: 'text-violet-500 hover:underline cursor-pointer',
                },
              }}
            >
              {user.bio}
            </Linkify>
          </div>
        </div>
        <div className="grow" />
        <Logout />
      </div>
    </div>
  );
}
