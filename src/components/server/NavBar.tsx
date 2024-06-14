import { authConfig } from '@/config/nextAuth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import LogOutButton from '../client/LogOutButton';

const NavBar: React.FC = async () => {
  const session = await getServerSession(authConfig);
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-gray-300 font-bold">Product Listing App with auth</h1>
              </div>
            </div>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {session ? (
                <>
                  <Link
                    href="/products"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Products
                  </Link>
                  <Link
                    href="/profile"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {session.user?.name || session.user?.email || 'Profile'}
                  </Link>
                  <LogOutButton />
                </>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
