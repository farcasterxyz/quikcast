import { Avatar } from "@components/avatar/Avatar";
import { CastEmbeds } from "@components/feed/CastEmbeds";
import Linkify from "@components/linkify/Linkify";
import { Cast as CastType } from "@shared/types/models";
import { formatDistance } from "date-fns";

type CastProps = {
  cast: CastType;
};

export function Cast({ cast }: CastProps) {
  return (
    <div className="flex flex-row gap-2 border-b-gray-200 px-4 py-3 [&:not(:first-child)]:border-t">
      <Avatar user={cast.user} />
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <span className="mr-1 font-bold">{cast.user.display_name}</span>
          <span className="mr-1 text-gray-500">@{cast.user.username}</span>·
          <span className="ml-1 text-gray-500">
            {formatDistance(new Date(), cast.timestamp)}
          </span>
        </div>
        <div
          className="text-balance break-words"
          style={{ wordBreak: "break-word" }}
        >
          <Linkify>{cast.text}</Linkify>
        </div>
        <CastEmbeds embeds={cast.embeds} />
      </div>
    </div>
  );
}
