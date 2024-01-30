import { Avatar } from "@components/avatar/Avatar";
import Linkify from "@components/linkify/Linkify";
import Logout from "@components/logout/Logout";
import { User } from "@shared/types/models";

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
          <span className="mt-2">
            <Linkify>{user.bio}</Linkify>
          </span>
        </div>
        <div className="grow" />
        <Logout />
      </div>
    </div>
  );
}
