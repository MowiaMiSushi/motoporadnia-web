'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/app/components/ui/Notification';

interface Course {
  title: string;
  description: string;
  price: string;
  duration: string;
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
  courses: Course[];
  features: {
    title: string;
    items: string[];
  };
  additionalInfo: {
    title: string;
    description: string;
    items: string[];
  };
  requirements: {
    title: string;
    description: string;
    items: string[];
  };
}

const defaultContent: PageContent = {
  hero: {
    title: 'Szkolenia motocyklowe',
    description: 'Profesjonalne szkolenia z techniki jazdy motocyklem. Popraw swoje umiejętności pod okiem doświadczonych instruktorów.',
    images: [
      '/images/szkolenia_1.jpg',
      '/images/szkolenia_2.jpg',
      '/images/szkolenia_3.jpg'
    ]
  },
  mainSections: [
    {
      title: 'Doświadczeni instruktorzy',
      content: 'Nasi instruktorzy to doświadczeni motocykliści z wieloletnim stażem w szkoleniu. Posiadają niezbędne uprawnienia i certyfikaty.',
      image: '/images/szkolenia_1.jpg'
    },
    {
      title: 'Indywidualne podejście',
      content: 'Każde szkolenie dostosowujemy do poziomu i potrzeb kursanta. Skupiamy się na praktycznych umiejętnościach i bezpieczeństwie.',
      image: '/images/szkolenia_2.jpg'
    }
  ],
  courses: [
    {
      title: 'Kurs podstawowy',
      description: 'Podstawy techniki jazdy dla początkujących motocyklistów.',
      price: 'od 500 zł',
      duration: '1 dzień'
    },
    {
      title: 'Kurs zaawansowany',
      description: 'Zaawansowane techniki jazdy dla doświadczonych motocyklistów.',
      price: 'od 800 zł',
      duration: '2 dni'
    },
    {
      title: 'Szkolenie indywidualne',
      description: 'Indywidualne szkolenie dostosowane do potrzeb kursanta.',
      price: 'od 300 zł',
      duration: '4 godziny'
    }
  ],
  features: {
    title: 'Co wyróżnia nasze szkolenia?',
    items: [
      'Doświadczeni instruktorzy',
      'Indywidualne podejście',
      'Małe grupy szkoleniowe',
      'Nowoczesny sprzęt szkoleniowy',
      'Bezpieczny plac manewrowy',
      'Certyfikat ukończenia szkolenia'
    ]
  },
  additionalInfo: {
    title: 'Informacje dodatkowe',
    description: 'Co zapewniamy w ramach szkolenia:',
    items: [
      'Materiały szkoleniowe',
      'Napoje i przekąski',
      'Ubezpieczenie NNW',
      'Certyfikat ukończenia',
      'Możliwość wypożyczenia motocykla'
    ]
  },
  requirements: {
    title: 'Wymagania',
    description: 'Co jest potrzebne do udziału w szkoleniu:',
    items: [
      'Prawo jazdy kategorii A (odpowiedniej do typu motocykla)',
      'Własny motocykl lub możliwość wypożyczenia',
      'Kompletny strój motocyklowy',
      'Dobry stan zdrowia',
      'Chęć do nauki i doskonalenia umiejętności'
    ]
  }
};

export default function TrainingEditor() {
  const [content, setContent] = useState<PageContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/services/szkolenia');
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
      const response = await fetch('/api/content/services/szkolenia', {
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
        <h1 className="text-2xl font-bold">Edycja strony - Szkolenia motocyklowe</h1>
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

        {/* Courses Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Kursy i szkolenia</h2>
          <div className="space-y-6">
            {content.courses.map((course, index) => (
              <div key={index} className="border-b pb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nazwa kursu</label>
                    <input
                      type="text"
                      value={course.title}
                      onChange={(e) => {
                        const newCourses = [...content.courses];
                        newCourses[index] = { ...course, title: e.target.value };
                        setContent({ ...content, courses: newCourses });
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Opis</label>
                    <textarea
                      value={course.description}
                      onChange={(e) => {
                        const newCourses = [...content.courses];
                        newCourses[index] = { ...course, description: e.target.value };
                        setContent({ ...content, courses: newCourses });
                      }}
                      rows={2}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cena</label>
                    <input
                      type="text"
                      value={course.price}
                      onChange={(e) => {
                        const newCourses = [...content.courses];
                        newCourses[index] = { ...course, price: e.target.value };
                        setContent({ ...content, courses: newCourses });
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Czas trwania</label>
                    <input
                      type="text"
                      value={course.duration}
                      onChange={(e) => {
                        const newCourses = [...content.courses];
                        newCourses[index] = { ...course, duration: e.target.value };
                        setContent({ ...content, courses: newCourses });
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
                  courses: [
                    ...content.courses,
                    { title: '', description: '', price: '', duration: '' }
                  ]
                });
              }}
              className="mt-4 px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
            >
              Dodaj kurs
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Cechy szkoleń</h2>
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

        {/* Requirements Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Wymagania</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tytuł</label>
              <input
                type="text"
                value={content.requirements.title}
                onChange={(e) => setContent({
                  ...content,
                  requirements: { ...content.requirements, title: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Opis</label>
              <textarea
                value={content.requirements.description}
                onChange={(e) => setContent({
                  ...content,
                  requirements: { ...content.requirements, description: e.target.value }
                })}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Lista wymagań (po jednym w linii)</label>
              <textarea
                value={content.requirements.items.join('\n')}
                onChange={(e) => setContent({
                  ...content,
                  requirements: { ...content.requirements, items: e.target.value.split('\n').filter(item => item.trim()) }
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