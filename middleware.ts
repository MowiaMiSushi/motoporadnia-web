import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Jeśli użytkownik jest zalogowany, pozwól na dostęp
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/services/:path*',
    '/admin/pages/:path*',
    '/admin/gallery/:path*',
    '/admin/users/:path*',
    '/admin/settings/:path*',
    '/admin/contact/:path*',
  ],
}; 