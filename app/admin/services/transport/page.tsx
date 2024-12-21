'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/app/components/ui/Notification';

interface Service {
  title: string;
  description: string;
  price: string;
}

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  mainSections: {
    title: string;
    content: string;
    image?: string;
  }[];
  services: Service[];
  features: {
    title: string;
    items: string[];
  };
  additionalInfo: {
    title: string;
    description: string;
    items: string[];
  };
  coverage: {
    title: string;
    description: string;
    regions: string[];
  };
}

const defaultContent: PageContent = {
  hero: {
    title: 'Transport motocykli',
    description: 'Profesjonalny i bezpieczny transport motocykli na terenie całego kraju. Gwarantujemy bezpieczeństwo i terminowość.',
    images: [
      '/images/transport_1.jpg',
      '/images/transport_2.jpg',
      '/images/transport_3.jpg'
    ]
  },
  mainSections: [
    {
      title: 'Bezpieczny transport',
      content: 'Zapewniamy profesjonalny transport motocykli z wykorzystaniem specjalistycznej przyczepy i systemu mocowań. Każdy motocykl jest odpowiednio zabezpieczony na czas transportu.',
      image: '/images/transport_1.jpg'
    },
    {
      title: 'Doświadczeni kierowcy',
      content: 'Nasi kierowcy posiadają wieloletnie doświadczenie w transporcie motocykli i dbają o bezpieczeństwo powierzonych im pojazdów.',
      image: '/images/transport_2.jpg'
    }
  ],
  services: [
    {
      title: 'Transport lokalny',
      description: 'Transport na terenie miasta i okolic.',
      price: 'od 150 zł'
    },
    {
      title: 'Transport krajowy',
      description: 'Transport na terenie całego kraju.',
      price: 'od 2 zł/km'
    },
    {
      title: 'Transport ekspresowy',
      description: 'Pilny transport w trybie ekspresowym.',
      price: 'wycena indywidualna'
    }
  ],
  features: {
    title: 'Co wyróżnia nasz transport?',
    items: [
      'Specjalistyczna przyczepa transportowa',
      'System profesjonalnych mocowań',
      'Doświadczeni kierowcy',
      'Ubezpieczenie ładunku',
      'Transport door-to-door',
      'Możliwość transportu kilku motocykli jednocześnie'
    ]
  },
  additionalInfo: {
    title: 'Informacje dodatkowe',
    description: 'Przed transportem zawsze:',
    items: [
      'Sprawdzamy stan techniczny motocykla',
      'Dokumentujemy fotograficznie stan pojazdu',
      'Zabezpieczamy wrażliwe elementy',
      'Ustalamy dokładny termin odbioru i dostawy',
      'Potwierdzamy trasę i koszty'
    ]
  },
  coverage: {
    title: 'Obszar działania',
    description: 'Świadczymy usługi transportowe na terenie całej Polski. Główne obszary działania to:',
    regions: [
      'Warszawa i okolice',
      'Cała Polska centralna',
      'Województwo mazowieckie',
      'Możliwość transportu w całym kraju',
      'Transport międzywojewódzki'
    ]
  }
};

export default function TransportEditor() {
  const [content, setContent] = useState<PageContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/services/transport');
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        showNotification('error', 'Błąd podczas wczytywania treści');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch('/api/content/services/transport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error('Failed to save content');
      }

      showNotification('success', 'Zmiany zostały zapisane');
      router.refresh();
    } catch (error) {
      console.error('Error saving content:', error);
      showNotification('error', 'Błąd podczas zapisywania zmian');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Ładowanie...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Edycja strony - Transport motocykli</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors ${
            isSaving ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSaving ? 'Zapisywanie...' : 'Zapisz zmiany'}
        </button>
      </div>

      <div className="space-y-8">
        {/* Hero Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Sekcja Hero</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tytuł</label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, title: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Opis</label>
              <textarea
                value={content.hero.description}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, description: e.target.value }
                })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Zdjęcia (po jednym URL w linii)</label>
              <textarea
                value={content.hero.images.join('\n')}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, images: e.target.value.split('\n').filter(url => url.trim()) }
                })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>
        </section>

        {/* Main Sections */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Główne sekcje</h2>
          <div className="space-y-6">
            {content.mainSections.map((section, index) => (
              <div key={index} className="border-b pb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tytuł sekcji</label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => {
                        const newSections = [...content.mainSections];
                        newSections[index] = { ...section, title: e.target.value };
                        setContent({ ...content, mainSections: newSections });
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Treść</label>
                    <textarea
                      value={section.content}
                      onChange={(e) => {
                        const newSections = [...content.mainSections];
                        newSections[index] = { ...section, content: e.target.value };
                        setContent({ ...content, mainSections: newSections });
                      }}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">URL zdjęcia</label>
                    <input
                      type="text"
                      value={section.image}
                      onChange={(e) => {
                        const newSections = [...content.mainSections];
                        newSections[index] = { ...section, image: e.target.value };
                        setContent({ ...content, mainSections: newSections });
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Usługi transportowe</h2>
          <div className="space-y-6">
            {content.services.map((service, index) => (
              <div key={index} className="border-b pb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nazwa usługi</label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => {
                        const newServices = [...content.services];
                        newServices[index] = { ...service, title: e.target.value };
                        setContent({ ...content, services: newServices });
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Opis</label>
                    <textarea
                      value={service.description}
                      onChange={(e) => {
                        const newServices = [...content.services];
                        newServices[index] = { ...service, description: e.target.value };
                        setContent({ ...content, services: newServices });
                      }}
                      rows={2}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cena</label>
                    <input
                      type="text"
                      value={service.price}
                      onChange={(e) => {
                        const newServices = [...content.services];
                        newServices[index] = { ...service, price: e.target.value };
                        setContent({ ...content, services: newServices });
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setContent({
                  ...content,
                  services: [
                    ...content.services,
                    { title: '', description: '', price: '' }
                  ]
                });
              }}
              className="mt-4 px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
            >
              Dodaj usługę
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Cechy transportu</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tytuł sekcji</label>
              <input
                type="text"
                value={content.features.title}
                onChange={(e) => setContent({
                  ...content,
                  features: { ...content.features, title: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Lista cech (po jednej w linii)</label>
              <textarea
                value={content.features.items.join('\n')}
                onChange={(e) => setContent({
                  ...content,
                  features: { ...content.features, items: e.target.value.split('\n').filter(item => item.trim()) }
                })}
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Informacje dodatkowe</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tytuł</label>
              <input
                type="text"
                value={content.additionalInfo.title}
                onChange={(e) => setContent({
                  ...content,
                  additionalInfo: { ...content.additionalInfo, title: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Opis</label>
              <textarea
                value={content.additionalInfo.description}
                onChange={(e) => setContent({
                  ...content,
                  additionalInfo: { ...content.additionalInfo, description: e.target.value }
                })}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Lista punktów (po jednym w linii)</label>
              <textarea
                value={content.additionalInfo.items.join('\n')}
                onChange={(e) => setContent({
                  ...content,
                  additionalInfo: { ...content.additionalInfo, items: e.target.value.split('\n').filter(item => item.trim()) }
                })}
                rows={5}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>
        </section>

        {/* Coverage Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Obszar działania</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tytuł</label>
              <input
                type="text"
                value={content.coverage.title}
                onChange={(e) => setContent({
                  ...content,
                  coverage: { ...content.coverage, title: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Opis</label>
              <textarea
                value={content.coverage.description}
                onChange={(e) => setContent({
                  ...content,
                  coverage: { ...content.coverage, description: e.target.value }
                })}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Regiony (po jednym w linii)</label>
              <textarea
                value={content.coverage.regions.join('\n')}
                onChange={(e) => setContent({
                  ...content,
                  coverage: { ...content.coverage, regions: e.target.value.split('\n').filter(item => item.trim()) }
                })}
                rows={5}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 