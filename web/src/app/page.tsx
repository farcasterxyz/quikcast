// import { getServerSession } from 'next-auth';

// import { FeedPage } from '@/feed/FeedPage';
import { LandingPage } from '@/landing/LandingPage';

export default async function Home() {
  // const session = await getServerSession();

  // if (session) {
  //   return <FeedPage />;
  // }

  return <LandingPage />;
}
