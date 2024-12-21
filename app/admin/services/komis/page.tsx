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
  commission: {
    title: string;
    description: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
}

const defaultContent: PageContent = {
  hero: {
    title: 'Komis motocyklowy',
    description: 'Profesjonalny skup i sprzedaż motocykli używanych. Gwarantujemy uczciwą wycenę i bezpieczne transakcje.',
    images: [
      '/images/komis_1.jpg',
      '/images/komis_2.jpg',
      '/images/komis_3.jpg'
    ]
  },
  mainSections: [
    {
      title: 'Skup motocykli',
      content: 'Oferujemy uczciwe ceny za motocykle wszystkich marek. Przed wyceną przeprowadzamy dokładne oględziny i weryfikację stanu technicznego.',
      image: '/images/komis_1.jpg'
    },
    {
      title: 'Sprzedaż motocykli',
      content: 'W naszej ofercie znajdziesz szeroki wybór sprawdzonych motocykli używanych. Każdy pojazd przechodzi dokładną weryfikację techniczną.',
      image: '/images/komis_2.jpg'
    }
  ],
  services: [
    {
      title: 'Wycena motocykla',
      description: 'Profesjonalna wycena twojego motocykla.',
      price: 'bezpłatnie'
    },
    {
      title: 'Pośrednictwo w sprzedaży',
      description: 'Kompleksowa obsługa sprzedaży twojego motocykla.',
      price: 'prowizja od sprzedaży'
    },
    {
      title: 'Skup motocykli',
      description: 'Natychmiastowy skup motocykli za gotówkę.',
      price: 'wycena indywidualna'
    }
  ],
  features: {
    title: 'Co wyróżnia nasz komis?',
    items: [
      'Uczciwa wycena motocykli',
      'Profesjonalna weryfikacja techniczna',
      'Bezpieczne transakcje',
      'Pomoc w formalnościach',
      'Możliwość pozostawienia motocykla w rozliczeniu',
      'Gwarancja na zakupione motocykle'
    ]
  },
  additionalInfo: {
    title: 'Informacje dodatkowe',
    description: 'Przed skupem lub przyjęciem do komisu:',
    items: [
      'Sprawdzamy stan techniczny motocykla',
      'Weryfikujemy historię pojazdu',
      'Sprawdzamy dokumentację',
      'Przeprowadzamy jazdę próbną',
      'Przygotowujemy szczegółową dokumentację fotograficzną'
    ]
  },
  commission: {
    title: 'Jak działa nasz komis?',
    description: 'Proces sprzedaży motocykla w naszym komisie jest prosty i przejrzysty:',
    steps: [
      {
        title: 'Wycena',
        description: 'Przeprowadzamy dokładne oględziny i wycenę motocykla.'
      },
      {
        title: 'Umowa',
        description: 'Podpisujemy umowę komisową z ustalonymi warunkami sprzedaży.'
      },
      {
        title: 'Przygotowanie',
        description: 'Przygotowujemy motocykl do sprzedaży, wykonujemy profesjonalne zdjęcia i opis.'
      },
      {
        title: 'Promocja',
        description: 'Promujemy motocykl na różnych platformach sprzedażowych.'
      },
      {
        title: 'Sprzedaż',
        description: 'Zajmujemy się całym procesem sprzedaży, włącznie z formalnościami.'
      }
    ]
  }
};

export default function CommissionEditor() {
  const [content, setContent] = useState<PageContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/services/komis');
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
      const response = await fetch('/api/content/services/komis', {
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
        <h1 className="text-2xl font-bold">Edycja strony - Komis motocyklowy</h1>
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
          <h2 className="text-xl font-semibold mb-4">Usługi komisu</h2>
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
          <h2 className="text-xl font-semibold mb-4">Cechy komisu</h2>
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

        {/* Commission Process Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Proces komisowy</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tytuł</label>
              <input
                type="text"
                value={content.commission.title}
                onChange={(e) => setContent({
                  ...content,
                  commission: { ...content.commission, title: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Opis</label>
              <textarea
                value={content.commission.description}
                onChange={(e) => setContent({
                  ...content,
                  commission: { ...content.commission, description: e.target.value }
                })}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Etapy procesu</label>
              {content.commission.steps.map((step, index) => (
                <div key={index} className="mb-4 p-4 border rounded-md">
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Tytuł etapu</label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        const newSteps = [...content.commission.steps];
                        newSteps[index] = { ...step, title: e.target.value };
                        setContent({
                          ...content,
                          commission: { ...content.commission, steps: newSteps }
                        });
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Opis etapu</label>
                    <textarea
                      value={step.description}
                      onChange={(e) => {
                        const newSteps = [...content.commission.steps];
                        newSteps[index] = { ...step, description: e.target.value };
                        setContent({
                          ...content,
                          commission: { ...content.commission, steps: newSteps }
                        });
                      }}
                      rows={2}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setContent({
                    ...content,
                    commission: {
                      ...content.commission,
                      steps: [
                        ...content.commission.steps,
                        { title: '', description: '' }
                      ]
                    }
                  });
                }}
                className="mt-2 px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
              >
                Dodaj etap
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 