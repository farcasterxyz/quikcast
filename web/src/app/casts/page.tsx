import { LandingPage } from '@components/landing/LandingPage';
import { ProfilePage } from '@components/profile/ProfilePage';
import { getCurrentUser } from '@lib/auth/getCurrentUser';

export default async function Feed() {
  const user = await getCurrentUser();

  if (user) {
    return <ProfilePage fid={user.fid} />;
  }

  return <LandingPage />;
}
