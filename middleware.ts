import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Pozwól na dostęp do strony logowania
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Dla innych ścieżek admin sprawdź token w ciasteczku
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('next-auth.session-token');
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
}; 