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
      <a href={`https://warpcast.com/${cast.user.username}`} target="_blank">
        <Avatar user={cast.user} />
      </a>
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <span className="mr-1 font-bold">
            <a
              href={`https://warpcast.com/${cast.user.username}`}
              target="_blank"
              className="hover:underline"
            >
              {cast.user.display_name}
            </a>
          </span>
          <span className="mr-1 text-gray-500">@{cast.user.username}</span>·
          <span className="ml-1 text-gray-500">
            <a
              href={`https://warpcast.com/${cast.user.username}/0x${cast.hash}`}
              target="_blank"
              className="hover:underline"
            >
              {formatDistance(new Date(), cast.timestamp)}
            </a>
          </span>
        </div>
        <div
          className="whitespace-pre-line text-balance break-words"
          style={{ wordBreak: "break-word" }}
        >
          <Linkify>{cast.text}</Linkify>
        </div>
        <CastEmbeds embeds={cast.embeds} />
      </div>
    </div>
  );
}
