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
        <Avatar user={user} pfpDiameter={72} />
        <div className="ml-4 flex flex-col">
          <span className="font-bold">{user.display_name}</span>
          <span className="text-gray-500">@{user.username}</span>
          <div className="mt-2">
            <Linkify>{user.bio}</Linkify>
          </div>
        </div>
        <div className="grow" />
        <Logout />
      </div>
    </div>
  );
}
