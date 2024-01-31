import { Feed } from '@components/feed/Feed';
import { Nav } from '@components/nav/Nav';
import { Profile } from '@components/profile/Profile';
import { getCasts } from '@lib/services/casts';
import { getProfile } from '@lib/services/user';

type CastsPageProps = {
  fid: string;
};

export async function CastsPage({ fid }: CastsPageProps) {
  const casts = await getCasts({ fid });
  const user = await getProfile({ fid });

  return (
    <div className="container m-auto max-w-[660px] border-x border-gray-200">
      <Profile user={user} />
      <Nav />
      <Feed casts={casts} />
    </div>
  );
}
