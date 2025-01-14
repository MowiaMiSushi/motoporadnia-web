'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/app/components/ui/Notification';

interface HeroSection {
  title: string;
  description: string;
  images: string[];
}

interface HistorySection {
  title: string;
  sections: Array<{
    content: string[];
    image: string;
  }>;
}

interface TeamSection {
  title: string;
  members: Array<{
    name: string;
    position: string;
    image: string;
  }>;
}

interface SocialMediaSection {
  title: string;
  platforms: Array<{
    name: string;
    icon: string;
    url: string;
    description: string;
  }>;
}

interface AboutContent {
  hero: HeroSection;
  history: HistorySection;
  team: TeamSection;
  socialMedia: SocialMediaSection;
}

const initialContent: AboutContent = {
  hero: {
    title: 'O nas',
    description: 'Poznaj naszą historię i pasję do motocykli',
    images: [
      '/images/hero-bg_1.jpg',
      '/images/hero-bg_2.jpg',
      '/images/hero-bg_3.png'
    ]
  },
  history: {
    title: 'Nasza Historia',
    sections: [
      {
        content: [
          'Motoporadnia – Fachowa pomoc przy zakupie, transporcie i serwisie motocykli jest to firma, stworzona przez ludzi, którzy nie wyobrażają sobie otaczającego ich świata bez jednośladów.',
          'Początek działalności miał miejsce już w najmłodszych latach założyciela. Adrian, zaraz po stawianiu pierwszych kroków wsiadł na elektrycznie napędzanego Repsola aby pokonywać pierwsze metry na dwóch (wtedy jeszcze czterech) kółkach.'
        ],
        image: '/images/o-nas_3.jpg'
      },
      {
        content: [
          'Proces rozwojowy naszej pasji i nauki wszystkiego co motocyklowe szedł swoim naturalnym trybem. Pierwsze motocykle z czasów radzieckich, ujeżdżanie wszystkiego co ma silnik i koła w czasach szkolnych, siedzenie do późnych nocy w garażu usprawniając i modyfikując swoje motocykle, praca w warsztatach.',
          'Kolejne lata doświadczenie jak należycie obsługiwać motocykl zachowując najwyższą jakość bezpieczeństwa, serwisu i estetyki nabieraliśmy na torach wyścigowych jako mechanicy znanych zawodników oraz sami biorąc czynny udział na linii startu.'
        ],
        image: '/images/o-nas_2.jpg'
      },
      {
        content: [
          'Efektem tego czego nauczyliśmy się przez te wszystkie motocyklowe lata, setki godzin pracy i tysiące pokonanych kilometrów na drogach oraz torach jest Motoporadnia. Firma, gdzie każdy motocyklista niezależnie od doświadczenia znajdzie odpowiedź na swoje motocyklowe pytania oraz potrzeby przy pomocy specjalistów i profesjonalistów.',
          'Zapraszamy do zapoznania się z zakresem naszych usług, który z czasem na pewno będzie się powiększał!'
        ],
        image: '/images/o-nas_1.jpg'
      }
    ]
  },
  team: {
    title: 'Nasz Zespół',
    members: [
      {
        name: 'Aleksandra',
        position: 'Przedstawicielka',
        image: '/images/pracownik_1.png'
      },
      {
        name: 'Adrian',
        position: 'Kierownik',
        image: '/images/pracownik_2.png'
      },
      {
        name: 'Bartosz',
        position: 'Mechanik',
        image: '/images/pracownik_3.png'
      }
    ]
  },
  socialMedia: {
    title: 'Śledź nas w social mediach',
    platforms: [
      {
        name: 'Facebook',
        icon: 'facebook',
        url: 'https://www.facebook.com/motoporadnia',
        description: 'Dołącz do naszej społeczności na Facebooku'
      },
      {
        name: 'Instagram',
        icon: 'instagram',
        url: 'https://www.instagram.com/motoporadnia',
        description: 'Zobacz nasze najnowsze zdjęcia'
      },
      {
        name: 'YouTube',
        icon: 'youtube',
        url: 'https://www.youtube.com/@motoporadnia',
        description: 'Obejrzyj nasze filmy i poradniki'
      }
    ]
  }
};

export default function AboutPageEditor() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/about');
        if (response.ok) {
          const data = await response.json();
          if (Object.keys(data).length > 0) {
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
      const response = await fetch('/api/content/about', {
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

  const renderHeroEditor = () => {
    if (!content?.hero) return null;
    
    return (
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
          <input
            type="text"
            value={content.hero.description}
            onChange={(e) => setContent({
              ...content,
              hero: { ...content.hero, description: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Zdjęcia w tle (po jednym URL w linii)</label>
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
  };

  const renderHistoryEditor = () => {
    if (!content?.history) return null;
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sekcja Historia</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tytuł sekcji</label>
          <input
            type="text"
            value={content.history.title}
            onChange={(e) => setContent({
              ...content,
              history: { ...content.history, title: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          />
        </div>
        {content.history.sections.map((section, index) => (
          <div key={index} className="border p-4 rounded-md space-y-4">
            <h4 className="font-medium">Sekcja {index + 1}</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tekst</label>
              <textarea
                value={section.content.join('\n\n')}
                onChange={(e) => {
                  const newSections = [...content.history.sections];
                  newSections[index] = {
                    ...section,
                    content: e.target.value.split('\n\n').filter(t => t.trim())
                  };
                  setContent({
                    ...content,
                    history: { ...content.history, sections: newSections }
                  });
                }}
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">URL Zdjęcia</label>
              <input
                type="text"
                value={section.image}
                onChange={(e) => {
                  const newSections = [...content.history.sections];
                  newSections[index] = {
                    ...section,
                    image: e.target.value
                  };
                  setContent({
                    ...content,
                    history: { ...content.history, sections: newSections }
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTeamEditor = () => {
    if (!content?.team) return null;
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sekcja Zespołu</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tytuł sekcji</label>
          <input
            type="text"
            value={content.team.title}
            onChange={(e) => setContent({
              ...content,
              team: { ...content.team, title: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          />
        </div>
        {content.team.members.map((member, index) => (
          <div key={index} className="border p-4 rounded-md space-y-4">
            <h4 className="font-medium">Członek zespołu {index + 1}</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700">Imię</label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => {
                  const newMembers = [...content.team.members];
                  newMembers[index] = { ...member, name: e.target.value };
                  setContent({
                    ...content,
                    team: { ...content.team, members: newMembers }
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stanowisko</label>
              <input
                type="text"
                value={member.position}
                onChange={(e) => {
                  const newMembers = [...content.team.members];
                  newMembers[index] = { ...member, position: e.target.value };
                  setContent({
                    ...content,
                    team: { ...content.team, members: newMembers }
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">URL Zdjęcia</label>
              <input
                type="text"
                value={member.image}
                onChange={(e) => {
                  const newMembers = [...content.team.members];
                  newMembers[index] = { ...member, image: e.target.value };
                  setContent({
                    ...content,
                    team: { ...content.team, members: newMembers }
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                const newMembers = content.team.members.filter((_, i) => i !== index);
                setContent({
                  ...content,
                  team: { ...content.team, members: newMembers }
                });
              }}
              className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
            >
              Usuń członka zespołu
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            setContent({
              ...content,
              team: {
                ...content.team,
                members: [
                  ...content.team.members,
                  { name: '', position: '', image: '' }
                ]
              }
            });
          }}
          className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
        >
          Dodaj członka zespołu
        </button>
      </div>
    );
  };

  const renderSocialMediaEditor = () => {
    if (!content?.socialMedia) return null;
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sekcja Social Media</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tytuł sekcji</label>
          <input
            type="text"
            value={content.socialMedia.title}
            onChange={(e) => setContent({
              ...content,
              socialMedia: { ...content.socialMedia, title: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          />
        </div>
        {content.socialMedia.platforms.map((platform, index) => (
          <div key={index} className="border p-4 rounded-md space-y-4">
            <h4 className="font-medium">Social Media {index + 1}</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700">Platforma</label>
              <input
                type="text"
                value={platform.name}
                onChange={(e) => {
                  const newPlatforms = [...content.socialMedia.platforms];
                  newPlatforms[index] = { ...platform, name: e.target.value };
                  setContent({
                    ...content,
                    socialMedia: { ...content.socialMedia, platforms: newPlatforms }
                  });
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
                  const newPlatforms = [...content.socialMedia.platforms];
                  newPlatforms[index] = { ...platform, icon: e.target.value };
                  setContent({
                    ...content,
                    socialMedia: { ...content.socialMedia, platforms: newPlatforms }
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">URL</label>
              <input
                type="text"
                value={platform.url}
                onChange={(e) => {
                  const newPlatforms = [...content.socialMedia.platforms];
                  newPlatforms[index] = { ...platform, url: e.target.value };
                  setContent({
                    ...content,
                    socialMedia: { ...content.socialMedia, platforms: newPlatforms }
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Opis</label>
              <input
                type="text"
                value={platform.description}
                onChange={(e) => {
                  const newPlatforms = [...content.socialMedia.platforms];
                  newPlatforms[index] = { ...platform, description: e.target.value };
                  setContent({
                    ...content,
                    socialMedia: { ...content.socialMedia, platforms: newPlatforms }
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Edycja strony O nas</h2>
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
            onClick={() => setActiveSection('history')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'history' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Historia
          </button>
          <button
            onClick={() => setActiveSection('team')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'team' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Zespół
          </button>
          <button
            onClick={() => setActiveSection('socialMedia')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'socialMedia' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Social Media
          </button>
        </div>

        <div className="col-span-3 bg-white p-6 rounded-lg shadow">
          {activeSection === 'hero' && renderHeroEditor()}
          {activeSection === 'history' && renderHistoryEditor()}
          {activeSection === 'team' && renderTeamEditor()}
          {activeSection === 'socialMedia' && renderSocialMediaEditor()}
        </div>
      </div>
    </div>
  );
} 