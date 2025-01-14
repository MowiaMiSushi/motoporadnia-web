import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectToDatabase } from './lib/mongodb';

export async function middleware(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const seoData = await db.collection('seo').findOne({ identifier: 'global' });

    if (seoData?.data) {
      const pathname = request.nextUrl.pathname;
      const pageId = getPageId(pathname);
      
      if (pageId && seoData.data[pageId]) {
        const pageSeo = seoData.data[pageId];
        const response = NextResponse.next();

        // Ustawienie metadanych w nagłówkach odpowiedzi
        response.headers.set('x-seo-title', pageSeo.title);
        response.headers.set('x-seo-description', pageSeo.description);
        response.headers.set('x-seo-keywords', pageSeo.keywords);
        response.headers.set('x-og-title', pageSeo.ogTitle);
        response.headers.set('x-og-description', pageSeo.ogDescription);
        response.headers.set('x-og-image', pageSeo.ogImage);

        return response;
      }
    }
  } catch (error) {
    console.error('Error in SEO middleware:', error);
  }

  return NextResponse.next();
}

function getPageId(pathname: string): string | null {
  const routes: { [key: string]: string } = {
    '/': 'home',
    '/o-nas': 'about',
    '/uslugi': 'services',
    '/uslugi/transport': 'transport',
    '/uslugi/serwis': 'service',
    '/uslugi/pomoc-w-zakupie': 'purchase-help',
    '/uslugi/szkolenia': 'training'
  };

  return routes[pathname] || null;
}

export const config = {
  matcher: [
    '/',
    '/o-nas',
    '/uslugi',
    '/uslugi/transport',
    '/uslugi/serwis',
    '/uslugi/pomoc-w-zakupie',
    '/uslugi/szkolenia'
  ],
};