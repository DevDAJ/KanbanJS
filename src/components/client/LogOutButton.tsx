'use client';

import { signOut } from 'next-auth/react';

export default function LogOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="text-gray-300 font-semibold text-sm"
    >
      Log Out
    </button>
  );
}