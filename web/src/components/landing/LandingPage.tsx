import Login from "@components/login/Login";

export function LandingPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center p-4">
        <h1 className="pb-1 text-4xl font-bold">Quikcast</h1>
        <h2>A really simple Farcaster app.</h2>
        <div className="mt-4">
          <Login />
        </div>
      </main>
    </>
  );
}
