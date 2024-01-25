import { Cast } from '@shared/types/client';
import { formatDistance } from 'date-fns';

import { Avatar } from '@/components/avatar/Avatar';

type FeedItemProps = {
  item: Cast;
};

export function FeedItem({ item }: FeedItemProps) {
  console.log(item);
  return (
    <div className="[&:not(:first-child)]:border-t border-b-gray-200 px-4 py-3 flex flex-row gap-2">
      <Avatar user={item.user} />
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <span className="font-bold mr-1">{item.user.display_name}</span>
          <span className="text-gray-500 mr-1">@{item.user.username}</span>·
          <span className="text-gray-500 ml-1">
            {formatDistance(new Date(), item.timestamp)}
          </span>
        </div>
        <div className="text-balance break-words">{item.text}</div>
        {item.embeds.length > 0 && (
          <div className="flex flex-col gap-2">
            {item.embeds.map((embed) => (
              <div key={embed.url} className="">
                <img
                  src={embed.url}
                  alt={embed.url}
                  className="max-h-[300px]"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
