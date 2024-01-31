import { CastsPage } from '@components/casts/CastsPage';
import { LandingPage } from '@components/landing/LandingPage';
import { getCurrentUser } from '@lib/auth/getCurrentUser';

export default async function Feed() {
  const user = await getCurrentUser();

  if (user) {
    return <CastsPage fid={user.fid} />;
  }

  return <LandingPage />;
}
