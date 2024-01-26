import { FeedPage } from '@components/feed/FeedPage';
import { LandingPage } from '@components/landing/LandingPage';
import { getServerSession } from 'next-auth';

import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    const { user: { fid } } = session;
    return (
      <div>
        <FeedPage fid={fid} />
      </div>
    );
  }

  return <LandingPage />;
}
