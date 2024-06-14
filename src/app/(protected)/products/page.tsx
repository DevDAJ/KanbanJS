import Products from '@/components/client/Products';
import { db } from '@/config/firebase';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default async function Boards() {
  const products = await getDocs(collection(db, 'products'));
  const queryClient = new QueryClient();

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="w-full px-8 flex justify-between">
        <h1 className="my-2 font-bold text-purple-300 text-xl">Product Lists</h1>
        <Link className="my-2 bg-purple-300 text-white px-4 py-2 rounded-md" href="products/add">
          Add Product
        </Link>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Products />
      </HydrationBoundary>
    </main>
  );
}
