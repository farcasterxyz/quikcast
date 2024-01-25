import { Cast } from "@components/feed/Cast";
import { getFeed } from "@lib/services/feed";

type FeedPageProps = {
  fid: string;
};

export async function FeedPage({ fid }: FeedPageProps) {
  const feed = await getFeed({ fid });

  return (
    <div className="container m-auto max-w-[660px] border-x border-gray-200">
      {feed.map((cast) => (
        <Cast key={cast.hash} cast={cast} />
      ))}
    </div>
  );
}
