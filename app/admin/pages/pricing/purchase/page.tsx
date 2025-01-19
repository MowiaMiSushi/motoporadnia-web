'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/app/components/ui/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlus, faTrash, faGripVertical, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface PriceListItem {
  service: string;
  price: string;
  description?: string;
}

interface PriceListSection {
  title: string;
  items: PriceListItem[];
  icon?: string;
  description?: string;
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
    title: "Cennik pomocy w zakupie motocykla",
    description: "Oferujemy profesjonalne wsparcie przy zakupie motocykla. Ceny są orientacyjne i zależą od zakresu usług oraz lokalizacji.",
    images: ['/images/purchase_1.jpg', '/images/purchase_2.jpg']
  },
  priceList: [
    {
      title: "Oględziny motocykla",
      items: [
        { service: "Podstawowe oględziny", price: "od 200 zł" },
        { service: "Szczegółowa weryfikacja", price: "od 300 zł" }
      ]
    },
    // ... inne sekcje
  ],
  disclaimer: {
    top: [
      "Ceny mogą ulec zmianie w zależności od lokalizacji motocykla.",
      "W cenę nie są wliczone koszty dojazdu powyżej 50 km."
    ],
    bottom: [
      "Oferujemy pełne wsparcie w procesie zakupu.",
      "Pomagamy w negocjacjach i weryfikacji dokumentów."
    ]
  }
};

export default function PurchasePricingEditor() {
  const [content, setContent] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/pricing/purchase');
        if (response.ok) {
          const data = await response.json();
          console.log('Otrzymane dane z API:', data);
          if (!data.hero || !data.priceList || !data.disclaimer) {
            console.log('Brak wymaganych pól, używam domyślnej zawartości');
            setContent(defaultContent);
            showNotification({
              title: 'Informacja',
              message: 'Załadowano domyślną zawartość',
              type: 'info'
            });
          } else {
            setContent(data);
          }
        } else {
          console.error('Failed to fetch content:', await response.text());
          setContent(defaultContent);
          showNotification({
            title: 'Informacja',
            message: 'Załadowano domyślną zawartość',
            type: 'info'
          });
        }
      } catch (error) {
        console.error('Error fetching content:', error);
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
      const response = await fetch('/api/content/pricing/purchase', {
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

  const renderPricingEditor = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Kategorie cennika</h3>
        <button
          onClick={() => setContent(content ? {
            ...content,
            priceList: [...content.priceList, {
              title: 'Nowa kategoria',
              items: []
            }]
          } : null)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Dodaj kategorię
        </button>
      </div>

      {content?.priceList.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa kategorii</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => {
                  const newSections = [...content.priceList];
                  newSections[sectionIndex] = {
                    ...section,
                    title: e.target.value
                  };
                  setContent({ ...content, priceList: newSections });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ikona FontAwesome
                <span className="text-xs text-gray-500 ml-1">(np. faSearch, faHandshake, faClipboardCheck)</span>
              </label>
              <input
                type="text"
                value={section.icon}
                onChange={(e) => {
                  const newSections = [...content.priceList];
                  newSections[sectionIndex] = {
                    ...section,
                    icon: e.target.value
                  };
                  setContent({ ...content, priceList: newSections });
                }}
                placeholder="Wpisz nazwę ikony z FontAwesome"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">
                Możesz użyć dowolnej ikony z FontAwesome. Wpisz nazwę ikony bez przedrostka "fa", np. "faSearch" dla ikony lupy.
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Opis kategorii</label>
            <textarea
              value={section.description}
              onChange={(e) => {
                const newSections = [...content.priceList];
                newSections[sectionIndex] = {
                  ...section,
                  description: e.target.value
                };
                setContent({ ...content, priceList: newSections });
              }}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
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
                        const newSections = [...content.priceList];
                        const newItems = [...section.items];
                        newItems[itemIndex] = { ...item, service: e.target.value };
                        newSections[sectionIndex] = { ...section, items: newItems };
                        setContent({ ...content, priceList: newSections });
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
                        const newSections = [...content.priceList];
                        const newItems = [...section.items];
                        newItems[itemIndex] = { ...item, price: e.target.value };
                        newSections[sectionIndex] = { ...section, items: newItems };
                        setContent({ ...content, priceList: newSections });
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      const newSections = [...content.priceList];
                      const newItems = section.items.filter((_, i) => i !== itemIndex);
                      newSections[sectionIndex] = { ...section, items: newItems };
                      setContent({ ...content, priceList: newSections });
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
                const newSections = [...content.priceList];
                const newItems = [...section.items, { service: '', price: '' }];
                newSections[sectionIndex] = { ...section, items: newItems };
                setContent({ ...content, priceList: newSections });
              }}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faPlus} />
              Dodaj usługę
            </button>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => {
                const newSections = content.priceList.filter((_, i) => i !== sectionIndex);
                setContent({ ...content, priceList: newSections });
              }}
              className="text-red-600 hover:text-red-700"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
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
        <h1 className="text-2xl font-bold">Edycja cennika pomocy w zakupie</h1>
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
          </nav>
        </div>

        <div className="p-6">
          {activeSection === 'hero' && renderHeroEditor()}
          {activeSection === 'pricing' && renderPricingEditor()}
        </div>
      </div>
    </div>
  );
} 