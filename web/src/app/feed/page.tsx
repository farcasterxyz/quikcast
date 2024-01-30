import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { FeedPage } from "@components/feed/FeedPage";
import { LandingPage } from "@components/landing/LandingPage";
import { getServerSession } from "next-auth";

export default async function Feed() {
  const session = await getServerSession(authOptions);

  if (session) {
    const {
      user: { fid },
    } = session;

    return <FeedPage fid={fid} />;
  }

  return <LandingPage />;
}
