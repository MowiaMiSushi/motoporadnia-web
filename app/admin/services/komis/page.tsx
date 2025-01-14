'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/app/components/ui/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

interface Platform {
  name: string;
  description: string;
  url: string;
  icon: string;
}

interface Step {
  title: string;
  description: string;
  icon: string;
}

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  platforms: Platform[];
  steps: Step[];
  cta: {
    title: string;
    description: string;
    phoneNumber: string;
  };
}

const initialContent: PageContent = {
  hero: {
    title: "Komis motocyklowy",
    description: "Profesjonalna pomoc w sprzedaży i zakupie motocykla. Sprawdzamy stan techniczny i dokumentację każdego pojazdu.",
    images: [
      "/images/komis_1.jpg",
      "/images/hero-bg_1.jpg",
      "/images/hero-bg_2.jpg"
    ]
  },
  platforms: [
    {
      name: "OtoMoto",
      description: "Największa platforma ogłoszeń motoryzacyjnych w Polsce",
      url: "https://www.otomoto.pl/",
      icon: "faMotorcycle"
    },
    {
      name: "OLX",
      description: "Popularna platforma ogłoszeniowa z szerokim wyborem motocykli",
      url: "https://www.olx.pl/",
      icon: "faMotorcycle"
    },
    {
      name: "Facebook",
      description: "Społecznościowa platforma ogłoszeniowa",
      url: "https://www.facebook.com/motoporadnia/?locale=pl_PL",
      icon: "faFacebook"
    },
    {
      name: "Instagram",
      description: "Śledź nasze najnowsze ogłoszenia na Instagramie",
      url: "https://www.instagram.com/motoporadnia/",
      icon: "faInstagram"
    }
  ],
  steps: [
    {
      title: "Wstępna wycena",
      description: "Na podstawie przesłanych zdjęć i opisu dokonujemy wstępnej wyceny motocykla.",
      icon: "faSearch"
    },
    {
      title: "Oględziny",
      description: "Umawiamy się na spotkanie, podczas którego dokładnie sprawdzamy stan techniczny pojazdu.",
      icon: "faListCheck"
    },
    {
      title: "Dokumentacja fotograficzna",
      description: "Wykonujemy profesjonalne zdjęcia motocykla do ogłoszenia.",
      icon: "faCamera"
    },
    {
      title: "Umowa komisu",
      description: "Podpisujemy umowę komisową, ustalając warunki sprzedaży.",
      icon: "faFileContract"
    },
    {
      title: "Wystawienie ogłoszenia",
      description: "Przygotowujemy atrakcyjne ogłoszenie i publikujemy je na popularnych portalach.",
      icon: "faHandshake"
    },
    {
      title: "Finalizacja sprzedaży",
      description: "Po znalezieniu kupca finalizujemy transakcję i wypłacamy środki.",
      icon: "faMoneyBillWave"
    }
  ],
  cta: {
    title: "Chcesz sprzedać lub kupić motocykl?",
    description: "Skontaktuj się z nami i skorzystaj z naszego doświadczenia",
    phoneNumber: "789059578"
  }
};

export default function CommissionEditor() {
  const [content, setContent] = useState<PageContent>({
    hero: {
      title: "",
      description: "",
      images: []
    },
    platforms: [],
    steps: [],
    cta: {
      title: "",
      description: "",
      phoneNumber: ""
    }
  });
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/services/komis');
        if (response.ok) {
          const data = await response.json();
          setContent({
            hero: {
              title: data.hero?.title || initialContent.hero.title,
              description: data.hero?.description || initialContent.hero.description,
              images: data.hero?.images || initialContent.hero.images
            },
            platforms: Array.isArray(data.platforms) ? data.platforms : initialContent.platforms,
            steps: Array.isArray(data.steps) ? data.steps : initialContent.steps,
            cta: {
              title: data.cta?.title || initialContent.cta.title,
              description: data.cta?.description || initialContent.cta.description,
              phoneNumber: data.cta?.phoneNumber || initialContent.cta.phoneNumber
            }
          });
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

  if (isLoading) {
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

  const renderPlatformsEditor = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Platformy sprzedażowe</h3>
        <button
          onClick={() => {
            const newPlatforms = Array.isArray(content.platforms) ? [...content.platforms] : [];
            setContent({
              ...content,
              platforms: [...newPlatforms, {
                name: '',
                description: '',
                url: '',
                icon: 'faMotorcycle'
              }]
            });
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Dodaj platformę
        </button>
      </div>
      {(Array.isArray(content.platforms) ? content.platforms : []).map((platform, index) => (
        <div key={index} className="border p-4 rounded-md space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Platforma {index + 1}</h4>
            <button
              onClick={() => {
                const newPlatforms = content.platforms.filter((_, i) => i !== index);
                setContent({ ...content, platforms: newPlatforms });
              }}
              className="text-red-600 hover:text-red-700"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nazwa</label>
            <input
              type="text"
              value={platform.name}
              onChange={(e) => {
                const newPlatforms = [...content.platforms];
                newPlatforms[index] = { ...platform, name: e.target.value };
                setContent({ ...content, platforms: newPlatforms });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Opis</label>
            <textarea
              value={platform.description}
              onChange={(e) => {
                const newPlatforms = [...content.platforms];
                newPlatforms[index] = { ...platform, description: e.target.value };
                setContent({ ...content, platforms: newPlatforms });
              }}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL</label>
            <input
              type="text"
              value={platform.url}
              onChange={(e) => {
                const newPlatforms = [...content.platforms];
                newPlatforms[index] = { ...platform, url: e.target.value };
                setContent({ ...content, platforms: newPlatforms });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ikona</label>
            <input
              type="text"
              value={platform.icon}
              onChange={(e) => {
                const newPlatforms = [...content.platforms];
                newPlatforms[index] = { ...platform, icon: e.target.value };
                setContent({ ...content, platforms: newPlatforms });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderStepsEditor = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Kroki procesu</h3>
        <button
          onClick={() => {
            const newSteps = Array.isArray(content.steps) ? [...content.steps] : [];
            setContent({
              ...content,
              steps: [...newSteps, {
                title: '',
                description: '',
                icon: 'faCircle'
              }]
            });
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Dodaj krok
        </button>
      </div>
      {(Array.isArray(content.steps) ? content.steps : []).map((step, index) => (
        <div key={index} className="border p-4 rounded-md space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Krok {index + 1}</h4>
            <button
              onClick={() => {
                const newSteps = content.steps.filter((_, i) => i !== index);
                setContent({ ...content, steps: newSteps });
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
              value={step.title}
              onChange={(e) => {
                const newSteps = [...(content?.steps || [])];
                newSteps[index] = { ...step, title: e.target.value };
                setContent({ ...content, steps: newSteps });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Opis</label>
            <textarea
              value={step.description}
              onChange={(e) => {
                const newSteps = [...(content?.steps || [])];
                newSteps[index] = { ...step, description: e.target.value };
                setContent({ ...content, steps: newSteps });
              }}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ikona</label>
            <input
              type="text"
              value={step.icon}
              onChange={(e) => {
                const newSteps = [...(content?.steps || [])];
                newSteps[index] = { ...step, icon: e.target.value };
                setContent({ ...content, steps: newSteps });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      ))}
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
        <h2 className="text-2xl font-bold">Edycja strony Komis</h2>
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
            onClick={() => setActiveSection('steps')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'steps' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Kroki procesu
          </button>
          <button
            onClick={() => setActiveSection('platforms')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'platforms' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Platformy sprzedażowe
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
          {activeSection === 'steps' && renderStepsEditor()}
          {activeSection === 'platforms' && renderPlatformsEditor()}
          {activeSection === 'cta' && renderCTAEditor()}
        </div>
      </div>
    </div>
  );
} 