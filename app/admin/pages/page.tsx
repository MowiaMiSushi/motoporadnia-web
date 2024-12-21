'use client';

import { useState } from 'react';

interface Page {
  id: string;
  title: string;
  content: string;
  slug: string;
}

const initialPages: Page[] = [
  {
    id: '1',
    title: 'Strona główna',
    content: 'Treść strony głównej',
    slug: '/',
  },
  {
    id: '2',
    title: 'O nas',
    content: 'Treść strony O nas',
    slug: '/o-nas',
  },
  {
    id: '3',
    title: 'Kontakt',
    content: 'Treść strony kontaktowej',
    slug: '/kontakt',
  },
  {
    id: '4',
    title: 'Serwis',
    content: 'Treść strony serwisowej',
    slug: '/uslugi/serwis',
  },
  {
    id: '5',
    title: 'Cennik serwisu',
    content: 'Treść cennika serwisu',
    slug: '/uslugi/serwis/cennik',
  },
  {
    id: '6',
    title: 'Transport',
    content: 'Treść strony transportowej',
    slug: '/uslugi/transport',
  },
  {
    id: '7',
    title: 'Cennik transportu',
    content: 'Treść cennika transportu',
    slug: '/uslugi/transport/cennik',
  },
  {
    id: '8',
    title: 'Pomoc w zakupie',
    content: 'Treść strony pomocy w zakupie',
    slug: '/uslugi/pomoc-w-zakupie',
  },
  {
    id: '9',
    title: 'Cennik pomocy w zakupie',
    content: 'Treść cennika pomocy w zakupie',
    slug: '/uslugi/pomoc-w-zakupie/cennik',
  },
  {
    id: '10',
    title: 'Komis',
    content: 'Treść strony komisu',
    slug: '/uslugi/komis',
  },
  {
    id: '11',
    title: 'Szkolenia',
    content: 'Treść strony szkoleń',
    slug: '/uslugi/szkolenia',
  },
];

export default function PagesAdmin() {
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (page: Page) => {
    setSelectedPage(page);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedPage) return;

    try {
      // Tutaj będzie logika zapisywania do bazy danych
      setPages(pages.map((p) => (p.id === selectedPage.id ? selectedPage : p)));
      setSelectedPage(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Błąd podczas zapisywania:', error);
    }
  };

  const handleCancel = () => {
    setSelectedPage(null);
    setIsEditing(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Zarządzanie stronami</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lista stron */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Lista stron</h2>
          <div className="space-y-4">
            {pages.map((page) => (
              <div
                key={page.id}
                className="flex items-center justify-between p-4 border rounded hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium">{page.title}</h3>
                  <p className="text-sm text-gray-500">{page.slug}</p>
                </div>
                <button
                  onClick={() => handleEdit(page)}
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edytuj
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Formularz edycji */}
        {selectedPage && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Edycja strony</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tytuł
                </label>
                <input
                  type="text"
                  value={selectedPage.title}
                  onChange={(e) =>
                    setSelectedPage({ ...selectedPage, title: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Treść
                </label>
                <textarea
                  value={selectedPage.content}
                  onChange={(e) =>
                    setSelectedPage({ ...selectedPage, content: e.target.value })
                  }
                  rows={6}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm text-gray-700 border rounded hover:bg-gray-50"
                >
                  Anuluj
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Zapisz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 