'use client';
import { db } from '@/config/firebase';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';

export default function Products() {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await getDocs(collection(db, 'products')),
  });
  return (
    <div className="w-screen flex px-8 gap-5">
      {products?.docs.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <div className="px-4 py-2 bg-slate-700 text-white rounded-md">
            <Image
              src={product.data().thumbnail as string}
              alt={product.data().name}
              className="w-32 h-32 object-cover rounded-md"
              width={100}
              height={100}
            />
            <span className="block text-center">{product.data().name}</span>
            <span className="block text-center text-purple-300">
              RM{(product.data().price as number).toFixed(2)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
