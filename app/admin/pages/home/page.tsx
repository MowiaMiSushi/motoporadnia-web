'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/app/components/ui/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faSave, faImage, faUpload } from '@fortawesome/free-solid-svg-icons';

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

const defaultService = {
  icon: 'faHandshake',
  title: 'Nowa usługa',
  description: 'Opis nowej usługi',
  link: '/',
  linkText: 'Zobacz więcej'
};

interface ImageSelectorProps {
  currentImage: string;
  onImageSelect: (image: string) => void;
  onClose: () => void;
}

const ImageSelector = ({ currentImage, onImageSelect, onClose }: ImageSelectorProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
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

    setUploadStatus('uploading');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImages(prev => [...prev, data.url]);
        onImageSelect(data.url);
        setUploadStatus('success');
      } else {
        setUploadStatus('error');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Wybierz zdjęcie</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadStatus === 'uploading'}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faUpload} />
            {uploadStatus === 'uploading' ? 'Uploadowanie...' : 'Upload nowego zdjęcia'}
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-4">Ładowanie...</div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => onImageSelect(image)}
                className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 hover:border-red-500 transition-colors ${
                  currentImage === image ? 'border-red-500' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function HomePageEditor() {
  const [content, setContent] = useState<HomePageContent>(initialContent);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState<string | null>(null);
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

  const addService = (section: 'services' | 'additional') => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        services: [...prev[section].services, { ...defaultService }]
      }
    }));
  };

  const removeService = (section: 'services' | 'additional', index: number) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        services: prev[section].services.filter((_, i) => i !== index)
      }
    }));
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

  const renderServicesEditor = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Sekcja Usług</h3>
        <button
          onClick={() => addService('services')}
          className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Dodaj usługę
        </button>
      </div>
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
          <div className="flex justify-between items-center">
            <h4 className="font-medium">{service.title || 'Nowa usługa'}</h4>
            <button
              onClick={() => removeService('services', index)}
              className="text-red-600 hover:text-red-700"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ikona FontAwesome</label>
            <input
              type="text"
              value={service.icon}
              onChange={(e) => {
                const newServices = [...content.services.services];
                newServices[index] = { ...service, icon: e.target.value };
                setContent({
                  ...content,
                  services: { ...content.services, services: newServices }
                });
              }}
              placeholder="np. faHandshake, faWrench, faTruck"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
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
            <label className="block text-sm font-medium text-gray-700">URL strony</label>
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
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Sekcja Dodatkowa</h3>
        <button
          onClick={() => addService('additional')}
          className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Dodaj usługę
        </button>
      </div>
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
          <div className="flex justify-between items-center">
            <h4 className="font-medium">{service.title || 'Nowa usługa'}</h4>
            <button
              onClick={() => removeService('additional', index)}
              className="text-red-600 hover:text-red-700"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ikona FontAwesome</label>
            <input
              type="text"
              value={service.icon}
              onChange={(e) => {
                const newServices = [...content.additional.services];
                newServices[index] = { ...service, icon: e.target.value };
                setContent({
                  ...content,
                  additional: { ...content.additional, services: newServices }
                });
              }}
              placeholder="np. faMotorcycle, faGraduationCap"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
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
            <label className="block text-sm font-medium text-gray-700">URL strony</label>
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

      {(showImageSelector !== null && content) && (
        <ImageSelector
          currentImage={
            typeof showImageSelector === 'string' && showImageSelector.startsWith('hero-')
              ? content.hero.images[parseInt(showImageSelector.replace('hero-', ''))]
              : ''
          }
          onImageSelect={(image) => {
            if (typeof showImageSelector === 'string' && showImageSelector.startsWith('hero-')) {
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