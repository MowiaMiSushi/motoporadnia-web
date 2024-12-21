'use client';

import { useState } from 'react';

interface Settings {
  siteTitle: string;
  siteDescription: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
  openingHours: string;
  socialMedia: {
    facebook: string;
    instagram: string;
  };
}

const initialSettings: Settings = {
  siteTitle: 'MotoPoradnia - Warsztat Motocyklowy',
  siteDescription: 'Profesjonalny serwis motocyklowy, transport, szkolenia i pomoc w zakupie motocykli',
  contactEmail: 'biuro@motoporadnia.pl',
  phoneNumber: '+48 500 000 000',
  address: 'ul. Przykładowa 123, 00-000 Warszawa',
  openingHours: 'Poniedziałek - Piątek: 8:00 - 18:00, Sobota: 9:00 - 14:00',
  socialMedia: {
    facebook: 'https://facebook.com/motoporadnia',
    instagram: 'https://instagram.com/motoporadnia',
  },
};

export default function SettingsAdmin() {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Tutaj będzie logika zapisywania do bazy danych
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Symulacja zapisu
      // Po udanym zapisie
      alert('Ustawienia zostały zapisane');
    } catch (error) {
      console.error('Błąd podczas zapisywania:', error);
      alert('Wystąpił błąd podczas zapisywania ustawień');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ustawienia strony</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          {/* Podstawowe informacje */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Podstawowe informacje</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nazwa strony
                </label>
                <input
                  type="text"
                  value={settings.siteTitle}
                  onChange={(e) =>
                    setSettings({ ...settings, siteTitle: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Opis strony
                </label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) =>
                    setSettings({ ...settings, siteDescription: e.target.value })
                  }
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Dane kontaktowe */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Dane kontaktowe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email kontaktowy
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, contactEmail: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Numer telefonu
                </label>
                <input
                  type="text"
                  value={settings.phoneNumber}
                  onChange={(e) =>
                    setSettings({ ...settings, phoneNumber: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Adres
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) =>
                    setSettings({ ...settings, address: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Godziny otwarcia
                </label>
                <input
                  type="text"
                  value={settings.openingHours}
                  onChange={(e) =>
                    setSettings({ ...settings, openingHours: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Social Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Facebook
                </label>
                <input
                  type="url"
                  value={settings.socialMedia.facebook}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialMedia: {
                        ...settings.socialMedia,
                        facebook: e.target.value,
                      },
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Instagram
                </label>
                <input
                  type="url"
                  value={settings.socialMedia.instagram}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialMedia: {
                        ...settings.socialMedia,
                        instagram: e.target.value,
                      },
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Przyciski akcji */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isSaving ? 'Zapisywanie...' : 'Zapisz zmiany'}
          </button>
        </div>
      </div>
    </div>
  );
} 