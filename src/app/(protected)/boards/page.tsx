import { db } from '@/config/firebase';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';

export default async function Boards() {
  const boards = await getDocs(collection(db, 'boards'));
  boards.forEach((doc) => {
    console.log(doc.data());
  });

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="my-2 font-bold text-purple-300 text-xl">Board Lists</h1>
      <div className="w-screen flex px-8">
        {boards.docs.map((board) => (
          <Link key={board.id} href={`/boards/${board.id}`}>
            <div className="px-4 py-2 bg-slate-700 text-white rounded-md">{board.data().name}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
