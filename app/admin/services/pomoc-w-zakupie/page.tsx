'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/app/components/ui/Notification';

interface Section {
  title: string;
  content: string;
  image?: string;
}

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  mainSections: Section[];
  features: {
    title: string;
    items: string[];
  };
  additionalInfo: {
    firstBike: {
      title: string;
      description: string;
      items: string[];
    };
    selectedBike: {
      title: string;
      description: string;
      items: string[];
      additionalInfo: string;
    };
  };
  remoteService: {
    title: string;
    description: string[];
  };
}

const defaultContent: PageContent = {
  hero: {
    title: 'Pomoc w zakupie motocykla',
    description: 'Profesjonalne wsparcie i doradztwo przy zakupie motocykla. Sprawdzimy stan techniczny i historię pojazdu.',
    images: [
      '/images/usluga_sprawdzanie_1.jpg',
      '/images/usluga_sprawdzanie_2.jpg',
      '/images/serwis_2.jpg'
    ]
  },
  mainSections: [
    {
      title: 'Profesjonalne doradztwo przy zakupie',
      content: 'Główną dziedziną naszej działalności jest doradztwo i pomoc w zakupie motocykla. Wykorzystując nasze wieloletnie doświadczenie w mechanice motocyklowej oraz korzystając z wielu profesjonalnych narzędzi, staramy się w jak najbardziej rzetelny sposób ocenić rzeczywisty stan techniczny oglądanego motocykla.',
      image: '/images/usluga_sprawdzanie_1.jpg'
    },
    {
      title: 'Profesjonalne narzędzia diagnostyczne',
      content: 'Podczas oględzin, wykorzystujemy takie narzędzia jak wskaźnik osiowości tylnego koła, profesjonalny miernik lakieru, tester akumulatorów czy tester jakości płynu hamulcowego i chłodniczego.',
      image: '/images/usluga_sprawdzanie_2.jpg'
    }
  ],
  features: {
    title: 'Co zawiera usługa pomocy w zakupie motocykla?',
    items: [
      'Ocena stanu technicznego motocykla',
      'Weryfikacja historii pojazdu',
      'Jazda próbna',
      'Wstępny kosztorys ewentualnych napraw',
      'Negocjacja ceny zakupu w oparciu o konkretne argumenty',
      'Możliwość przetransportowania motocykla',
      'Zniżkę na dokonanie podstawowych czynności serwisowych w naszym warsztacie'
    ]
  },
  additionalInfo: {
    firstBike: {
      title: 'Pierwszy motocykl - co przygotować?',
      description: 'Jeśli zgłaszasz się do nas w celu poszukiwania swojego pierwszego motocykla, przygotuj dla nas takie informacje jak:',
      items: [
        'Jaki planujesz przeznaczyć budżet na zakup motocykla?',
        'Czy masz zakupioną kompletną odzież motocyklową?',
        'Jakie są Twoje preferencje dotyczące motocykla? Sport, Naked a może coś z klasy Adventure?',
        'Czy masz jakieś doświadczenie motocyklowe poza kursem prawa jazdy?',
        'Jakie są Twoje predyspozycje, to znaczy waga i wzrost'
      ]
    },
    selectedBike: {
      title: 'Masz wybrany motocykl?',
      description: 'Natomiast jeśli przychodzisz z konkretnym egzemplarzem, prosimy o uzyskanie takich informacji jak:',
      items: [
        'numer VIN',
        'data pierwszej rejestracji (za granicą)',
        'numer rejestracyjny'
      ],
      additionalInfo: 'Wszystkie wyżej wymienione informacje znajdują się na pierwszej stronie dowodu rejestracyjnego, te dane pozwolą nam na sprawdzenie historii pojazdu i weryfikacje historii kolizyjnej.'
    }
  },
  remoteService: {
    title: 'Zakup w pełni zdalny!',
    description: [
      'Świadczymy również usługę zakupu w pełni zdalnego!',
      'Jeśli nie masz czasu aby wybrać się wspólnie z nami na miejsce oględzin i chcesz zaufać naszemu profesjonalizmowi oferujemy zakup zdalny motocykla! Jedziemy, weryfikujemy, kupujemy i dostarczamy Twój motocykl pod dom bez Twojej obecności!'
    ]
  }
};

export default function PurchaseAssistanceEditor() {
  const [content, setContent] = useState<PageContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/services/pomoc-w-zakupie');
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
      const response = await fetch('/api/content/services/pomoc-w-zakupie', {
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
        <h1 className="text-2xl font-bold">Edycja strony - Pomoc w zakupie</h1>
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

        {/* Features Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Cechy usługi</h2>
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
                rows={7}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Informacje dodatkowe</h2>
          
          {/* First Bike Section */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Pierwszy motocykl</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tytuł</label>
                <input
                  type="text"
                  value={content.additionalInfo.firstBike.title}
                  onChange={(e) => setContent({
                    ...content,
                    additionalInfo: {
                      ...content.additionalInfo,
                      firstBike: {
                        ...content.additionalInfo.firstBike,
                        title: e.target.value
                      }
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Opis</label>
                <textarea
                  value={content.additionalInfo.firstBike.description}
                  onChange={(e) => setContent({
                    ...content,
                    additionalInfo: {
                      ...content.additionalInfo,
                      firstBike: {
                        ...content.additionalInfo.firstBike,
                        description: e.target.value
                      }
                    }
                  })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Lista punktów (po jednym w linii)</label>
                <textarea
                  value={content.additionalInfo.firstBike.items.join('\n')}
                  onChange={(e) => setContent({
                    ...content,
                    additionalInfo: {
                      ...content.additionalInfo,
                      firstBike: {
                        ...content.additionalInfo.firstBike,
                        items: e.target.value.split('\n').filter(item => item.trim())
                      }
                    }
                  })}
                  rows={5}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Selected Bike Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Wybrany motocykl</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tytuł</label>
                <input
                  type="text"
                  value={content.additionalInfo.selectedBike.title}
                  onChange={(e) => setContent({
                    ...content,
                    additionalInfo: {
                      ...content.additionalInfo,
                      selectedBike: {
                        ...content.additionalInfo.selectedBike,
                        title: e.target.value
                      }
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Opis</label>
                <textarea
                  value={content.additionalInfo.selectedBike.description}
                  onChange={(e) => setContent({
                    ...content,
                    additionalInfo: {
                      ...content.additionalInfo,
                      selectedBike: {
                        ...content.additionalInfo.selectedBike,
                        description: e.target.value
                      }
                    }
                  })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Lista punktów (po jednym w linii)</label>
                <textarea
                  value={content.additionalInfo.selectedBike.items.join('\n')}
                  onChange={(e) => setContent({
                    ...content,
                    additionalInfo: {
                      ...content.additionalInfo,
                      selectedBike: {
                        ...content.additionalInfo.selectedBike,
                        items: e.target.value.split('\n').filter(item => item.trim())
                      }
                    }
                  })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dodatkowe informacje</label>
                <textarea
                  value={content.additionalInfo.selectedBike.additionalInfo}
                  onChange={(e) => setContent({
                    ...content,
                    additionalInfo: {
                      ...content.additionalInfo,
                      selectedBike: {
                        ...content.additionalInfo.selectedBike,
                        additionalInfo: e.target.value
                      }
                    }
                  })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Remote Service Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Usługa zdalna</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tytuł</label>
              <input
                type="text"
                value={content.remoteService.title}
                onChange={(e) => setContent({
                  ...content,
                  remoteService: { ...content.remoteService, title: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Opisy (po jednym w linii)</label>
              <textarea
                value={content.remoteService.description.join('\n')}
                onChange={(e) => setContent({
                  ...content,
                  remoteService: { ...content.remoteService, description: e.target.value.split('\n').filter(item => item.trim()) }
                })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 