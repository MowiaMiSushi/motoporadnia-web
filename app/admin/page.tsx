'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faUser, faClock, faEdit, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { showNotification } from '@/app/components/ui/Notification';

interface Change {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  section: string;
  details: string;
}

export default function AdminDashboard() {
  const [recentChanges, setRecentChanges] = useState<Change[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchRecentChanges = async () => {
      try {
        const response = await fetch('/api/history');
        if (response.ok) {
          const data = await response.json();
          setRecentChanges(data.slice(0, 5)); // Pobieramy tylko 5 ostatnich zmian
        } else {
          showNotification({
            title: 'Błąd',
            message: 'Nie udało się pobrać historii zmian',
            type: 'error'
          });
        }
      } catch (error) {
        console.error('Error fetching recent changes:', error);
        showNotification({
          title: 'Błąd',
          message: 'Wystąpił problem podczas pobierania historii zmian',
          type: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentChanges();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Witaj, {session?.user?.name}!</h1>
        <p className="text-gray-600 mt-2">Panel administracyjny MotoPoradni</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Kafelek z ostatnimi zmianami */}
        <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FontAwesomeIcon icon={faHistory} />
              Ostatnie zmiany
            </h2>
            <Link
              href="/admin/history"
              className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              Zobacz wszystkie
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Ładowanie...</div>
            ) : recentChanges.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Brak historii zmian
              </div>
            ) : (
              recentChanges.map((change) => (
                <div
                  key={change.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">{change.action}</div>
                      <div className="text-sm text-gray-600">
                        {change.details}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                          {change.user}
                        </span>
                        <span className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                          {new Date(change.timestamp).toLocaleString('pl-PL')}
                        </span>
                        <span className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                          {change.section}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Szybkie akcje */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Szybkie akcje</h2>
          <div className="space-y-2">
            <Link
              href="/admin/pages/pricing"
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Zarządzaj cennikami
            </Link>
            <Link
              href="/admin/seo"
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Ustawienia SEO
            </Link>
            <Link
              href="/admin/settings"
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Ustawienia strony
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 