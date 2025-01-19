'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faImage, faUpload, faGripVertical, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { showNotification } from '@/app/components/ui/Notification';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
  const [expandedSocialMedia, setExpandedSocialMedia] = useState<{ [key: number]: boolean }>({});
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

  const handleDragEndSocialMedia = (result: any) => {
    if (!result.destination || !content) return;

    const items = Array.from(content.socialMedia.platforms);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setContent({
      ...content,
      socialMedia: { ...content.socialMedia, platforms: items }
    });
  };

  const toggleSocialMedia = (index: number) => {
    setExpandedSocialMedia(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const addSocialMedia = () => {
    if (!content) return;
    setContent({
      ...content,
      socialMedia: {
        ...content.socialMedia,
        platforms: [
          ...content.socialMedia.platforms,
          { name: '', icon: '', url: '', description: '' }
        ]
      }
    });
  };

  const removeSocialMedia = (index: number) => {
    if (!content) return;
    const newPlatforms = content.socialMedia.platforms.filter((_, i) => i !== index);
    setContent({
      ...content,
      socialMedia: { ...content.socialMedia, platforms: newPlatforms }
    });
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Zdjęcia</label>
        <div className="space-y-4">
          {content.hero.images.map((image, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border rounded-md">
              <div className="w-24 h-24 relative">
                <img
                  src={image}
                  alt={`Hero image ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex-grow">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => {
                    const newImages = [...content.hero.images];
                    newImages[index] = e.target.value;
                    setContent({
                      ...content,
                      hero: { ...content.hero, images: newImages }
                    });
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowImageSelector(`hero-${index}`)}
                  className="bg-gray-100 text-gray-600 p-2 rounded-md hover:bg-gray-200 transition-colors"
                  title="Wybierz z galerii"
                >
                  <FontAwesomeIcon icon={faImage} />
                </button>
                <button
                  onClick={() => {
                    const newImages = content.hero.images.filter((_, i) => i !== index);
                    setContent({
                      ...content,
                      hero: { ...content.hero, images: newImages }
                    });
                  }}
                  className="text-red-600 p-2 hover:bg-red-50 rounded-md"
                  title="Usuń zdjęcie"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              setContent({
                ...content,
                hero: {
                  ...content.hero,
                  images: [...content.hero.images, '']
                }
              });
            }}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Dodaj zdjęcie
          </button>
        </div>
      </div>
    </div>
  );

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
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Media społecznościowe</h3>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const allExpanded = content.socialMedia.platforms.every((_, index) => expandedSocialMedia[index]);
                setExpandedSocialMedia(
                  content.socialMedia.platforms.reduce((acc, _, index) => ({
                    ...acc,
                    [index]: !allExpanded
                  }), {})
                );
              }}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors"
            >
              {content.socialMedia.platforms.every((_, index) => expandedSocialMedia[index]) 
                ? 'Zwiń wszystkie' 
                : 'Rozwiń wszystkie'
              }
            </button>
            <button
              onClick={addSocialMedia}
              className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors flex items-center"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Dodaj medium
            </button>
          </div>
        </div>

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

        <DragDropContext onDragEnd={handleDragEndSocialMedia}>
          <Droppable droppableId="social-media">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {content.socialMedia.platforms.map((platform, index) => (
                  <Draggable key={index} draggableId={`platform-${index}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`border p-4 rounded-md ${snapshot.isDragging ? 'bg-gray-50' : ''}`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div {...provided.dragHandleProps} className="cursor-move text-gray-400 hover:text-gray-600">
                              <FontAwesomeIcon icon={faGripVertical} />
                            </div>
                            <h4 className="font-medium">{platform.name || 'Nowe medium'}</h4>
                            <button
                              onClick={() => toggleSocialMedia(index)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <FontAwesomeIcon 
                                icon={expandedSocialMedia[index] ? faChevronUp : faChevronDown}
                                className="w-4 h-4"
                              />
                            </button>
                          </div>
                          <button
                            onClick={() => removeSocialMedia(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>

                        {expandedSocialMedia[index] && (
                          <div className="mt-4 space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Nazwa</label>
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
                              <label className="block text-sm font-medium text-gray-700">Ikona FontAwesome</label>
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
                              <textarea
                                value={platform.description}
                                onChange={(e) => {
                                  const newPlatforms = [...content.socialMedia.platforms];
                                  newPlatforms[index] = { ...platform, description: e.target.value };
                                  setContent({
                                    ...content,
                                    socialMedia: { ...content.socialMedia, platforms: newPlatforms }
                                  });
                                }}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                              />
                            </div>
                          </div>
                        )}
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
              : typeof showImageSelector === 'string' && showImageSelector.startsWith('hero-')
              ? content.hero.images[parseInt(showImageSelector.replace('hero-', ''))]
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
            } else if (typeof showImageSelector === 'string' && showImageSelector.startsWith('hero-')) {
              const imageIndex = parseInt(showImageSelector.replace('hero-', ''));
              const newImages = [...content.hero.images];
              newImages[imageIndex] = image;
              setContent({
                ...content,
                hero: { ...content.hero, images: newImages }
              });
            }
            setShowImageSelector(null);
          }}
          onClose={() => setShowImageSelector(null)}
        />
      )}
    </div>
  );
} 