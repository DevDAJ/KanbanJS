import Link from 'next/link';

export default function Home() {
  return (
    <main className="h-[calc(100vh-128px)] flex justify-center items-center flex-col">
      <h1 className="text-3xl text-white font-bold">Try out NextJS Kanban boards today!</h1>
      <Link href="/boards" className="text-lime-300 font-semibold text-lg">
        Get Started
      </Link>
    </main>
  );
}
