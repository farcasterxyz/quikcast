import Login from '@/components/Login';

export default function Home() {
  return (
    <>
      <header className="flex flex-row justify-end p-4">
        <Login />
      </header>
      <main className="flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl pb-1">Quikcast</h1>
        <h2>A really simple Farcaster app</h2>
      </main>
    </>
  );
}
