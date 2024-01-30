import { Feed } from '@components/feed/Feed';
import { Nav } from '@components/nav/Nav';
import { Profile } from '@components/profile/Profile';
import { getFeed } from '@lib/services/feed';
import { User } from '@shared/types/models';

type FeedPageProps = {
  user: User;
};

export async function FeedPage({ user }: FeedPageProps) {
  const feed = await getFeed({ fid: user.fid });

  return (
    <div className="container m-auto max-w-[660px] border-x border-gray-200">
      <Profile user={user} />
      <Nav />
      <Feed casts={feed} />
    </div>
  );
}
