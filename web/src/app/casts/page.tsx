import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { LandingPage } from "@components/landing/LandingPage";
import { ProfilePage } from "@components/profile/ProfilePage";
import { getServerSession } from "next-auth";

export default async function Feed() {
  const session = await getServerSession(authOptions);

  if (session) {
    const {
      user: { fid },
    } = session;

    return <ProfilePage fid={fid} />;
  }

  return <LandingPage />;
}
