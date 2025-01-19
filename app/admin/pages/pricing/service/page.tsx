'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/app/components/ui/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlus, faTrash, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface PriceListItem {
  service: string;
  price: string;
  description?: string;
}

interface PriceListSection {
  title: string;
  items: PriceListItem[];
}

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  priceList: PriceListSection[];
  disclaimer: {
    top: string[];
    bottom: string[];
  };
}

const defaultContent: PageContent = {
  hero: {
    title: "Cennik serwisu motocyklowego",
    description: "Oferujemy profesjonalny serwis motocykli w konkurencyjnych cenach. Wszystkie ceny są orientacyjne i mogą się różnić w zależności od modelu i zakresu prac.",
    images: ['/images/serwis_1.jpg', '/images/serwis_2.jpg']
  },
  priceList: [
    {
      title: "Usługi podstawowe",
      items: [
        { service: "Przegląd podstawowy", price: "od 200 zł", description: "Kontrola podstawowych układów motocykla" },
        { service: "Przegląd rozszerzony", price: "od 300 zł", description: "Szczegółowa kontrola wszystkich układów" },
        { service: "Diagnostyka komputerowa", price: "od 150 zł" }
      ]
    },
    {
      title: "Układ hamulcowy",
      items: [
        { service: "Wymiana klocków hamulcowych (przód/tył)", price: "od 100 zł" },
        { service: "Wymiana płynu hamulcowego", price: "od 150 zł" },
        { service: "Odpowietrzenie układu hamulcowego", price: "od 120 zł" }
      ]
    },
    {
      title: "Zawieszenie/nadwozie",
      items: [
        { service: "Serwis zawieszenia przedniego", price: "od 400 zł" },
        { service: "Serwis amortyzatora tylnego", price: "od 300 zł" },
        { service: "Wymiana łożysk wahacza", price: "od 350 zł" }
      ]
    },
    {
      title: "Podstawowa obsługa silnika/skrzyni biegów",
      items: [
        { service: "Wymiana oleju i filtra", price: "od 150 zł" },
        { service: "Regulacja zaworów", price: "od 400 zł" },
        { service: "Wymiana świec zapłonowych", price: "od 100 zł" }
      ]
    },
    {
      title: "Układ napędowy",
      items: [
        { service: "Wymiana łańcucha i zębatek", price: "od 250 zł" },
        { service: "Czyszczenie i smarowanie łańcucha", price: "od 80 zł" },
        { service: "Regulacja napięcia łańcucha", price: "od 50 zł" }
      ]
    },
    {
      title: "Koła i ogumienie",
      items: [
        { service: "Wymiana opony", price: "od 100 zł" },
        { service: "Wyważanie koła", price: "od 50 zł" },
        { service: "Naprawa przebitej opony", price: "od 80 zł" }
      ]
    },
    {
      title: "Układ rozrządu",
      items: [
        { service: "Regulacja rozrządu", price: "od 300 zł" },
        { service: "Wymiana łańcucha rozrządu", price: "od 500 zł" },
        { service: "Kontrola luzów zaworowych", price: "od 200 zł" }
      ]
    },
    {
      title: "Układ zasilania/gaźniki/wtryski",
      items: [
        { service: "Czyszczenie i regulacja gaźników", price: "od 300 zł" },
        { service: "Synchronizacja gaźników", price: "od 200 zł" },
        { service: "Diagnostyka układu wtryskowego", price: "od 150 zł" }
      ]
    },
    {
      title: "Prace elektryczne",
      items: [
        { service: "Diagnostyka instalacji elektrycznej", price: "od 150 zł" },
        { service: "Naprawa wiązki elektrycznej", price: "od 200 zł" },
        { service: "Wymiana akumulatora", price: "od 50 zł" }
      ]
    }
  ],
  disclaimer: {
    top: [
      "Poniższy cennik powstał na bazie naszego doświadczenia związanego z należytą i profesjonalną obsługą motocykli.",
      "Ceny bazują na roboczogodzinach, które trzeba poświęć aby zgodnie ze sztuką dokonać serwisu Waszych motocykli.",
      "Przewidują one też wszelkie utrudnienia w trakcie wykonywanych prac wynikających najczęściej z wieku motocykla czy wcześniejszych nieodpowiednio przeprowadzanych napraw oraz czas poświęcony na poszukiwanie trudniej dostępnych części.",
      "Podana cena może ulec zmianie w trakcie wykonywanych prac stosunkowo w jedną jak i drugą stronę.",
      "Powyższe ceny nie zawierają cen części zamiennych."
    ],
    bottom: [
      "Wszystkie inne nie wymienione czynności, usługi, prace są wyceniane indywidualnie zawsze na początku zlecenia przed przystąpieniem do pracy.",
      "Powyższy cennik nie stanowi oferty dla klienta a zawarte w nim ceny są poglądowe w rozumieniu prawa cywilnego, art. 71 kodeksu cywilnego i stanowią zaproszenie do zawarcia umowy/zlecenia wykonania usługi.",
      "Wszystkie ceny zawarte w cenniku są cenami brutto i zawierają podatek VAT 23%. Na usługę wystawiamy paragon bądź fakturę VAT."
    ]
  }
};

export default function ServicePricingEditor() {
  const [content, setContent] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/pricing/service');
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        } else {
          console.error('Failed to fetch content:', await response.text());
          // Jeśli nie udało się pobrać danych, użyj domyślnych
          setContent(defaultContent);
          showNotification({
            title: 'Informacja',
            message: 'Załadowano domyślną zawartość',
            type: 'info'
          });
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        // W przypadku błędu również użyj domyślnych danych
        setContent(defaultContent);
        showNotification({
          title: 'Informacja',
          message: 'Załadowano domyślną zawartość',
          type: 'info'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleSave = async () => {
    if (!content) return;

    try {
      setIsSaving(true);
      const response = await fetch('/api/content/pricing/service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        showNotification({
          title: 'Sukces',
          message: 'Zmiany zostały zapisane',
          type: 'success'
        });
        router.refresh();
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      console.error('Error saving content:', error);
      showNotification({
        title: 'Błąd',
        message: 'Błąd podczas zapisywania zmian',
        type: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(content?.priceList || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setContent(content ? { ...content, priceList: items } : null);
  };

  const renderHeroEditor = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Sekcja Hero</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tytuł</label>
        <input
          type="text"
          value={content?.hero.title}
          onChange={(e) => setContent(content ? {
            ...content,
            hero: { ...content.hero, title: e.target.value }
          } : null)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Opis</label>
        <textarea
          value={content?.hero.description}
          onChange={(e) => setContent(content ? {
            ...content,
            hero: { ...content.hero, description: e.target.value }
          } : null)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Zdjęcia (po jednym URL w linii)</label>
        <textarea
          value={content?.hero.images.join('\n')}
          onChange={(e) => setContent(content ? {
            ...content,
            hero: { ...content.hero, images: e.target.value.split('\n').filter(url => url.trim()) }
          } : null)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
      </div>
    </div>
  );

  const renderPriceListEditor = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Cennik usług</h3>
        <button
          onClick={() => setContent(content ? {
            ...content,
            priceList: [...content.priceList, { title: 'Nowa sekcja', items: [] }]
          } : null)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Dodaj sekcję
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="price-list-sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-6"
            >
              {content?.priceList.map((section, sectionIndex) => (
                <Draggable
                  key={sectionIndex}
                  draggableId={`section-${sectionIndex}`}
                  index={sectionIndex}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`bg-gray-50 p-4 rounded-lg space-y-4 ${
                        snapshot.isDragging ? 'shadow-lg' : ''
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-move text-gray-400 hover:text-gray-600"
                          >
                            <FontAwesomeIcon icon={faGripVertical} />
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nazwa sekcji
                            </label>
                            <input
                              type="text"
                              value={section.title}
                              onChange={(e) => {
                                const newPriceList = [...(content?.priceList || [])];
                                newPriceList[sectionIndex] = {
                                  ...section,
                                  title: e.target.value
                                };
                                setContent(content ? { ...content, priceList: newPriceList } : null);
                              }}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const newPriceList = content?.priceList.filter((_, i) => i !== sectionIndex);
                            setContent(content ? { ...content, priceList: newPriceList } : null);
                          }}
                          className="bg-red-100 text-red-600 px-4 py-2 rounded-md hover:bg-red-200 transition-colors"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>

                      <div className="space-y-4">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="bg-white p-4 rounded-md shadow-sm space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa usługi</label>
                                <input
                                  type="text"
                                  value={item.service}
                                  onChange={(e) => {
                                    const newPriceList = [...(content?.priceList || [])];
                                    const newItems = [...section.items];
                                    newItems[itemIndex] = { ...item, service: e.target.value };
                                    newPriceList[sectionIndex] = { ...section, items: newItems };
                                    setContent(content ? { ...content, priceList: newPriceList } : null);
                                  }}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cena</label>
                                <input
                                  type="text"
                                  value={item.price}
                                  onChange={(e) => {
                                    const newPriceList = [...(content?.priceList || [])];
                                    const newItems = [...section.items];
                                    newItems[itemIndex] = { ...item, price: e.target.value };
                                    newPriceList[sectionIndex] = { ...section, items: newItems };
                                    setContent(content ? { ...content, priceList: newPriceList } : null);
                                  }}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Opis (opcjonalnie)</label>
                              <input
                                type="text"
                                value={item.description || ''}
                                onChange={(e) => {
                                  const newPriceList = [...(content?.priceList || [])];
                                  const newItems = [...section.items];
                                  newItems[itemIndex] = { ...item, description: e.target.value };
                                  newPriceList[sectionIndex] = { ...section, items: newItems };
                                  setContent(content ? { ...content, priceList: newPriceList } : null);
                                }}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                              />
                            </div>
                            <div className="flex justify-end">
                              <button
                                onClick={() => {
                                  const newPriceList = [...(content?.priceList || [])];
                                  const newItems = section.items.filter((_, i) => i !== itemIndex);
                                  newPriceList[sectionIndex] = { ...section, items: newItems };
                                  setContent(content ? { ...content, priceList: newPriceList } : null);
                                }}
                                className="text-red-600 hover:text-red-700"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newPriceList = [...(content?.priceList || [])];
                            const newItems = [...section.items, { service: '', price: '', description: '' }];
                            newPriceList[sectionIndex] = { ...section, items: newItems };
                            setContent(content ? { ...content, priceList: newPriceList } : null);
                          }}
                          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center gap-2"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                          Dodaj usługę
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );

  const renderDisclaimerEditor = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Górne zastrzeżenia</h3>
        <div className="space-y-4">
          {content?.disclaimer.top.map((text, index) => (
            <div key={index} className="flex gap-4">
              <textarea
                value={text}
                onChange={(e) => {
                  const newTop = [...content.disclaimer.top];
                  newTop[index] = e.target.value;
                  setContent(content ? {
                    ...content,
                    disclaimer: { ...content.disclaimer, top: newTop }
                  } : null);
                }}
                rows={2}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
              <button
                onClick={() => {
                  const newTop = content.disclaimer.top.filter((_, i) => i !== index);
                  setContent(content ? {
                    ...content,
                    disclaimer: { ...content.disclaimer, top: newTop }
                  } : null);
                }}
                className="text-red-600 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newTop = [...content!.disclaimer.top, ''];
              setContent(content ? {
                ...content,
                disclaimer: { ...content.disclaimer, top: newTop }
              } : null);
            }}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Dodaj zastrzeżenie
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Dolne zastrzeżenia</h3>
        <div className="space-y-4">
          {content?.disclaimer.bottom.map((text, index) => (
            <div key={index} className="flex gap-4">
              <textarea
                value={text}
                onChange={(e) => {
                  const newBottom = [...content.disclaimer.bottom];
                  newBottom[index] = e.target.value;
                  setContent(content ? {
                    ...content,
                    disclaimer: { ...content.disclaimer, bottom: newBottom }
                  } : null);
                }}
                rows={2}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
              <button
                onClick={() => {
                  const newBottom = content.disclaimer.bottom.filter((_, i) => i !== index);
                  setContent(content ? {
                    ...content,
                    disclaimer: { ...content.disclaimer, bottom: newBottom }
                  } : null);
                }}
                className="text-red-600 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newBottom = [...content!.disclaimer.bottom, ''];
              setContent(content ? {
                ...content,
                disclaimer: { ...content.disclaimer, bottom: newBottom }
              } : null);
            }}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Dodaj zastrzeżenie
          </button>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edycja cennika serwisu</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faSave} />
          {isSaving ? 'Zapisywanie...' : 'Zapisz zmiany'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveSection('hero')}
              className={`px-6 py-4 font-medium ${
                activeSection === 'hero'
                  ? 'border-b-2 border-red-500 text-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sekcja Hero
            </button>
            <button
              onClick={() => setActiveSection('pricing')}
              className={`px-6 py-4 font-medium ${
                activeSection === 'pricing'
                  ? 'border-b-2 border-red-500 text-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Cennik
            </button>
            <button
              onClick={() => setActiveSection('disclaimer')}
              className={`px-6 py-4 font-medium ${
                activeSection === 'disclaimer'
                  ? 'border-b-2 border-red-500 text-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Zastrzeżenia
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeSection === 'hero' && renderHeroEditor()}
          {activeSection === 'pricing' && renderPriceListEditor()}
          {activeSection === 'disclaimer' && renderDisclaimerEditor()}
        </div>
      </div>
    </div>
  );
} 