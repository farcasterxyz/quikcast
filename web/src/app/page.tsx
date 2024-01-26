import { FeedPage } from '@components/feed/FeedPage';
import { LandingPage } from '@components/landing/LandingPage';
import { getServerSession } from 'next-auth';

import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const {
    user: { fid },
  } = await getServerSession(authOptions);

  if (fid) {
    return (
      <div>
        <FeedPage fid={fid} />
      </div>
    );
  }

  return <LandingPage />;
}
