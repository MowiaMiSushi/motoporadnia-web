'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/app/components/ui/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlus, faTrash, faGripVertical, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface PriceListItem {
  name: string;
  price: string;
}

interface PriceListSection {
  title: string;
  icon: string;
  description: string;
  items: PriceListItem[];
}

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  pricingCategories: PriceListSection[];
}

const defaultContent: PageContent = {
  hero: {
    title: "Cennik Pomocy w Zakupie",
    description: "Profesjonalne wsparcie przy zakupie motocykla. Sprawdzimy stan techniczny, historię i dokumentację, aby pomóc Ci podjąć najlepszą decyzję.",
    images: [
      "/images/usluga_sprawdzanie_1.webp",
      "/images/hero-bg_1.webp",
      "/images/hero-bg_2.webp"
    ]
  },
  pricingCategories: [
    {
      title: "Oględziny Motocykla",
      icon: "faSearch",
      description: "Szczegółowa inspekcja stanu technicznego i wizualnego motocykla",
      items: [
        { name: "Oględziny w Poznaniu", price: "od 200 zł" },
        { name: "Oględziny poza Poznaniem", price: "od 300 zł" },
        { name: "Dojazd poza Poznań", price: "2 zł/km" }
      ]
    },
    {
      title: "Kompleksowa Pomoc",
      icon: "faClipboardCheck",
      description: "Pełne wsparcie w procesie zakupu motocykla",
      items: [
        { name: "Weryfikacja dokumentów", price: "w cenie" },
        { name: "Sprawdzenie historii", price: "w cenie" },
        { name: "Negocjacje z sprzedającym", price: "w cenie" }
      ]
    },
    {
      title: "Dodatkowe Usługi",
      icon: "faHandshake",
      description: "Wsparcie w formalnościach i transporcie",
      items: [
        { name: "Pomoc w formalnościach", price: "od 200 zł" },
        { name: "Transport motocykla", price: "indywidualnie" },
        { name: "Konsultacja telefoniczna", price: "100 zł/h" }
      ]
    }
  ]
};

export default function PurchasePricingEditor() {
  const [content, setContent] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [expandedSections, setExpandedSections] = useState<{ [key: number]: boolean }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/pricing/purchase');
        if (response.ok) {
          const data = await response.json();
          console.log('Otrzymane dane z API:', data);
          if (!data.hero || !data.pricingCategories) {
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

  const handleDragEnd = (result: any) => {
    if (!result.destination || !content) return;

    const items = Array.from(content.pricingCategories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setContent({ ...content, pricingCategories: items });
  };

  const toggleSection = (sectionIndex: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex]
    }));
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
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (!content) return;
              
              setExpandedSections(prev => {
                const allExpanded = content.pricingCategories.every((_, index) => prev[index]);
                
                if (allExpanded) {
                  return {};
                } else {
                  return content.pricingCategories.reduce((acc, _, index) => ({
                    ...acc,
                    [index]: true
                  }), {});
                }
              });
            }}
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            {content?.pricingCategories.every((_, index) => expandedSections[index]) 
              ? 'Zwiń wszystkie' 
              : 'Rozwiń wszystkie'
            }
          </button>
          <button
            onClick={() => setContent(content ? {
              ...content,
              pricingCategories: [...content.pricingCategories, {
                title: 'Nowa kategoria',
                icon: '',
                description: '',
                items: []
              }]
            } : null)}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Dodaj kategorię
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="price-list-sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-6"
            >
              {content?.pricingCategories.map((section, sectionIndex) => (
                <Draggable
                  key={sectionIndex}
                  draggableId={`section-${sectionIndex}`}
                  index={sectionIndex}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`bg-gray-50 p-4 rounded-lg ${
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
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => toggleSection(sectionIndex)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                              >
                                <FontAwesomeIcon 
                                  icon={expandedSections[sectionIndex] ? faChevronUp : faChevronDown}
                                  className="w-4 h-4"
                                />
                              </button>
                              <input
                                type="text"
                                value={section.title}
                                onChange={(e) => {
                                  const newSections = [...content.pricingCategories];
                                  newSections[sectionIndex] = {
                                    ...section,
                                    title: e.target.value
                                  };
                                  setContent({ ...content, pricingCategories: newSections });
                                }}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`space-y-4 mt-4 ${expandedSections[sectionIndex] ? '' : 'hidden'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Ikona FontAwesome
                              <span className="text-xs text-gray-500 ml-1">(np. faSearch, faHandshake, faClipboardCheck)</span>
                            </label>
                            <input
                              type="text"
                              value={section.icon}
                              onChange={(e) => {
                                const newSections = [...content.pricingCategories];
                                newSections[sectionIndex] = {
                                  ...section,
                                  icon: e.target.value
                                };
                                setContent({ ...content, pricingCategories: newSections });
                              }}
                              placeholder="Wpisz nazwę ikony z FontAwesome"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Opis kategorii</label>
                          <textarea
                            value={section.description}
                            onChange={(e) => {
                              const newSections = [...content.pricingCategories];
                              newSections[sectionIndex] = {
                                ...section,
                                description: e.target.value
                              };
                              setContent({ ...content, pricingCategories: newSections });
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
                                    value={item.name}
                                    onChange={(e) => {
                                      const newSections = [...content.pricingCategories];
                                      const newItems = [...section.items];
                                      newItems[itemIndex] = { ...item, name: e.target.value };
                                      newSections[sectionIndex] = { ...section, items: newItems };
                                      setContent({ ...content, pricingCategories: newSections });
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
                                      const newSections = [...content.pricingCategories];
                                      const newItems = [...section.items];
                                      newItems[itemIndex] = { ...item, price: e.target.value };
                                      newSections[sectionIndex] = { ...section, items: newItems };
                                      setContent({ ...content, pricingCategories: newSections });
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                  />
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <button
                                  onClick={() => {
                                    const newSections = [...content.pricingCategories];
                                    const newItems = section.items.filter((_, i) => i !== itemIndex);
                                    newSections[sectionIndex] = { ...section, items: newItems };
                                    setContent({ ...content, pricingCategories: newSections });
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
                              const newSections = [...content.pricingCategories];
                              const newItems = [...section.items, { name: '', price: '' }];
                              newSections[sectionIndex] = { ...section, items: newItems };
                              setContent({ ...content, pricingCategories: newSections });
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
                              const newSections = content.pricingCategories.filter((_, i) => i !== sectionIndex);
                              setContent({ ...content, pricingCategories: newSections });
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
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