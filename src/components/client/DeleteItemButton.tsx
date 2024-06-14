'use client';

import { db, storage } from '@/config/firebase';
import { useMutation } from '@tanstack/react-query';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useRouter } from 'next/navigation';

export default function DeleteItemButton({ id }: { id: string }) {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: async () =>
      await deleteDoc(doc(db, 'products', id)).then(() =>
        deleteObject(ref(storage, id + '/product-image'))
      ),
    onSuccess: () => router.push('/products'),
  });
  return (
    <button
      className="bg-red-300 text-gray-700 p-2 rounded-md"
      type="button"
      onClick={() => mutate()}
    >
      Remove
    </button>
  );
}
