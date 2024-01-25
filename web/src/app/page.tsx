// import { getServerSession } from 'next-auth';

import { FeedPage } from '@components/feed/FeedPage';
import { LandingPage } from '@components/landing/LandingPage';

export default async function Home() {
  // const session = await getServerSession();
  // if (session) {
  return <FeedPage fid="145" />;
  // }

  return <LandingPage />;
}
