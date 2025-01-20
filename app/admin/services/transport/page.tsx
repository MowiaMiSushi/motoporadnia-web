'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/app/components/ui/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';


interface MainSection {
  title: string;
  description: string;
  image: string;
}

interface Area {
  icon: string;
  text: string;
}

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  mainSections: MainSection[];
  operatingArea: {
    title: string;
    description: string;
    areas: Area[];
    additionalInfo: string;
  };
  cta: {
    title: string;
    description: string;
    phoneNumber: string;
  };
}

const initialContent: PageContent = {
  hero: {
    title: "Transport motocykli Poznań i Europa",
    description: "Profesjonalny transport motocykli na terenie Poznania, całej Polski i Europy. Bezpieczny przewóz jednośladów z pełnym ubezpieczeniem.",
    images: [
      "/images/transport_1.webp",
      "/images/transport_2.webp",
      "/images/transport_3.webp"
    ]
  },
  mainSections: [
    {
      title: "Profesjonalny transport motocykli na terenie Poznania i Europy",
      description: "Transport motocykli wykonujemy w sposób w pełni profesjonalny, z najwyższą dbałością o bezpieczeństwo Twojego jednośladu. Specjalizujemy się w bezpiecznym i sprawnym transporcie motocykli zarówno lokalnie, jak i na długich dystansach międzynarodowych.",
      image: "/images/transport_3.webp"
    },
    {
      title: "Największa gwarancja bezpieczeństwa",
      description: "Dla maksymalnego bezpieczeństwa podczas załadunku i rozładunku, korzystamy z wytrzymałego najazdu aluminiowego o udźwigu do 400kg. Transportowany motocykl jest zamocowany w specjalnym doku pod przednie koło, które uniemożliwia jego przechylenie na boki.",
      image: "/images/transport_1.webp"
    },
    {
      title: "Najlepsze zabezpieczenie motocykla",
      description: "Każdy motocykl zabezpieczamy profesjonalnymi pasami transportowymi w 2 lub 4 punktach, w zależności od typu i gabarytów jednośladu. Oferujemy możliwość przewozu do 2 motocykli jednocześnie, co pozwala zoptymalizować koszty transportu.",
      image: "/images/transport_2.webp"
    }
  ],
  operatingArea: {
    title: "Obszar działania",
    description: "Świadczymy kompleksowe usługi transportowe na trzech poziomach:",
    areas: [
      {
        icon: "faTruck",
        text: "Transport lokalny - Poznań i okolice (do 50 km)"
      },
      {
        icon: "faTruckArrowRight",
        text: "Transport krajowy - cała Polska"
      },
      {
        icon: "faRoadBarrier",
        text: "Transport międzynarodowy - kraje Unii Europejskiej"
      }
    ],
    additionalInfo: "Ceny ustalamy indywidualnie w zależności od odległości, ilości motocykli i specyfiki transportu. Zapewniamy konkurencyjne stawki i pełne ubezpieczenie podczas transportu."
  },
  cta: {
    title: "Potrzebujesz transportu motocykla?",
    description: "Skontaktuj się z nami, aby ustalić szczegóły transportu i otrzymać wycenę.",
    phoneNumber: "789059578"
  }
};

export default function TransportEditor() {
  const [content, setContent] = useState<PageContent | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/services/transport');
        if (response.ok) {
          const data = await response.json();
          if (data.content && Object.keys(data.content).length > 0) {
            setContent(data.content);
          } else {
            setContent(initialContent);
          }
        } else {
          setContent(initialContent);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        showNotification({
          title: 'Błąd',
          message: 'Błąd podczas wczytywania treści',
          type: 'error'
        });
        setContent(initialContent);
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

      showNotification({
        title: 'Sukces',
        message: 'Zmiany zostały zapisane',
        type: 'success'
      });
      router.refresh();
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

  if (isLoading || !content) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Ładowanie...</div>
        </div>
      </div>
    );
  }

  const renderHeroEditor = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sekcja Hero</h3>
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
  );

  const renderMainSectionsEditor = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Sekcje główne</h3>
        <button
          onClick={() => {
            setContent({
              ...content,
              mainSections: [...content.mainSections, { title: '', description: '', image: '' }]
            });
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Dodaj sekcję
        </button>
      </div>
      {content.mainSections.map((section, index) => (
        <div key={index} className="border p-4 rounded-md space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Sekcja {index + 1}</h4>
            <button
              onClick={() => {
                const newSections = content.mainSections.filter((_, i) => i !== index);
                setContent({ ...content, mainSections: newSections });
              }}
              className="text-red-600 hover:text-red-700"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tytuł</label>
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
            <label className="block text-sm font-medium text-gray-700">Opis</label>
            <textarea
              value={section.description}
              onChange={(e) => {
                const newSections = [...content.mainSections];
                newSections[index] = { ...section, description: e.target.value };
                setContent({ ...content, mainSections: newSections });
              }}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL Obrazu</label>
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
      ))}
    </div>
  );

  const renderOperatingAreaEditor = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Obszar działania</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tytuł</label>
        <input
          type="text"
          value={content.operatingArea.title}
          onChange={(e) => setContent({
            ...content,
            operatingArea: { ...content.operatingArea, title: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Opis</label>
        <textarea
          value={content.operatingArea.description}
          onChange={(e) => setContent({
            ...content,
            operatingArea: { ...content.operatingArea, description: e.target.value }
          })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">Obszary</label>
          <button
            onClick={() => {
              setContent({
                ...content,
                operatingArea: {
                  ...content.operatingArea,
                  areas: [...content.operatingArea.areas, { icon: '', text: '' }]
                }
              });
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Dodaj obszar
          </button>
        </div>
        {content.operatingArea.areas.map((area, index) => (
          <div key={index} className="border p-4 rounded-md space-y-4 mb-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Obszar {index + 1}</h4>
              <button
                onClick={() => {
                  const newAreas = content.operatingArea.areas.filter((_, i) => i !== index);
                  setContent({
                    ...content,
                    operatingArea: { ...content.operatingArea, areas: newAreas }
                  });
                }}
                className="text-red-600 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ikona</label>
              <input
                type="text"
                value={area.icon}
                onChange={(e) => {
                  const newAreas = [...content.operatingArea.areas];
                  newAreas[index] = { ...area, icon: e.target.value };
                  setContent({
                    ...content,
                    operatingArea: { ...content.operatingArea, areas: newAreas }
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tekst</label>
              <input
                type="text"
                value={area.text}
                onChange={(e) => {
                  const newAreas = [...content.operatingArea.areas];
                  newAreas[index] = { ...area, text: e.target.value };
                  setContent({
                    ...content,
                    operatingArea: { ...content.operatingArea, areas: newAreas }
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Dodatkowe informacje</label>
        <textarea
          value={content.operatingArea.additionalInfo}
          onChange={(e) => setContent({
            ...content,
            operatingArea: { ...content.operatingArea, additionalInfo: e.target.value }
          })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>
    </div>
  );

  const renderCTAEditor = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sekcja CTA</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tytuł</label>
        <input
          type="text"
          value={content.cta.title}
          onChange={(e) => setContent({
            ...content,
            cta: { ...content.cta, title: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Opis</label>
        <textarea
          value={content.cta.description}
          onChange={(e) => setContent({
            ...content,
            cta: { ...content.cta, description: e.target.value }
          })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Numer telefonu</label>
        <input
          type="text"
          value={content.cta.phoneNumber}
          onChange={(e) => setContent({
            ...content,
            cta: { ...content.cta, phoneNumber: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Edycja strony Transport</h2>
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

      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-1 space-y-2">
          <button
            onClick={() => setActiveSection('hero')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'hero' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Sekcja Hero
          </button>
          <button
            onClick={() => setActiveSection('mainSections')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'mainSections' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Sekcje główne
          </button>
          <button
            onClick={() => setActiveSection('operatingArea')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'operatingArea' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Obszar działania
          </button>
          <button
            onClick={() => setActiveSection('cta')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'cta' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Sekcja CTA
          </button>
        </div>

        <div className="col-span-3 bg-white p-6 rounded-lg shadow">
          {activeSection === 'hero' && renderHeroEditor()}
          {activeSection === 'mainSections' && renderMainSectionsEditor()}
          {activeSection === 'operatingArea' && renderOperatingAreaEditor()}
          {activeSection === 'cta' && renderCTAEditor()}
        </div>
      </div>
    </div>
  );
} 