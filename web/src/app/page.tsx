import { FeedPage } from '@components/feed/FeedPage';
import { LandingPage } from '@components/landing/LandingPage';
import { getCurrentUser } from '@lib/auth/getCurrentUser';

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    return (
      <div>
        <FeedPage user={user} />
      </div>
    );
  }

  return <LandingPage />;
}
