'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { defaultPages } from './data';

const Editor = dynamic(() => import('@/components/Editor'), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-md animate-pulse" />
});

export default function AdminPagesPage() {
  const [selectedPage, setSelectedPage] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (selectedPage) {
      loadPageContent();
    } else {
      setContent('');
      setTitle('');
    }
  }, [selectedPage]);

  const loadPageContent = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Ładowanie strony:', selectedPage);
      const response = await fetch(`/api/pages?pageId=${selectedPage}`);
      const data = await response.json();
      console.log('Otrzymane dane:', data);

      if (response.ok && data) {
        // Jeśli strona nie istnieje, użyj domyślnej treści
        if (!data.content) {
          const defaultPage = defaultPages.find(p => p.pageId === selectedPage);
          if (defaultPage) {
            setContent(`<h1>${defaultPage.title}</h1>\n<p>Wprowadź treść strony...</p>`);
            setTitle(defaultPage.title);
          }
        } else {
          setContent(data.content);
          setTitle(data.title);
        }
      } else {
        // Jeśli strona nie istnieje, użyj domyślnej treści
        const defaultPage = defaultPages.find(p => p.pageId === selectedPage);
        if (defaultPage) {
          setContent(`<h1>${defaultPage.title}</h1>\n<p>Wprowadź treść strony...</p>`);
          setTitle(defaultPage.title);
        }
        throw new Error(data.error || 'Błąd podczas ładowania zawartości');
      }
    } catch (error) {
      console.error('Błąd:', error);
      setError('Nie udało się załadować zawartości strony');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content.trim() || !title.trim()) {
      setError('Tytuł i treść strony nie mogą być puste');
      return;
    }

    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      console.log('Zapisywanie strony:', selectedPage);
      console.log('Treść:', content);
      console.log('Tytuł:', title);

      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageId: selectedPage,
          content: content,
          title: title
        }),
      });

      const data = await response.json();
      console.log('Odpowiedź serwera:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Błąd podczas zapisywania zmian');
      }

      setSuccessMessage('Zmiany zostały pomyślnie zapisane');
      await loadPageContent();
    } catch (error) {
      console.error('Błąd:', error);
      setError(error instanceof Error ? error.message : 'Nie udało się zapisać zmian');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isClient) {
    return null;
  }

  // Grupowanie stron według kategorii
  const groupedPages = defaultPages.reduce((acc, page) => {
    const category = page.pageId.includes('/') ? page.pageId.split('/')[0] : 'main';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(page);
    return acc;
  }, {} as Record<string, typeof defaultPages>);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Zarządzanie stronami</h1>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wybierz stronę do edycji:
              <select
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
                className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#C62400] focus:border-[#C62400] transition-colors"
              >
                <option value="">Wybierz stronę...</option>
                <optgroup label="Strony główne">
                  {groupedPages['main']?.map((page) => (
                    <option key={page.pageId} value={page.pageId}>
                      {page.title}
                    </option>
                  ))}
                </optgroup>
                {Object.entries(groupedPages)
                  .filter(([category]) => category !== 'main')
                  .map(([category, pages]) => (
                    <optgroup key={category} label={category.charAt(0).toUpperCase() + category.slice(1)}>
                      {pages.map((page) => (
                        <option key={page.pageId} value={page.pageId}>
                          {page.title}
                        </option>
                      ))}
                    </optgroup>
                  ))}
              </select>
            </label>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C62400]"></div>
            </div>
          ) : selectedPage && (
            <section className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tytuł strony:
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#C62400] focus:border-[#C62400] transition-colors"
                    placeholder="Wprowadź tytuł strony..."
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zawartość:
                </label>
                <div className="mt-2 border rounded-md overflow-hidden">
                  <Editor
                    value={content}
                    onChange={setContent}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">{successMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2 bg-[#C62400] text-white rounded-md hover:bg-[#A51D00] focus:outline-none focus:ring-2 focus:ring-[#C62400] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSaving ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Zapisywanie...
                    </span>
                  ) : 'Zapisz zmiany'}
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
} 