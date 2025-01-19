'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/app/components/ui/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faImage, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

interface MainSection {
  title: string;
  description: string;
  image: string;
}

interface Area {
  icon: string;
  text: string;
}

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  mainSections: MainSection[];
  operatingArea: {
    title: string;
    description: string;
    areas: Area[];
    additionalInfo: string;
  };
  cta: {
    title: string;
    description: string;
    phoneNumber: string;
  };
}

const initialContent: PageContent = {
  hero: {
    title: "Transport motocykli Poznań i Europa",
    description: "Profesjonalny transport motocykli na terenie Poznania, całej Polski i Europy. Bezpieczny przewóz jednośladów z pełnym ubezpieczeniem.",
    images: []
  },
  mainSections: [],
  operatingArea: {
    title: "Obszar działania",
    description: "Świadczymy kompleksowe usługi transportowe na trzech poziomach:",
    areas: [],
    additionalInfo: ""
  },
  cta: {
    title: "Potrzebujesz transportu motocykla?",
    description: "Skontaktuj się z nami, aby ustalić szczegóły transportu i otrzymać wycenę.",
    phoneNumber: "789059578"
  }
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
        console.log('ImageSelector: Rozpoczynam pobieranie listy zdjęć');
        const response = await fetch('/api/admin/images');
        if (response.ok) {
          const data = await response.json();
          console.log('ImageSelector: Pobrane dane:', data);
          if (data.success && Array.isArray(data.images)) {
            const processedImages = data.images.map((img: string) => 
              img.startsWith('/') ? img : `/${img}`
            );
            console.log('ImageSelector: Przetworzone zdjęcia:', processedImages);
            setImages(processedImages);
          } else {
            console.error('ImageSelector: Nieprawidłowy format danych:', data);
          }
        } else {
          console.error('ImageSelector: Błąd pobierania zdjęć:', response.status);
        }
      } catch (error) {
        console.error('ImageSelector: Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('ImageSelector: Rozpoczynam upload pliku:', file.name);
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
        console.log('ImageSelector: Upload zakończony sukcesem:', data);
        const imageUrl = data.url.startsWith('/') ? data.url : `/${data.url}`;
        setImages(prev => [...prev, imageUrl]);
        handleImageSelect(imageUrl);
        setUploadStatus('success');
        toast.success('Zdjęcie zostało dodane');
      } else {
        console.error('ImageSelector: Błąd podczas uploadu:', response.status);
        setUploadStatus('error');
        toast.error('Błąd podczas dodawania zdjęcia');
      }
    } catch (error) {
      console.error('ImageSelector: Błąd podczas uploadu:', error);
      setUploadStatus('error');
      toast.error('Błąd podczas dodawania zdjęcia');
    }
  };

  const handleImageSelect = (image: string) => {
    console.log('ImageSelector: Wybrano zdjęcie:', image);
    onImageSelect(image);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Wybierz zdjęcie</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} />
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
                onClick={() => handleImageSelect(image)}
                className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 hover:border-red-500 transition-colors ${
                  currentImage === image ? 'border-red-500' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    console.error('ImageSelector: Błąd ładowania zdjęcia:', image);
                    e.currentTarget.src = '/images/placeholder.webp';
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function TransportEditor() {
  const [content, setContent] = useState<PageContent>(initialContent);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/content/services/transport');
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
      console.log('TransportEditor: Zapisywanie contentu:', JSON.stringify(content, null, 2));

      const response = await fetch('/api/content/services/transport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save content');
      }

      const result = await response.json();
      console.log('TransportEditor: Content zapisany pomyślnie:', result);

      if (result.content) {
        console.log('TransportEditor: Aktualizuję stan komponentu z danymi z serwera');
        setContent(result.content);
      }

      showNotification({
        title: 'Sukces',
        message: 'Zmiany zostały zapisane',
        type: 'success'
      });

    } catch (error) {
      console.error('TransportEditor: Błąd podczas zapisywania:', error);
      showNotification({
        title: 'Błąd',
        message: 'Błąd podczas zapisywania zmian',
        type: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageSelect = (image: string, type: string, index: number) => {
    console.log('TransportEditor: Wybrano zdjęcie:', { type, index, image });
    
    const newContent = { ...content };
    
    if (type === 'hero') {
      if (!newContent.hero.images) {
        newContent.hero.images = [];
      }
      newContent.hero.images[index] = image;
    } else if (type === 'main-section') {
      if (!newContent.mainSections[index]) {
        newContent.mainSections[index] = {
          title: '',
          description: '',
          image: ''
        };
      }
      newContent.mainSections[index].image = image;
    }
    
    console.log('TransportEditor: Aktualizuję content z nowym zdjęciem:', newContent);
    setContent(newContent);
    setShowImageSelector(null);
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
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Sekcje główne</h3>
        <button
          onClick={() => {
            const newContent = { ...content };
            newContent.mainSections = [...newContent.mainSections, { title: '', description: '', image: '' }];
            setContent(newContent);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Dodaj sekcję
        </button>
      </div>
      {content.mainSections.map((section, index) => (
        <div key={index} className="border p-4 rounded-md space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Sekcja {index + 1}</h4>
            <button
              onClick={() => {
                const newContent = { ...content };
                newContent.mainSections = newContent.mainSections.filter((_, i) => i !== index);
                setContent(newContent);
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
              value={section.title}
              onChange={(e) => {
                const newContent = { ...content };
                newContent.mainSections[index] = { ...section, title: e.target.value };
                setContent(newContent);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Opis</label>
            <textarea
              value={section.description}
              onChange={(e) => {
                const newContent = { ...content };
                newContent.mainSections[index] = { ...section, description: e.target.value };
                setContent(newContent);
              }}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Zdjęcie</label>
            <div className="flex items-center gap-4 p-4 border rounded-md">
              <div className="w-24 h-24 relative">
                <img
                  src={section.image || '/images/placeholder.webp'}
                  alt={`Section image ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex-grow">
                <input
                  type="text"
                  value={section.image}
                  onChange={(e) => {
                    const newContent = { ...content };
                    newContent.mainSections[index] = { ...section, image: e.target.value };
                    setContent(newContent);
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowImageSelector(`main-section-${index}`);
                  }}
                  className="bg-gray-100 text-gray-600 p-2 rounded-md hover:bg-gray-200 transition-colors"
                  title="Wybierz z galerii"
                >
                  <FontAwesomeIcon icon={faImage} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderOperatingAreaEditor = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Obszar działania</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tytuł</label>
        <input
          type="text"
          value={content.operatingArea?.title || ''}
          onChange={(e) => setContent({
            ...content,
            operatingArea: {
              ...content.operatingArea,
              title: e.target.value,
              description: content.operatingArea?.description || '',
              areas: content.operatingArea?.areas || [],
              additionalInfo: content.operatingArea?.additionalInfo || ''
            }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Opis</label>
        <textarea
          value={content.operatingArea?.description || ''}
          onChange={(e) => setContent({
            ...content,
            operatingArea: {
              ...content.operatingArea,
              description: e.target.value
            }
          })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">Obszary</label>
          <button
            onClick={() => {
              const newContent = { ...content };
              if (!newContent.operatingArea) {
                newContent.operatingArea = {
                  title: '',
                  description: '',
                  areas: [],
                  additionalInfo: ''
                };
              }
              if (!newContent.operatingArea.areas) {
                newContent.operatingArea.areas = [];
              }
              newContent.operatingArea.areas.push({ icon: '', text: '' });
              setContent(newContent);
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Dodaj obszar
          </button>
        </div>
        {(content.operatingArea?.areas || []).map((area, index) => (
          <div key={index} className="border p-4 rounded-md space-y-4 mb-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Obszar {index + 1}</h4>
              <button
                onClick={() => {
                  const newContent = { ...content };
                  newContent.operatingArea.areas = newContent.operatingArea.areas.filter((_, i) => i !== index);
                  setContent(newContent);
                }}
                className="text-red-600 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ikona</label>
              <input
                type="text"
                value={area.icon}
                onChange={(e) => {
                  const newContent = { ...content };
                  newContent.operatingArea.areas[index] = { ...area, icon: e.target.value };
                  setContent(newContent);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tekst</label>
              <input
                type="text"
                value={area.text}
                onChange={(e) => {
                  const newContent = { ...content };
                  newContent.operatingArea.areas[index] = { ...area, text: e.target.value };
                  setContent(newContent);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Dodatkowe informacje</label>
        <textarea
          value={content.operatingArea?.additionalInfo || ''}
          onChange={(e) => setContent({
            ...content,
            operatingArea: {
              ...content.operatingArea,
              additionalInfo: e.target.value
            }
          })}
          rows={3}
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
        <h2 className="text-2xl font-bold">Edycja strony Transport</h2>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors disabled:bg-gray-400"
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
            onClick={() => setActiveSection('operatingArea')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'operatingArea' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Obszar działania
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
          {activeSection === 'operatingArea' && renderOperatingAreaEditor()}
          {activeSection === 'cta' && renderCTAEditor()}
        </div>
      </div>

      {showImageSelector !== null && (
        <ImageSelector
          currentImage={
            showImageSelector.startsWith('hero-')
              ? content.hero.images[parseInt(showImageSelector.replace('hero-', ''))] || ''
              : showImageSelector.startsWith('main-section-')
              ? content.mainSections[parseInt(showImageSelector.replace('main-section-', ''))].image || ''
              : ''
          }
          onImageSelect={(image) => {
            const type = showImageSelector.startsWith('hero-') ? 'hero' : 'main-section';
            const index = parseInt(showImageSelector.replace(type === 'hero' ? 'hero-' : 'main-section-', ''));
            handleImageSelect(image, type, index);
          }}
          onClose={() => setShowImageSelector(null)}
        />
      )}
    </div>
  );
} 