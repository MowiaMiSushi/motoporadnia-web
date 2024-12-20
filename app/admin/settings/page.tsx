'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface SiteSettings {
  general: {
    siteName: string;
    description: string;
    keywords: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    facebook: string;
    instagram: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
}

const initialSettings: SiteSettings = {
  general: {
    siteName: 'MotoPoradnia',
    description: 'Profesjonalny serwis motocyklowy',
    keywords: 'motocykle, serwis, naprawa, szkolenia',
  },
  contact: {
    email: 'kontakt@motoporadnia.pl',
    phone: '+48 123 456 789',
    address: 'ul. Przykładowa 123, 00-000 Warszawa',
  },
  social: {
    facebook: 'https://facebook.com/motoporadnia',
    instagram: 'https://instagram.com/motoporadnia',
  },
  seo: {
    title: 'MotoPoradnia - Profesjonalny serwis motocyklowy',
    description: 'Kompleksowa obsługa motocykli, szkolenia i porady',
    ogImage: '/images/og-image.jpg',
  },
};

export default function AdminSettings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState<keyof SiteSettings>('general');
  const [isSaving, setIsSaving] = useState(false);

  if (status === 'unauthenticated') {
    router.push('/admin/login');
    return null;
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Tutaj dodamy logikę zapisywania do bazy danych
      // Dodaj powiadomienie o sukcesie
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Symulacja zapisu
    } catch (error) {
      console.error('Błąd podczas zapisywania:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateSettings = (
    section: keyof SiteSettings,
    field: string,
    value: string
  ) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Ustawienia strony
            </h1>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="text-[#C62400] hover:text-[#A51D00] transition-colors duration-200"
            >
              ← Powrót do panelu
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {(Object.keys(settings) as Array<keyof SiteSettings>).map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`${
                        activeTab === tab
                          ? 'border-[#C62400] text-[#C62400]'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm capitalize`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </nav>
            </div>

            <div className="p-6">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {Object.entries(settings[activeTab]).map(([field, value]) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-700 capitalize"
                    >
                      {field.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {field === 'description' ? (
                      <textarea
                        id={field}
                        value={value}
                        onChange={(e) =>
                          updateSettings(activeTab, field, e.target.value)
                        }
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                      />
                    ) : (
                      <input
                        type="text"
                        id={field}
                        value={value}
                        onChange={(e) =>
                          updateSettings(activeTab, field, e.target.value)
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                      />
                    )}
                  </div>
                ))}
              </motion.div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#C62400] hover:bg-[#A51D00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C62400] disabled:opacity-50"
                >
                  {isSaving ? 'Zapisywanie...' : 'Zapisz zmiany'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 