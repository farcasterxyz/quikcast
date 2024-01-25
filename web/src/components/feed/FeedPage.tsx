import { FeedItem } from '@/components/feed/FeedItem';
import { getFeed } from '@/lib/services/feed';

type FeedPageProps = {
  fid: string;
};

export async function FeedPage({ fid }: FeedPageProps) {
  const feed = await getFeed({ fid });

  return (
    <div className="container m-auto max-w-[620px] border-x border-gray-200">
      {feed.map((item) => (
        <FeedItem key={item.hash} item={item} />
      ))}
    </div>
  );
}
