import { User } from "@shared/types/models";

import { Avatar } from "../avatar/Avatar";
import Logout from "../logout/Logout";

type ProfileProps = {
  user: User;
};

export function Profile({ user }: ProfileProps) {
  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row place-items-center">
        <a href={`https://warpcast.com/${user.username}`} target="_blank">
          <Avatar user={user} size="lg" />
        </a>
        <div className="ml-4 flex flex-col">
          <span className="font-bold">
            <a
              href={`https://warpcast.com/${user.username}`}
              target="_blank"
              className="hover:underline"
            >
              {user.display_name}
            </a>
          </span>
          <span className="text-gray-500">@{user.username}</span>
          <div className="mt-2">{user.bio}</div>
        </div>
        <div className="grow" />
        <Logout />
      </div>
    </div>
  );
}
