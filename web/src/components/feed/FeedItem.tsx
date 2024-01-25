import { Cast } from '@shared/types/client';

type FeedItemProps = {
  item: Cast;
};

export function FeedItem({ item }: FeedItemProps) {
  return (
    <div className="[&:not(:first-child)]:border-t border-b-gray-200 px-4 py-2">
      {item.text}
    </div>
  );
}
