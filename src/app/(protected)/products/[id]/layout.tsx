import { db } from '@/config/firebase';
import { ProductProvider } from '@/providers/ProductProvider';
import { doc, getDoc } from 'firebase/firestore';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  const product = await getDoc(doc(db, 'products', params.id));
  const data = product.data();

  return (
    <>
      <ProductProvider
        value={{
          name: data?.name,
          price: data?.price,
          description: data?.description,
          thumbnail: data?.thumbnail,
        }}
      >
        {children}
      </ProductProvider>
    </>
  );
}
