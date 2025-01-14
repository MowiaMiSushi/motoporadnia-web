'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Panel administracyjny</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Zarządzanie treścią */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Zarządzanie treścią</h2>
          <p className="text-gray-600 mb-4">Edytuj zawartość stron i sekcji</p>
          <Link
            href="/admin/pages"
            className="inline-block bg-[#C62400] hover:bg-[#A01D00] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Przejdź do edycji
          </Link>
        </div>

        {/* Cennik */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Cennik</h2>
          <p className="text-gray-600 mb-4">Zarządzaj cennikiem usług</p>
          <Link
            href="/admin/pages/pricing"
            className="inline-block bg-[#C62400] hover:bg-[#A01D00] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Przejdź do cennika
          </Link>
        </div>

        {/* Galeria */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Galeria</h2>
          <p className="text-gray-600 mb-4">Zarządzaj zdjęciami na stronie</p>
          <Link
            href="/admin/gallery"
            className="inline-block bg-[#C62400] hover:bg-[#A01D00] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Przejdź do galerii
          </Link>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">SEO</h2>
          <p className="text-gray-600 mb-4">Zarządzaj ustawieniami SEO</p>
          <Link
            href="/admin/seo"
            className="inline-block bg-[#C62400] hover:bg-[#A01D00] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Edytuj SEO
          </Link>
        </div>
      </div>
    </div>
  );
} 