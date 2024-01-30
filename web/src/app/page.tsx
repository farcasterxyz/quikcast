import { LandingPage } from '@components/landing/LandingPage';

export default async function Home() {
  // if (session) {
  //   const {
  //     user: { fid },
  //   } = session;
  //   return (
  //     <div>
  //       <FeedPage fid={fid} />
  //     </div>
  //   );
  // }

  return <LandingPage />;
}
