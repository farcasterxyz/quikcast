import { Avatar } from '@components/avatar/Avatar';
import { CastEmbed } from '@components/feed/CastEmbed';
import { Cast as CastType } from '@shared/types/models';
import { formatDistance } from 'date-fns';

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
          style={{ wordBreak: 'break-word' }}
        >
          {cast.text}
        </div>
        {cast.embeds.length > 0 && (
          <div className="mt-2 flex flex-col items-start gap-2">
            {cast.embeds.map((embed) => (
              <CastEmbed key={embed.url} embed={embed} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
