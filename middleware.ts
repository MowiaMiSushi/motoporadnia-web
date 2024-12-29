import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Jeśli to strona logowania i użytkownik jest zalogowany, przekieruj do dashboardu
  if (pathname === '/admin/login' && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Jeśli to api/auth/signin, przekieruj do strony logowania
  if (pathname === '/api/auth/signin') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Jeśli to ścieżka admina (ale nie login) i użytkownik nie jest zalogowany, przekieruj do logowania
  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/auth/signin']
}; 