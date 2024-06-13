import type { Metadata } from "next";
import './globals.css';
import NavBar from "@/components/server/NavBar";

export const metadata: Metadata = {
  title: "KanbanJS"
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
        {children}</body>
    </html>
  );
}
