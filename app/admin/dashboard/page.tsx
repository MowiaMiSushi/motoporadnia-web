'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ContentSection {
  id: string;
  title: string;
  description: string;
  href: string;
  icon?: string;
}

const adminSections: ContentSection[] = [
  {
    id: 'pages',
    title: 'Zarządzanie stronami',
    description: 'Edytuj zawartość stron: O nas, Szkolenia, Komis, itp.',
    href: '/admin/pages',
  },
  {
    id: 'services',
    title: 'Usługi',
    description: 'Zarządzaj ofertą usług i cennikiem',
    href: '/admin/services',
  },
  {
    id: 'contact',
    title: 'Kontakt',
    description: 'Aktualizuj dane kontaktowe i godziny otwarcia',
    href: '/admin/contact',
  },
  {
    id: 'gallery',
    title: 'Galeria',
    description: 'Dodawaj i zarządzaj zdjęciami',
    href: '/admin/gallery',
  },
  {
    id: 'users',
    title: 'Użytkownicy',
    description: 'Zarządzaj kontami administratorów',
    href: '/admin/users',
  },
  {
    id: 'settings',
    title: 'Ustawienia',
    description: 'Konfiguracja strony i SEO',
    href: '/admin/settings',
  },
];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Ładowanie...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* Nagłówek */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Panel administratora
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                Witaj, {session?.user?.name || 'Administrator'}
              </span>
              <button
                onClick={() => router.push('/api/auth/signout')}
                className="text-[#C62400] hover:text-[#A51D00] transition-colors duration-200"
              >
                Wyloguj się
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Główna zawartość */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminSections.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={section.href}>
                  <div className="bg-white rounded-lg shadow p-6 h-full cursor-pointer hover:shadow-lg transition-shadow duration-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {section.title}
                    </h2>
                    <p className="text-gray-600">{section.description}</p>
                    <div className="mt-4 text-[#C62400] group flex items-center">
                      <span>Przejdź</span>
                      <svg
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
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
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 