import { Feed } from "@components/feed/Feed";
import { Nav } from "@components/nav/Nav";
import { Profile } from "@components/profile/Profile";
import { getFeed } from "@lib/services/feed";
import { getProfile } from "@lib/services/user";

type FeedPageProps = {
  fid: string;
};

export async function FeedPage({ fid }: FeedPageProps) {
  const feed = await getFeed({ fid });
  const user = await getProfile({ fid });

  return (
    <div className="container m-auto max-w-[660px] border-x border-gray-200">
      <Profile user={user} />
      <Nav />
      <Feed casts={feed} />
    </div>
  );
}
