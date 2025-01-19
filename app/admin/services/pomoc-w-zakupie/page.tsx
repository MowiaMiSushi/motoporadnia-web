'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/app/components/ui/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faImage, faUpload } from '@fortawesome/free-solid-svg-icons';

interface HeroSection {
  title: string;
  description: string;
  images: string[];
}

interface MainSection {
  title: string;
  content: string[];
  image: string;
}

interface ServiceFeature {
  icon: string;
  text: string;
}

interface ServiceFeatures {
  title: string;
  features: ServiceFeature[];
}

interface InfoSection {
  title: string;
  introduction: string;
  items: string[];
  conclusion?: string;
}

interface RemoteSection {
  title: string;
  content: string[];
}

interface CTASection {
  title: string;
  description: string;
  phoneNumber: string;
}

interface PageContent {
  hero: HeroSection;
  mainSections: MainSection[];
  serviceFeatures: ServiceFeatures;
  infoSections: InfoSection[];
  remoteSection: RemoteSection;
  cta: CTASection;
}

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

const initialContent: PageContent = {
  hero: {
    title: 'Pomoc w zakupie motocykla.',
    description: 'Profesjonalne wsparcie i doradztwo przy zakupie motocykla. Sprawdzimy stan techniczny i historię pojazdu.',
    images: [
      '/images/usluga_sprawdzanie_1.jpg',
      '/images/usluga_sprawdzanie_2.jpg',
      '/images/serwis_2.jpg'
    ]
  },
  mainSections: [
    {
      title: 'Profesjonalne doradztwo przy zakupie',
      content: [
        'Główną dziedziną naszej działalności jest doradztwo i pomoc w zakupie motocykla. Wykorzystując nasze wieloletnie doświadczenie w mechanice motocyklowej oraz korzystając z wielu profesjonalnych narzędzi, staramy się w jak najbardziej rzetelny sposób ocenić rzeczywisty stan techniczny oglądanego motocykla.',
        'Oglądając motocykl bazujemy na stworzonym przez nas raporcie weryfikacyjnym, aby nie pominąć istotnych i newralgicznych punktów w motocyklu.'
      ],
      image: '/images/usluga_sprawdzanie_1.jpg'
    },
    {
      title: 'Profesjonalne narzędzia diagnostyczne',
      content: [
        'Podczas oględzin, wykorzystujemy takie narzędzia jak wskaźnik osiowości tylnego koła, profesjonalny miernik lakieru, tester akumulatorów czy tester jakości płynu hamulcowego i chłodniczego.',
        'Pomoc w zakupie motocykla jako usługa jest dostępna także w formie zdalnej, klient otrzymuje od nas raport z dokonanych oględzin wraz z pakietem zdjęć i filmików ukazujących stan faktyczny oglądanego motocykla poprzez aplikacje WhatsApp niezwłocznie po dokonanych oględzinach.'
      ],
      image: '/images/usluga_sprawdzanie_2.jpg'
    }
  ],
  serviceFeatures: {
    title: 'Co zawiera usługa pomocy w zakupie motocykla?',
    features: [
      {
        icon: 'faClipboardCheck',
        text: 'Ocena stanu technicznego motocykla'
      },
      {
        icon: 'faSearch',
        text: 'Weryfikacja historii pojazdu'
      },
      {
        icon: 'faMotorcycle',
        text: 'Jazda próbna'
      },
      {
        icon: 'faMoneyBill',
        text: 'Wstępny kosztorys ewentualnych napraw'
      },
      {
        icon: 'faHandshake',
        text: 'Negocjacja ceny zakupu w oparciu o konkretne argumenty'
      },
      {
        icon: 'faTruckArrowRight',
        text: 'Możliwość przetransportowania motocykla'
      },
      {
        icon: 'faTag',
        text: 'Zniżkę na dokonanie podstawowych czynności serwisowych w naszym warsztacie'
      }
    ]
  },
  infoSections: [
    {
      title: 'Pierwszy motocykl - co przygotować?',
      introduction: 'Jeśli zgłaszasz się do nas w celu poszukiwania swojego pierwszego motocykla, przygotuj dla nas takie informacje jak:',
      items: [
        'Jaki planujesz przeznaczyć budżet na zakup motocykla?',
        'Czy masz zakupioną kompletną odzież motocyklową?',
        'Jakie są Twoje preferencje dotyczące motocykla? Sport, Naked a może coś z klasy Adventure?',
        'Czy masz jakieś doświadczenie motocyklowe poza kursem prawa jazdy?',
        'Jakie są Twoje predyspozycje, to znaczy waga i wzrost 😉'
      ]
    },
    {
      title: 'Masz wybrany motocykl?',
      introduction: 'Natomiast jeśli przychodzisz z konkretnym egzemplarzem, prosimy o uzyskanie takich informacji jak:',
      items: [
        'numer VIN',
        'data pierwszej rejestracji (za granicą)',
        'numer rejestracyjny'
      ],
      conclusion: 'Wszystkie wyżej wymienione informacje znajdują się na pierwszej stronie dowodu rejestracyjnego, te dane pozwolą nam na sprawdzenie historii pojazdu i weryfikacje historii kolizyjnej.'
    }
  ],
  remoteSection: {
    title: 'Zakup w pełni zdalny!',
    content: [
      'Świadczymy również usługę zakupu w pełni zdalnego!',
      'Jeśli nie masz czasu aby wybrać się wspólnie z nami na miejsce oględzin i chcesz zaufać naszemu profesjonalizmowi oferujemy zakup zdalny motocykla! Jedziemy, weryfikujemy, kupujemy i dostarczamy Twój motocykl pod dom bez Twojej obecności!'
    ]
  },
  cta: {
    title: 'Potrzebujesz pomocy w zakupie?',
    description: 'Skontaktuj się z nami, aby omówić szczegóły i umówić oględziny motocykla.',
    phoneNumber: '789059578'
  }
};

export default function PurchaseAssistanceEditor() {
  const [content, setContent] = useState<PageContent | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const [showImageSelector, setShowImageSelector] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/services/pomoc-w-zakupie');
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
      const response = await fetch('/api/content/services/pomoc-w-zakupie', {
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowImageSelector(`hero-${index}`);
                  }}
                  className="bg-gray-100 text-gray-600 p-2 rounded-md hover:bg-gray-200 transition-colors"
                  title="Wybierz z galerii"
                >
                  <FontAwesomeIcon icon={faImage} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
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
            onClick={(e) => {
              e.stopPropagation();
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

  const renderMainSectionsEditor = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sekcje główne</h3>
      {content.mainSections.map((section, index) => (
        <div key={index} className="border p-4 rounded-md space-y-4">
          <h4 className="font-medium">Sekcja {index + 1}</h4>
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
            <label className="block text-sm font-medium text-gray-700">Treść (akapity oddzielone pustą linią)</label>
            <textarea
              value={section.content.join('\n\n')}
              onChange={(e) => {
                const newSections = [...content.mainSections];
                newSections[index] = {
                  ...section,
                  content: e.target.value.split('\n\n').filter(p => p.trim())
                };
                setContent({ ...content, mainSections: newSections });
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

  const renderServiceFeaturesEditor = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Zawartość usługi</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tytuł sekcji</label>
        <input
          type="text"
          value={content.serviceFeatures.title}
          onChange={(e) => setContent({
            ...content,
            serviceFeatures: { ...content.serviceFeatures, title: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>
      {content.serviceFeatures.features.map((feature, index) => (
        <div key={index} className="border p-4 rounded-md space-y-4">
          <h4 className="font-medium">Element {index + 1}</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ikona</label>
            <input
              type="text"
              value={feature.icon}
              onChange={(e) => {
                const newFeatures = [...content.serviceFeatures.features];
                newFeatures[index] = { ...feature, icon: e.target.value };
                setContent({
                  ...content,
                  serviceFeatures: { ...content.serviceFeatures, features: newFeatures }
                });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tekst</label>
            <input
              type="text"
              value={feature.text}
              onChange={(e) => {
                const newFeatures = [...content.serviceFeatures.features];
                newFeatures[index] = { ...feature, text: e.target.value };
                setContent({
                  ...content,
                  serviceFeatures: { ...content.serviceFeatures, features: newFeatures }
                });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderInfoSectionsEditor = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sekcje informacyjne</h3>
      {content.infoSections.map((section, index) => (
        <div key={index} className="border p-4 rounded-md space-y-4">
          <h4 className="font-medium">Sekcja {index + 1}</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tytuł</label>
            <input
              type="text"
              value={section.title}
              onChange={(e) => {
                const newSections = [...content.infoSections];
                newSections[index] = { ...section, title: e.target.value };
                setContent({ ...content, infoSections: newSections });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Wprowadzenie</label>
            <input
              type="text"
              value={section.introduction}
              onChange={(e) => {
                const newSections = [...content.infoSections];
                newSections[index] = { ...section, introduction: e.target.value };
                setContent({ ...content, infoSections: newSections });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lista elementów (po jednym w linii)</label>
            <textarea
              value={section.items.join('\n')}
              onChange={(e) => {
                const newSections = [...content.infoSections];
                newSections[index] = {
                  ...section,
                  items: e.target.value.split('\n').filter(item => item.trim())
                };
                setContent({ ...content, infoSections: newSections });
              }}
              rows={5}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          {section.conclusion && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Podsumowanie</label>
              <input
                type="text"
                value={section.conclusion}
                onChange={(e) => {
                  const newSections = [...content.infoSections];
                  newSections[index] = { ...section, conclusion: e.target.value };
                  setContent({ ...content, infoSections: newSections });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderRemoteSectionEditor = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sekcja zakupu zdalnego</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tytuł</label>
        <input
          type="text"
          value={content.remoteSection.title}
          onChange={(e) => setContent({
            ...content,
            remoteSection: { ...content.remoteSection, title: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Treść (akapity oddzielone pustą linią)</label>
        <textarea
          value={content.remoteSection.content.join('\n\n')}
          onChange={(e) => setContent({
            ...content,
            remoteSection: {
              ...content.remoteSection,
              content: e.target.value.split('\n\n').filter(p => p.trim())
            }
          })}
          rows={4}
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
        <input
          type="text"
          value={content.cta.description}
          onChange={(e) => setContent({
            ...content,
            cta: { ...content.cta, description: e.target.value }
          })}
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
        <h2 className="text-2xl font-bold">Edycja strony Pomoc w zakupie</h2>
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
            onClick={() => setActiveSection('serviceFeatures')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'serviceFeatures' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Zawartość usługi
          </button>
          <button
            onClick={() => setActiveSection('infoSections')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'infoSections' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Sekcje informacyjne
          </button>
          <button
            onClick={() => setActiveSection('remoteSection')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'remoteSection' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Zakup zdalny
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
          {activeSection === 'serviceFeatures' && renderServiceFeaturesEditor()}
          {activeSection === 'infoSections' && renderInfoSectionsEditor()}
          {activeSection === 'remoteSection' && renderRemoteSectionEditor()}
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