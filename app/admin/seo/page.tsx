'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faTools, faTruck, faHandshake, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import SeoEditor from '@/app/components/admin/SeoEditor';
import { showNotification } from '@/app/components/ui/Notification';

interface PageSeo {
  id: string;
  name: string;
  path: string;
  icon: any;
  seoData: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
    ogTitle: string;
    ogDescription: string;
  };
}

interface SeoData {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
}

const pages: PageSeo[] = [
  {
    id: 'home',
    name: 'Strona główna',
    path: '/',
    icon: faHome,
    seoData: {
      title: 'MotoPoradnia - Profesjonalny Serwis Motocyklowy w Poznaniu',
      description: 'MotoPoradnia oferuje profesjonalny serwis motocyklowy, transport motocykli, szkolenia i pomoc w zakupie. Sprawdź naszą ofertę!',
      keywords: 'serwis motocyklowy, warsztat motocyklowy, naprawa motocykli, transport motocykli, szkolenia motocyklowe, pomoc w zakupie motocykla, Poznań',
      ogImage: '/images/og-image.webp',
      ogTitle: 'MotoPoradnia - Twój Profesjonalny Serwis Motocyklowy',
      ogDescription: 'Kompleksowa obsługa motocykli w Poznaniu. Serwis, transport, szkolenia i pomoc w zakupie.'
    }
  },
  {
    id: 'about',
    name: 'O nas',
    path: '/o-nas',
    icon: faInfoCircle,
    seoData: {
      title: 'O nas - MotoPoradnia | Poznaj nasz zespół i warsztat',
      description: 'Poznaj zespół MotoPoradni - doświadczonych mechaników i pasjonatów motocykli. Dowiedz się więcej o naszym warsztacie i filozofii pracy.',
      keywords: 'warsztat motocyklowy poznań, mechanicy motocyklowi, serwis motocykli poznań, doświadczeni mechanicy',
      ogImage: '/images/about-og.webp',
      ogTitle: 'O nas - MotoPoradnia | Profesjonalny zespół mechaników',
      ogDescription: 'Poznaj zespół doświadczonych mechaników MotoPoradni. Pasja do motocykli i profesjonalizm to nasze DNA.'
    }
  },
  {
    id: 'services',
    name: 'Usługi',
    path: '/uslugi',
    icon: faTools,
    seoData: {
      title: 'Usługi - MotoPoradnia | Kompleksowa obsługa motocykli',
      description: 'Oferujemy szeroki zakres usług: serwis motocykli, transport, szkolenia i pomoc w zakupie. Sprawdź, co możemy dla Ciebie zrobić.',
      keywords: 'usługi motocyklowe, serwis motocykli, transport motocykli, szkolenia motocyklowe, pomoc w zakupie motocykla',
      ogImage: '/images/services-og.webp',
      ogTitle: 'Usługi MotoPoradni - Kompleksowa obsługa motocykli',
      ogDescription: 'Szeroki zakres usług motocyklowych: serwis, transport, szkolenia i doradztwo przy zakupie.'
    }
  },
  {
    id: 'transport',
    name: 'Transport',
    path: '/uslugi/transport',
    icon: faTruck,
    seoData: {
      title: 'Transport motocykli - MotoPoradnia | Bezpieczny przewóz',
      description: 'Profesjonalny transport motocykli w Poznaniu i całej Polsce. Bezpieczny przewóz, konkurencyjne ceny, pełne ubezpieczenie.',
      keywords: 'transport motocykli, przewóz motocykli, laweta dla motocykli, transport motocykla poznań',
      ogImage: '/images/transport-og.webp',
      ogTitle: 'Transport motocykli - Bezpieczny przewóz z MotoPoradnią',
      ogDescription: 'Profesjonalny transport motocykli w Poznaniu i całej Polsce. Bezpieczeństwo i konkurencyjne ceny.'
    }
  },
  {
    id: 'service',
    name: 'Serwis',
    path: '/uslugi/serwis',
    icon: faTools,
    seoData: {
      title: 'Serwis motocyklowy - MotoPoradnia | Profesjonalna obsługa',
      description: 'Kompleksowy serwis motocyklowy w Poznaniu. Naprawy, przeglądy, diagnostyka i konserwacja. Doświadczeni mechanicy i nowoczesny sprzęt.',
      keywords: 'serwis motocyklowy, naprawa motocykli, przegląd motocykla, mechanik motocyklowy poznań',
      ogImage: '/images/service-og.webp',
      ogTitle: 'Serwis motocyklowy MotoPoradnia - Profesjonalna obsługa',
      ogDescription: 'Kompleksowy serwis motocyklowy w Poznaniu. Naprawy, przeglądy i diagnostyka.'
    }
  },
  {
    id: 'purchase-help',
    name: 'Pomoc w zakupie',
    path: '/uslugi/pomoc-w-zakupie',
    icon: faHandshake,
    seoData: {
      title: 'Pomoc w zakupie motocykla - MotoPoradnia | Profesjonalne doradztwo',
      description: 'Profesjonalne doradztwo przy zakupie motocykla. Sprawdzamy stan techniczny, historię i dokumenty. Pomagamy w negocjacjach.',
      keywords: 'pomoc w zakupie motocykla, sprawdzenie motocykla, ocena stanu technicznego, doradztwo motocyklowe',
      ogImage: '/images/purchase-help-og.webp',
      ogTitle: 'Pomoc w zakupie motocykla - Profesjonalne doradztwo',
      ogDescription: 'Profesjonalna pomoc przy zakupie motocykla. Sprawdzamy stan techniczny i pomagamy w negocjacjach.'
    }
  },
  {
    id: 'training',
    name: 'Szkolenia',
    path: '/uslugi/szkolenia',
    icon: faGraduationCap,
    seoData: {
      title: 'Szkolenia motocyklowe - MotoPoradnia | Rozwijaj swoje umiejętności',
      description: 'Profesjonalne szkolenia motocyklowe w Poznaniu. Doskonalenie techniki jazdy, obsługa motocykla, bezpieczeństwo na drodze.',
      keywords: 'szkolenia motocyklowe, kurs motocyklowy, doskonalenie jazdy, nauka jazdy motocyklem',
      ogImage: '/images/training-og.webp',
      ogTitle: 'Szkolenia motocyklowe MotoPoradnia - Rozwijaj swoje umiejętności',
      ogDescription: 'Profesjonalne szkolenia motocyklowe. Doskonalenie techniki jazdy i bezpieczeństwo na drodze.'
    }
  }
];

export default function SeoAdmin() {
  const [selectedPage, setSelectedPage] = useState<PageSeo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [seoData, setSeoData] = useState<{ [key: string]: any }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await fetch('/api/admin/seo');
        if (response.ok) {
          const data = await response.json();
          setSeoData(data);
        } else {
          console.error('Failed to fetch SEO data:', await response.text());
          // Używamy domyślnych danych z tablicy pages
          const defaultData = pages.reduce<Record<string, SeoData>>((acc, page) => {
            acc[page.id] = page.seoData;
            return acc;
          }, {});
          setSeoData(defaultData);
          showNotification({
            title: 'Informacja',
            message: 'Załadowano domyślne ustawienia SEO',
            type: 'info'
          });
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error);
        // Używamy domyślnych danych z tablicy pages
        const defaultData = pages.reduce<Record<string, SeoData>>((acc, page) => {
          acc[page.id] = page.seoData;
          return acc;
        }, {});
        setSeoData(defaultData);
        showNotification({
          title: 'Informacja',
          message: 'Załadowano domyślne ustawienia SEO',
          type: 'info'
        });
      } finally {
        setIsLoading(false);
        setSelectedPage(pages[0]);
      }
    };

    fetchSeoData();
  }, []);

  const handleSave = async (pageSeoData: any) => {
    if (!selectedPage) return;

    try {
      const updatedSeoData = {
        ...seoData,
        [selectedPage.id]: pageSeoData
      };

      const response = await fetch('/api/admin/seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSeoData),
      });

      if (response.ok) {
        setSeoData(updatedSeoData);
        showNotification({
          title: 'Sukces',
          message: 'Ustawienia SEO zostały zapisane',
          type: 'success'
        });
        router.refresh();
      } else {
        throw new Error(await response.text());
      }
    } catch (err) {
      console.error('Błąd podczas zapisywania ustawień SEO:', err);
      showNotification({
        title: 'Błąd',
        message: 'Wystąpił błąd podczas zapisywania ustawień SEO',
        type: 'error'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Zarządzanie SEO</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Lista stron */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Strony</h2>
            <nav className="space-y-1">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setSelectedPage(page)}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    selectedPage?.id === page.id
                      ? 'bg-red-50 text-red-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FontAwesomeIcon icon={page.icon} className="mr-3 h-4 w-4" />
                  {page.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Edytor SEO */}
        <div className="lg:col-span-3">
          {selectedPage && (
            <SeoEditor
              initialData={seoData[selectedPage.id] || selectedPage.seoData}
              onSave={handleSave}
              pageName={selectedPage.name}
            />
          )}
        </div>
      </div>
    </div>
  );
} 