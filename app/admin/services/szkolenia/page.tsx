'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/app/components/ui/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

interface Training {
  id: string;
  name: string;
  description: string;
  includes: string[];
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  fbEvent: string;
  description: string;
}

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  trainings: Training[];
  events: Event[];
  cta: {
    title: string;
    description: string;
    phoneNumber: string;
  };
  schedule: {
    title: string;
    subtitle: string;
  };
}

const initialContent: PageContent = {
  hero: {
    title: "Szkolenia motocyklowe na torze",
    description: "Profesjonalne szkolenia na najlepszych torach w Polsce. Rozwijaj swoje umiejętności pod okiem doświadczonych instruktorów.",
    images: [
      "/images/szkolenia_1.jpg",
      "/images/szkolenia_2.jpeg",
      "/images/szkolenia_3.jpg"
    ]
  },
  trainings: [
    {
      id: "tor-bydgoszcz",
      name: "Szkolenie na torze Bydgoszcz",
      description: "Profesjonalne szkolenie na jednym z najlepszych torów w Polsce. Poznaj techniki jazdy torowej i popraw swoje umiejętności pod okiem doświadczonych instruktorów.",
      includes: [
        "Teoria jazdy torowej",
        "Techniki pokonywania zakrętów",
        "Pozycja na motocyklu",
        "Analiza telemetrii",
        "Materiały szkoleniowe"
      ]
    },
    {
      id: "tor-kisielin",
      name: "Szkolenie na torze Stary Kisielin",
      description: "Szkolenie na technicznym torze w Starym Kisielinie. Idealne miejsce do nauki precyzyjnej jazdy i doskonalenia techniki.",
      includes: [
        "Teoria jazdy torowej",
        "Dobór linii przejazdu",
        "Techniki hamowania",
        "Praca z gazem",
        "Analiza przejazdów"
      ]
    }
  ],
  events: [
    {
      id: 1,
      title: "Szkolenie Bydgoszcz - Kwiecień 2025",
      date: "12-13.04.2025",
      location: "Tor Bydgoszcz",
      fbEvent: "https://facebook.com/events/123",
      description: "Dwudniowe szkolenie na torze w Bydgoszczy. Grupa początkująca i średniozaawansowana."
    }
  ],
  cta: {
    title: "Gotowy na nowe wyzwania?",
    description: "Skontaktuj się z nami i rozpocznij swoją przygodę z jazdą torową",
    phoneNumber: "789059578"
  },
  schedule: {
    title: "Harmonogram szkoleń 2025",
    subtitle: "Zapisz się na najbliższy termin"
  }
};

export default function TrainingEditor() {
  const [content, setContent] = useState<PageContent | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/services/szkolenia');
        if (response.ok) {
          const data = await response.json();
          if (Object.keys(data).length > 0) {
            if (!data.schedule) {
              data.schedule = {
                title: "Harmonogram szkoleń 2025",
                subtitle: "Zapisz się na najbliższy termin"
              };
            }
            setContent(data);
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

  const renderTrainingsEditor = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Szkolenia</h3>
        <button
          onClick={() => {
            setContent({
              ...content,
              trainings: [...content.trainings, {
                id: `training-${Date.now()}`,
                name: '',
                description: '',
                includes: []
              }]
            });
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Dodaj szkolenie
        </button>
      </div>
      {content.trainings.map((training, index) => (
        <div key={training.id} className="border p-4 rounded-md space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Szkolenie {index + 1}</h4>
            <button
              onClick={() => {
                const newTrainings = content.trainings.filter((_, i) => i !== index);
                setContent({ ...content, trainings: newTrainings });
              }}
              className="text-red-600 hover:text-red-700"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ID</label>
            <input
              type="text"
              value={training.id}
              onChange={(e) => {
                const newTrainings = [...content.trainings];
                newTrainings[index] = { ...training, id: e.target.value };
                setContent({ ...content, trainings: newTrainings });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nazwa</label>
            <input
              type="text"
              value={training.name}
              onChange={(e) => {
                const newTrainings = [...content.trainings];
                newTrainings[index] = { ...training, name: e.target.value };
                setContent({ ...content, trainings: newTrainings });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Opis</label>
            <textarea
              value={training.description}
              onChange={(e) => {
                const newTrainings = [...content.trainings];
                newTrainings[index] = { ...training, description: e.target.value };
                setContent({ ...content, trainings: newTrainings });
              }}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Program szkolenia (po jednym w linii)</label>
            <textarea
              value={training.includes.join('\n')}
              onChange={(e) => {
                const newTrainings = [...content.trainings];
                newTrainings[index] = {
                  ...training,
                  includes: e.target.value.split('\n').filter(item => item.trim())
                };
                setContent({ ...content, trainings: newTrainings });
              }}
              rows={5}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderEventsEditor = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Wydarzenia</h3>
        <button
          onClick={() => {
            const newId = Math.max(0, ...content.events.map(e => e.id)) + 1;
            setContent({
              ...content,
              events: [...content.events, {
                id: newId,
                title: '',
                date: '',
                location: '',
                fbEvent: '',
                description: ''
              }]
            });
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Dodaj wydarzenie
        </button>
      </div>

      <div className="border p-4 rounded-md space-y-4 mb-6">
        <h4 className="font-medium">Ustawienia harmonogramu</h4>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tytuł sekcji</label>
          <input
            type="text"
            value={content.schedule.title}
            onChange={(e) => setContent({
              ...content,
              schedule: { ...content.schedule, title: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Podtytuł sekcji</label>
          <input
            type="text"
            value={content.schedule.subtitle}
            onChange={(e) => setContent({
              ...content,
              schedule: { ...content.schedule, subtitle: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          />
        </div>
      </div>

      {content.events.map((event, index) => (
        <div key={event.id} className="border p-4 rounded-md space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Wydarzenie {index + 1}</h4>
            <button
              onClick={() => {
                const newEvents = content.events.filter((_, i) => i !== index);
                setContent({ ...content, events: newEvents });
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
              value={event.title}
              onChange={(e) => {
                const newEvents = [...content.events];
                newEvents[index] = { ...event, title: e.target.value };
                setContent({ ...content, events: newEvents });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data</label>
            <input
              type="text"
              value={event.date}
              onChange={(e) => {
                const newEvents = [...content.events];
                newEvents[index] = { ...event, date: e.target.value };
                setContent({ ...content, events: newEvents });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lokalizacja</label>
            <input
              type="text"
              value={event.location}
              onChange={(e) => {
                const newEvents = [...content.events];
                newEvents[index] = { ...event, location: e.target.value };
                setContent({ ...content, events: newEvents });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Link do wydarzenia na FB</label>
            <input
              type="text"
              value={event.fbEvent}
              onChange={(e) => {
                const newEvents = [...content.events];
                newEvents[index] = { ...event, fbEvent: e.target.value };
                setContent({ ...content, events: newEvents });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Opis</label>
            <textarea
              value={event.description}
              onChange={(e) => {
                const newEvents = [...content.events];
                newEvents[index] = { ...event, description: e.target.value };
                setContent({ ...content, events: newEvents });
              }}
              rows={3}
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
        <h2 className="text-2xl font-bold">Edycja strony Szkolenia</h2>
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
            onClick={() => setActiveSection('trainings')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'trainings' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Szkolenia
          </button>
          <button
            onClick={() => setActiveSection('events')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'events' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Wydarzenia
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
          {activeSection === 'trainings' && renderTrainingsEditor()}
          {activeSection === 'events' && renderEventsEditor()}
          {activeSection === 'cta' && renderCTAEditor()}
        </div>
      </div>
    </div>
  );
} 