'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faImage, faUpload } from '@fortawesome/free-solid-svg-icons';
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

interface ImageSelectorProps {
  currentImage: string;
  onImageSelect: (image: string) => void;
  onClose: () => void;
}

const ImageSelector = ({ currentImage, onImageSelect, onClose }: ImageSelectorProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/admin/images');
        if (response.ok) {
          const data = await response.json();
          setImages(data.images);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onImageSelect(data.url);
        onClose();
        showNotification({
          title: 'Sukces',
          message: 'Zdjęcie zostało przesłane',
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      showNotification({
        title: 'Błąd',
        message: 'Nie udało się przesłać zdjęcia',
        type: 'error'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Wybierz zdjęcie</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={currentImage}
              onChange={(e) => onImageSelect(e.target.value)}
              placeholder="Wpisz URL zdjęcia"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faUpload} />
              Prześlij nowe
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Ładowanie galerii...</div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onImageSelect(image);
                    onClose();
                  }}
                  className={`relative aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-red-500 transition-all ${
                    currentImage === image ? 'ring-2 ring-red-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`Galeria ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
  const [showImageSelector, setShowImageSelector] = useState<number | string | null>(null);
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
        <h3 className="text-lg font-semibold">Historia</h3>
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
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Sekcja {index + 1}</h4>
              <button
                onClick={() => {
                  if (!content) return;
                  const newSections = content.history.sections.filter((_, i) => i !== index);
                  setContent({
                    ...content,
                    history: { ...content.history, sections: newSections }
                  });
                }}
                className="text-red-600 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Treść</label>
              {section.content.map((text, textIndex) => (
                <div key={textIndex} className="mt-2">
                  <textarea
                    value={text}
                    onChange={(e) => {
                      if (!content) return;
                      const newSections = [...content.history.sections];
                      const newContent = [...section.content];
                      newContent[textIndex] = e.target.value;
                      newSections[index] = { ...section, content: newContent };
                      setContent({
                        ...content,
                        history: { ...content.history, sections: newSections }
                      });
                    }}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                  <button
                    onClick={() => {
                      if (!content) return;
                      const newSections = [...content.history.sections];
                      const newContent = section.content.filter((_, i) => i !== textIndex);
                      newSections[index] = { ...section, content: newContent };
                      setContent({
                        ...content,
                        history: { ...content.history, sections: newSections }
                      });
                    }}
                    className="mt-1 text-red-600 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-1" />
                    Usuń paragraf
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  if (!content) return;
                  const newSections = [...content.history.sections];
                  const newContent = [...section.content, ''];
                  newSections[index] = { ...section, content: newContent };
                  setContent({
                    ...content,
                    history: { ...content.history, sections: newSections }
                  });
                }}
                className="mt-2 text-red-600 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-1" />
                Dodaj paragraf
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Zdjęcie</label>
              <div className="mt-1 flex items-center gap-4">
                <input
                  type="text"
                  value={section.image}
                  onChange={(e) => {
                    if (!content) return;
                    const newSections = [...content.history.sections];
                    newSections[index] = { ...section, image: e.target.value };
                    setContent({
                      ...content,
                      history: { ...content.history, sections: newSections }
                    });
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
                <button
                  onClick={() => setShowImageSelector(index)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faImage} />
                  Wybierz zdjęcie
                </button>
              </div>
              {section.image && (
                <div className="mt-2">
                  <img
                    src={section.image}
                    alt={`Zdjęcie sekcji ${index + 1}`}
                    className="max-w-xs rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            if (!content) return;
            const newSections = [
              ...content.history.sections,
              { content: [''], image: '' }
            ];
            setContent({
              ...content,
              history: { ...content.history, sections: newSections }
            });
          }}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Dodaj nową sekcję
        </button>
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
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Członek zespołu {index + 1}</h4>
              <button
                onClick={() => {
                  const newMembers = content.team.members.filter((_, i) => i !== index);
                  setContent({
                    ...content,
                    team: { ...content.team, members: newMembers }
                  });
                }}
                className="text-red-600 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
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
              <label className="block text-sm font-medium text-gray-700">Zdjęcie</label>
              <div className="mt-1 flex items-center gap-4">
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
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
                <button
                  onClick={() => setShowImageSelector(`team-${index}`)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faImage} />
                  Wybierz zdjęcie
                </button>
              </div>
              {member.image && (
                <div className="mt-2">
                  <img
                    src={member.image}
                    alt={`Zdjęcie ${member.name}`}
                    className="max-w-xs rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            const newMembers = [
              ...content.team.members,
              { name: '', position: '', image: '' }
            ];
            setContent({
              ...content,
              team: { ...content.team, members: newMembers }
            });
          }}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Dodaj nowego członka zespołu
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

      {(showImageSelector !== null && content) && (
        <ImageSelector
          currentImage={
            typeof showImageSelector === 'number'
              ? content.history.sections[showImageSelector].image
              : typeof showImageSelector === 'string' && showImageSelector.startsWith('team-')
              ? content.team.members[parseInt(showImageSelector.replace('team-', ''))].image
              : ''
          }
          onImageSelect={(image) => {
            if (typeof showImageSelector === 'number') {
              const newSections = [...content.history.sections];
              newSections[showImageSelector] = {
                ...newSections[showImageSelector],
                image
              };
              setContent({
                ...content,
                history: { ...content.history, sections: newSections }
              });
            } else if (typeof showImageSelector === 'string' && showImageSelector.startsWith('team-')) {
              const memberIndex = parseInt(showImageSelector.replace('team-', ''));
              const newMembers = [...content.team.members];
              newMembers[memberIndex] = {
                ...newMembers[memberIndex],
                image
              };
              setContent({
                ...content,
                team: { ...content.team, members: newMembers }
              });
            }
          }}
          onClose={() => setShowImageSelector(null)}
        />
      )}
    </div>
  );
} 