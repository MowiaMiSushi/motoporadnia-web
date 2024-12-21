import { withAuth } from 'next-auth/middleware';

// Chroń tylko konkretne ścieżki admina
export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/pages/:path*',
    '/admin/services/:path*',
    '/admin/settings/:path*'
  ]
};

// Prosta autoryzacja - wymagaj tylko tokena z rolą admin
export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === 'admin'
  },
  pages: {
    signIn: '/admin/login'
  }
}); 