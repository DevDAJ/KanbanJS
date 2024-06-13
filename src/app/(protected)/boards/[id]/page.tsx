import { db } from '@/config/firebase';
import Link from 'next/link';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import KanbanBoard from '@/components/client/KanbanBoard';

export default async function Boards({ params }: { params: { id: string } }) {
  const docRef = doc(db, 'boards', params.id);
  const docSnap = await getDoc(docRef);
  const columns = await getDocs(collection(db, 'boards', params.id, 'columns'));
  return <KanbanBoard />;
}
