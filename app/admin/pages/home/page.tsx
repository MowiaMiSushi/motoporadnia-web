'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/app/components/ui/Notification';

interface HeroSection {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  images: string[];
}

interface ServiceSection {
  title: string;
  services: Array<{
    icon: string;
    title: string;
    description: string;
    link: string;
    linkText: string;
  }>;
}

interface AdditionalSection {
  title: string;
  services: Array<{
    icon: string;
    title: string;
    description: string;
    link: string;
    linkText: string;
  }>;
}

interface PromoSection {
  title: string;
  videoUrl: string;
}

interface CTASection {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    link: string;
  };
  secondaryButton: {
    text: string;
    link: string;
  };
}

interface HomePageContent {
  hero: HeroSection;
  services: ServiceSection;
  additional: AdditionalSection;
  promo: PromoSection;
  cta: CTASection;
}

const initialContent: HomePageContent = {
  hero: {
    title: 'MotoPoradnia',
    description: 'Fachowa pomoc przy zakupie, transporcie i serwisie motocykli jest to firma, stworzona przez ludzi, którzy nie wyobrażają sobie otaczającego ich świata bez jednośladów.',
    buttonText: 'Dowiedz się więcej o nas',
    buttonLink: '/o-nas',
    images: ['/images/hero-bg_1.jpg', '/images/hero-bg_2.jpg', '/images/hero-bg_3.png']
  },
  services: {
    title: 'Nasze usługi',
    services: [
      {
        icon: 'faHandshake',
        title: 'Pomoc w zakupie Motocykla',
        description: 'Pomagamy w wyborze i zakupie motocykla. Sprawdzamy stan techniczny i dokumentację. Doradzamy w wyborze motocykla sprawdzając wszystkie dostępne oferty.',
        link: '/uslugi/pomoc-w-zakupie',
        linkText: 'Zobacz szczegóły'
      },
      {
        icon: 'faWrench',
        title: 'Serwis motocykli',
        description: 'Profesjonalny serwis motocyklowy. Wykonujemy przeglądy, naprawy i modyfikacje.',
        link: '/uslugi/serwis',
        linkText: 'Dowiedz się więcej'
      },
      {
        icon: 'faTruck',
        title: 'Transport motocykli',
        description: 'Bezpieczny transport motocykli na terenie Poznania i okolic.',
        link: '/uslugi/transport',
        linkText: 'Sprawdź ofertę'
      }
    ]
  },
  additional: {
    title: 'Dodatkowo oferujemy',
    services: [
      {
        icon: 'faMotorcycle',
        title: 'Komis motocyklowy',
        description: 'W naszym komisie znajdziesz szeroki wybór sprawdzonych jednośladów. Pomagamy w wyborze i załatwiamy wszystkie formalności.',
        link: '/komis',
        linkText: 'Zobacz ofertę'
      },
      {
        icon: 'faGraduationCap',
        title: 'Szkolenia motocyklowe',
        description: 'Oferujemy profesjonalne szkolenia motocyklowe dla początkujących i zaawansowanych. Nasi instruktorzy pomogą Ci rozwinąć umiejętności i pewność siebie na motocyklu.',
        link: '/szkolenia',
        linkText: 'Dowiedz się więcej'
      }
    ]
  },
  promo: {
    title: 'Film promocyjny o nas',
    videoUrl: 'https://www.youtube.com/embed/6KlCvhyna94'
  },
  cta: {
    title: 'Potrzebujesz pomocy z motocyklem?',
    description: 'Skontaktuj się z nami i dowiedz się więcej o naszych usługach',
    primaryButton: {
      text: 'Zadzwoń teraz',
      link: 'tel:789059578'
    },
    secondaryButton: {
      text: 'Napisz do nas',
      link: '/kontakt'
    }
  }
};

export default function HomePageEditor() {
  const [content, setContent] = useState<HomePageContent>(initialContent);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/home');
        if (response.ok) {
          const data = await response.json();
          if (Object.keys(data).length > 0) {
            setContent(data);
          }
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        showNotification({
          title: 'Błąd',
          message: 'Błąd podczas wczytywania treści',
          type: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch('/api/content/home', {
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
        <label className="block text-sm font-medium text-gray-700">Tekst przycisku</label>
        <input
          type="text"
          value={content.hero.buttonText}
          onChange={(e) => setContent({
            ...content,
            hero: { ...content.hero, buttonText: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Link przycisku</label>
        <input
          type="text"
          value={content.hero.buttonLink}
          onChange={(e) => setContent({
            ...content,
            hero: { ...content.hero, buttonLink: e.target.value }
          })}
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

  const renderServicesEditor = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sekcja Usług</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tytuł sekcji</label>
        <input
          type="text"
          value={content.services.title}
          onChange={(e) => setContent({
            ...content,
            services: { ...content.services, title: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>
      {content.services.services.map((service, index) => (
        <div key={index} className="border p-4 rounded-md space-y-4">
          <h4 className="font-medium">Usługa {index + 1}</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tytuł</label>
            <input
              type="text"
              value={service.title}
              onChange={(e) => {
                const newServices = [...content.services.services];
                newServices[index] = { ...service, title: e.target.value };
                setContent({
                  ...content,
                  services: { ...content.services, services: newServices }
                });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Opis</label>
            <textarea
              value={service.description}
              onChange={(e) => {
                const newServices = [...content.services.services];
                newServices[index] = { ...service, description: e.target.value };
                setContent({
                  ...content,
                  services: { ...content.services, services: newServices }
                });
              }}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Link</label>
            <input
              type="text"
              value={service.link}
              onChange={(e) => {
                const newServices = [...content.services.services];
                newServices[index] = { ...service, link: e.target.value };
                setContent({
                  ...content,
                  services: { ...content.services, services: newServices }
                });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tekst linku</label>
            <input
              type="text"
              value={service.linkText}
              onChange={(e) => {
                const newServices = [...content.services.services];
                newServices[index] = { ...service, linkText: e.target.value };
                setContent({
                  ...content,
                  services: { ...content.services, services: newServices }
                });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderAdditionalEditor = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sekcja Dodatkowa</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tytuł sekcji</label>
        <input
          type="text"
          value={content.additional.title}
          onChange={(e) => setContent({
            ...content,
            additional: { ...content.additional, title: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>
      {content.additional.services.map((service, index) => (
        <div key={index} className="border p-4 rounded-md space-y-4">
          <h4 className="font-medium">Usługa {index + 1}</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tytuł</label>
            <input
              type="text"
              value={service.title}
              onChange={(e) => {
                const newServices = [...content.additional.services];
                newServices[index] = { ...service, title: e.target.value };
                setContent({
                  ...content,
                  additional: { ...content.additional, services: newServices }
                });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Opis</label>
            <textarea
              value={service.description}
              onChange={(e) => {
                const newServices = [...content.additional.services];
                newServices[index] = { ...service, description: e.target.value };
                setContent({
                  ...content,
                  additional: { ...content.additional, services: newServices }
                });
              }}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Link</label>
            <input
              type="text"
              value={service.link}
              onChange={(e) => {
                const newServices = [...content.additional.services];
                newServices[index] = { ...service, link: e.target.value };
                setContent({
                  ...content,
                  additional: { ...content.additional, services: newServices }
                });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tekst linku</label>
            <input
              type="text"
              value={service.linkText}
              onChange={(e) => {
                const newServices = [...content.additional.services];
                newServices[index] = { ...service, linkText: e.target.value };
                setContent({
                  ...content,
                  additional: { ...content.additional, services: newServices }
                });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderPromoEditor = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sekcja Promocyjna</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tytuł</label>
        <input
          type="text"
          value={content.promo.title}
          onChange={(e) => setContent({
            ...content,
            promo: { ...content.promo, title: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">URL filmu</label>
        <input
          type="text"
          value={content.promo.videoUrl}
          onChange={(e) => setContent({
            ...content,
            promo: { ...content.promo, videoUrl: e.target.value }
          })}
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
        <h4 className="font-medium">Przycisk główny</h4>
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tekst</label>
            <input
              type="text"
              value={content.cta.primaryButton.text}
              onChange={(e) => setContent({
                ...content,
                cta: {
                  ...content.cta,
                  primaryButton: { ...content.cta.primaryButton, text: e.target.value }
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Link</label>
            <input
              type="text"
              value={content.cta.primaryButton.link}
              onChange={(e) => setContent({
                ...content,
                cta: {
                  ...content.cta,
                  primaryButton: { ...content.cta.primaryButton, link: e.target.value }
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      </div>
      <div>
        <h4 className="font-medium">Przycisk dodatkowy</h4>
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tekst</label>
            <input
              type="text"
              value={content.cta.secondaryButton.text}
              onChange={(e) => setContent({
                ...content,
                cta: {
                  ...content.cta,
                  secondaryButton: { ...content.cta.secondaryButton, text: e.target.value }
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Link</label>
            <input
              type="text"
              value={content.cta.secondaryButton.link}
              onChange={(e) => setContent({
                ...content,
                cta: {
                  ...content.cta,
                  secondaryButton: { ...content.cta.secondaryButton, link: e.target.value }
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Edycja strony głównej</h2>
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
            onClick={() => setActiveSection('services')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'services' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Sekcja Usług
          </button>
          <button
            onClick={() => setActiveSection('additional')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'additional' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Sekcja Dodatkowa
          </button>
          <button
            onClick={() => setActiveSection('promo')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'promo' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Panel Reklamowy
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
          {activeSection === 'services' && renderServicesEditor()}
          {activeSection === 'additional' && renderAdditionalEditor()}
          {activeSection === 'promo' && renderPromoEditor()}
          {activeSection === 'cta' && renderCTAEditor()}
        </div>
      </div>
    </div>
  );
} 