'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Page {
  id: string;
  title: string;
  path: string;
  description: string;
  hasSubpages?: boolean;
}

export default function PagesManager() {
  const [pages] = useState<Page[]>([
    {
      id: 'home',
      title: 'Strona główna',
      path: '/admin/pages/home',
      description: 'Zarządzaj zawartością strony głównej'
    },
    {
      id: 'about',
      title: 'O nas',
      path: '/admin/pages/about',
      description: 'Edytuj informacje o firmie'
    },
    {
      id: 'services',
      title: 'Usługi',
      path: '/admin/pages/services',
      description: 'Zarządzaj sekcjami usług',
      hasSubpages: true
    },
    {
      id: 'contact',
      title: 'Kontakt',
      path: '/admin/pages/contact',
      description: 'Aktualizuj dane kontaktowe'
    }
  ]);

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Zarządzanie stronami</h1>
        <p className="mt-2 text-gray-600">
          Wybierz stronę, którą chcesz edytować
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <Link
            key={page.id}
            href={page.path}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {page.title}
              </h2>
              {page.hasSubpages && (
                <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                  Podstrony
                </span>
              )}
            </div>
            <p className="mt-2 text-gray-600">{page.description}</p>
            <div className="mt-4 flex items-center text-indigo-600">
              <span>Edytuj stronę</span>
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 