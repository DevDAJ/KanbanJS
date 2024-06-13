import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { MiddlewareConfig, NextResponse } from 'next/server';

export default withAuth({
  pages: {
    signIn: '/login',
    newUser: '/register',
    signOut: '/logout',
  },
  callbacks: {
    authorized: async ({ token }) => {
      return !!token;
    },
  },
});

export const config: MiddlewareConfig = {
  // matcher with regex to disable this middleware for home page and auth pages
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|logout|register|$).*)'],
};
