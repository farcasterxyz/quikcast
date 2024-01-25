import { Avatar } from '@components/avatar/Avatar';
import { CastEmbed } from '@components/feed/CastEmbed';
import { Cast as CastType } from '@shared/types/models';
import { formatDistance } from 'date-fns';

type CastProps = {
  cast: CastType;
};

export function Cast({ cast }: CastProps) {
  return (
    <div className="[&:not(:first-child)]:border-t border-b-gray-200 px-4 py-3 flex flex-row gap-2">
      <Avatar user={cast.user} />
      <div className="flex flex-col">
        <div className="flex flex-row casts-center">
          <span className="font-bold mr-1">{cast.user.display_name}</span>
          <span className="text-gray-500 mr-1">@{cast.user.username}</span>·
          <span className="text-gray-500 ml-1">
            {formatDistance(new Date(), cast.timestamp)}
          </span>
        </div>
        <div className="text-balance break-words">{cast.text}</div>
        {cast.embeds.length > 0 && (
          <div className="flex flex-col gap-2 mt-2 items-start">
            {cast.embeds.map((embed) => (
              <CastEmbed key={embed.url} embed={embed} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
