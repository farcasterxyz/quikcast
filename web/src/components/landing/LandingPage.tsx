import Login from "@components/login/Login";
import Image from "next/image";

export function LandingPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center p-16">
        <Image src="/landing-logo.webp" width={400} height={400} alt="Farcaster Arch" />
        <h1 className="pb-1 text-4xl font-extrabold mt-4">Quikcast</h1>
        <h2>A really simple Farcaster app.</h2>
        <div className="mt-4">
          <Login />
        </div>
      </main>
    </>
  );
}
