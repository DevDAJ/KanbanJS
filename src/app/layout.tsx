import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/server/NavBar';
import QueryProvider from '@/providers/QueryProvider';

export const metadata: Metadata = {
  title: 'Product Listing App with auth',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-600">
        <NavBar />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
