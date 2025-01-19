'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faSave, faGripVertical, faChevronDown, faChevronUp, faImage, faUpload } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface Brand {
  name: string;
  image: string;
  hoverImages: string[];
}

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  services: Service[];
  brands: Brand[];
  cta: {
    title: string;
    description: string;
    phoneNumber: string;
  };
}

const defaultContent: PageContent = {
  hero: {
    title: "Profesjonalny serwis motocyklowy",
    description: "Oferujemy kompleksową obsługę serwisową motocykli wszystkich marek. Nasz zespół doświadczonych mechaników zadba o Twój jednoślad.",
    images: ['/images/serwis_1.webp', '/images/serwis_2.webp']
  },
  services: [
    {
      icon: "faWrench",
      title: "Przeglądy okresowe",
      description: "Regularne przeglądy zgodne z książką serwisową"
    },
    {
      icon: "faLaptop",
      title: "Diagnostyka komputerowa",
      description: "Profesjonalny sprzęt diagnostyczny"
    }
  ],
  brands: [
    {
      name: "Honda",
      image: "/images/brands/honda.webp",
      hoverImages: []
    },
    {
      name: "Yamaha",
      image: "/images/brands/yamaha.webp",
      hoverImages: []
    }
  ],
  cta: {
    title: "Potrzebujesz serwisu?",
    description: "Skontaktuj się z nami i umów wizytę w dogodnym terminie.",
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
          console.log('ImageSelector: Pobrane zdjęcia:', data);
          const processedImages = data.images.map((img: string) => 
            img.startsWith('/') ? img : `/${img}`
          );
          console.log('ImageSelector: Przetworzone ścieżki zdjęć:', processedImages);
          setImages(processedImages);
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
        console.log('Uploaded image URL:', data.url);
        // Upewnij się, że ścieżka zaczyna się od /
        const imageUrl = data.url.startsWith('/') ? data.url : `/${data.url}`;
        setImages(prev => [...prev, imageUrl]);
        onImageSelect(imageUrl);
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
                onClick={() => {
                  console.log('ImageSelector: Kliknięto zdjęcie:', image);
                  onImageSelect(image);
                }}
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

export default function ServiceAdmin() {
  const { data: session } = useSession();
  const router = useRouter();
  const [content, setContent] = useState<PageContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [expandedServices, setExpandedServices] = useState<{ [key: number]: boolean }>({});
  const [expandedBrands, setExpandedBrands] = useState<{ [key: number]: boolean }>({});
  const [showImageSelector, setShowImageSelector] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log('Admin: Rozpoczynam pobieranie danych');
        const response = await fetch('/api/content/services/serwis', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });

        const responseText = await response.text();
        console.log('Admin: Surowa odpowiedź z API:', responseText);

        if (response.ok) {
          try {
            const data = JSON.parse(responseText);
            console.log('Admin: Sparsowane dane:', JSON.stringify(data, null, 2));
            if (data && data.hero && data.services) {
              // Inicjalizacja hoverImages dla każdej marki, jeśli nie istnieje
              if (data.brands) {
                data.brands = data.brands.map((brand: Brand) => ({
                  ...brand,
                  hoverImages: brand.hoverImages || []
                }));
              }
              console.log('Admin: Ustawiam otrzymane dane');
              setContent(data);
            } else {
              console.log('Admin: Brak wymaganych pól w danych z API, używam domyślnej zawartości');
              setContent(defaultContent);
            }
          } catch (e) {
            console.error('Admin: Błąd parsowania JSON:', e);
            setContent(defaultContent);
          }
        } else {
          console.error('Admin: Failed to fetch content. Status:', response.status);
          console.error('Admin: Error text:', responseText);
          setContent(defaultContent);
        }
      } catch (error) {
        console.error('Admin: Error fetching content:', error);
        setContent(defaultContent);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchContent();
    }
  }, [session]);

  const handleSave = async () => {
    try {
      console.log('Admin: Rozpoczynam zapisywanie danych');
      console.log('Admin: Dane do wysłania:', JSON.stringify(content, null, 2));

      const response = await fetch('/api/content/services/serwis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(content)
      });

      const responseText = await response.text();
      console.log('Admin: Surowa odpowiedź z API:', responseText);

      if (response.ok) {
        try {
          const data = JSON.parse(responseText);
          console.log('Admin: Sparsowane dane z odpowiedzi:', JSON.stringify(data, null, 2));
          toast.success('Zmiany zostały zapisane');
          router.refresh();
        } catch (e) {
          console.error('Admin: Błąd parsowania odpowiedzi JSON:', e);
          toast.error('Błąd podczas zapisywania zmian');
        }
      } else {
        console.error('Admin: Błąd podczas zapisywania. Status:', response.status);
        console.error('Admin: Treść błędu:', responseText);
        toast.error('Błąd podczas zapisywania zmian');
      }
    } catch (error) {
      console.error('Admin: Error saving content:', error);
      toast.error('Błąd podczas zapisywania zmian');
    }
  };

  const addService = () => {
    setContent(prev => ({
      ...prev,
      services: [
        ...prev.services,
        {
          icon: "faTools",
          title: "Nowa usługa",
          description: "Opis nowej usługi"
        }
      ]
    }));
  };

  const removeService = (index: number) => {
    setContent(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const updateService = (index: number, field: keyof Service, value: string) => {
    setContent(prev => ({
      ...prev,
      services: prev.services.map((service, i) =>
        i === index ? { ...service, [field]: value } : service
      )
    }));
  };

  const addBrand = () => {
    setContent(prev => ({
      ...prev,
      brands: [
        ...prev.brands,
        {
          name: "Nowa marka",
          image: "/images/brands/default.webp",
          hoverImages: []
        }
      ]
    }));
  };

  const removeBrand = (index: number) => {
    setContent(prev => ({
      ...prev,
      brands: prev.brands.filter((_, i) => i !== index)
    }));
  };

  const updateBrand = (index: number, field: keyof Brand, value: string) => {
    setContent(prev => ({
      ...prev,
      brands: prev.brands.map((brand, i) =>
        i === index ? { ...brand, [field]: value } : brand
      )
    }));
  };

  const handleDragEndServices = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(content.services);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setContent({ ...content, services: items });
  };

  const handleDragEndBrands = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(content.brands);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setContent({ ...content, brands: items });
  };

  const toggleService = (index: number) => {
    setExpandedServices(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleBrand = (index: number) => {
    setExpandedBrands(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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

  const renderServicesEditor = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Usługi</h3>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const allExpanded = content.services.every((_, index) => expandedServices[index]);
              setExpandedServices(
                content.services.reduce((acc, _, index) => ({
                  ...acc,
                  [index]: !allExpanded
                }), {})
              );
            }}
            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors"
          >
            {content.services.every((_, index) => expandedServices[index]) 
              ? 'Zwiń wszystkie' 
              : 'Rozwiń wszystkie'
            }
          </button>
          <button
            onClick={addService}
            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Dodaj usługę
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEndServices}>
        <Droppable droppableId="services">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {content.services.map((service, index) => (
                <Draggable key={index} draggableId={`service-${index}`} index={index}>
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
                          <h4 className="font-medium">{service.title || 'Nowa usługa'}</h4>
                          <button
                            onClick={() => toggleService(index)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <FontAwesomeIcon 
                              icon={expandedServices[index] ? faChevronUp : faChevronDown}
                              className="w-4 h-4"
                            />
                          </button>
                        </div>
                        <button
                          onClick={() => removeService(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>

                      {expandedServices[index] && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Ikona</label>
                            <input
                              type="text"
                              value={service.icon}
                              onChange={(e) => updateService(index, 'icon', e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Tytuł</label>
                            <input
                              type="text"
                              value={service.title}
                              onChange={(e) => updateService(index, 'title', e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Opis</label>
                            <textarea
                              value={service.description}
                              onChange={(e) => updateService(index, 'description', e.target.value)}
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

  const renderBrandsEditor = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Marki</h3>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const allExpanded = content.brands.every((_, index) => expandedBrands[index]);
              setExpandedBrands(
                content.brands.reduce((acc, _, index) => ({
                  ...acc,
                  [index]: !allExpanded
                }), {})
              );
            }}
            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors"
          >
            {content.brands.every((_, index) => expandedBrands[index]) 
              ? 'Zwiń wszystkie' 
              : 'Rozwiń wszystkie'
            }
          </button>
          <button
            onClick={addBrand}
            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Dodaj markę
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEndBrands}>
        <Droppable droppableId="brands">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {content.brands.map((brand, index) => (
                <Draggable key={index} draggableId={`brand-${index}`} index={index}>
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
                          <h4 className="font-medium">{brand.name || 'Nowa marka'}</h4>
                          <button
                            onClick={() => toggleBrand(index)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <FontAwesomeIcon 
                              icon={expandedBrands[index] ? faChevronUp : faChevronDown}
                              className="w-4 h-4"
                            />
                          </button>
                        </div>
                        <button
                          onClick={() => removeBrand(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>

                      {expandedBrands[index] && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Nazwa</label>
                            <input
                              type="text"
                              value={brand.name}
                              onChange={(e) => updateBrand(index, 'name', e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                            <div className="flex items-center gap-4 p-4 border rounded-md">
                              <div className="w-24 h-24 relative">
                                <img
                                  src={brand.image}
                                  alt={`Brand logo ${index + 1}`}
                                  className="w-full h-full object-contain rounded-md"
                                />
                              </div>
                              <div className="flex-grow">
                                <input
                                  type="text"
                                  value={brand.image}
                                  onChange={(e) => updateBrand(index, 'image', e.target.value)}
                                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                />
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setShowImageSelector(`brand-logo-${index}`)}
                                  className="bg-gray-100 text-gray-600 p-2 rounded-md hover:bg-gray-200 transition-colors"
                                  title="Wybierz z galerii"
                                >
                                  <FontAwesomeIcon icon={faImage} />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Zdjęcia po najechaniu</label>
                            <div className="space-y-4">
                              {brand.hoverImages.map((image, imageIndex) => (
                                <div key={imageIndex} className="flex items-center gap-4 p-4 border rounded-md">
                                  <div className="w-24 h-24 relative">
                                    <img
                                      src={image}
                                      alt={`Hover image ${imageIndex + 1}`}
                                      className="w-full h-full object-cover rounded-md"
                                    />
                                  </div>
                                  <div className="flex-grow">
                                    <input
                                      type="text"
                                      value={image}
                                      onChange={(e) => {
                                        const newBrands = [...content.brands];
                                        newBrands[index].hoverImages[imageIndex] = e.target.value;
                                        setContent({
                                          ...content,
                                          brands: newBrands
                                        });
                                      }}
                                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => setShowImageSelector(`brand-hover-${index}-${imageIndex}`)}
                                      className="bg-gray-100 text-gray-600 p-2 rounded-md hover:bg-gray-200 transition-colors"
                                      title="Wybierz z galerii"
                                    >
                                      <FontAwesomeIcon icon={faImage} />
                                    </button>
                                    <button
                                      onClick={() => {
                                        const newBrands = [...content.brands];
                                        newBrands[index].hoverImages = newBrands[index].hoverImages.filter((_, i) => i !== imageIndex);
                                        setContent({
                                          ...content,
                                          brands: newBrands
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
                                  const newBrands = [...content.brands];
                                  newBrands[index].hoverImages = [...(newBrands[index].hoverImages || []), ''];
                                  setContent({
                                    ...content,
                                    brands: newBrands
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
        <h2 className="text-2xl font-bold">Edycja strony serwisu</h2>
        <button
          onClick={handleSave}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors flex items-center"
        >
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          Zapisz zmiany
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
            Usługi
          </button>
          <button
            onClick={() => setActiveSection('brands')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeSection === 'brands' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
            }`}
          >
            Marki
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
          {activeSection === 'brands' && renderBrandsEditor()}
          {activeSection === 'cta' && renderCTAEditor()}
          </div>
      </div>

      {(showImageSelector !== null && content) && (
        <ImageSelector
          currentImage={
            typeof showImageSelector === 'string' && showImageSelector.startsWith('hero-')
              ? content.hero.images[parseInt(showImageSelector.replace('hero-', ''))]
              : typeof showImageSelector === 'string' && showImageSelector.startsWith('brand-logo-')
              ? content.brands[parseInt(showImageSelector.replace('brand-logo-', ''))].image
              : typeof showImageSelector === 'string' && showImageSelector.startsWith('brand-hover-')
              ? (() => {
                  const [_, brandIndex, imageIndex] = showImageSelector.match(/brand-hover-(\d+)-(\d+)/)!.slice(1);
                  return content.brands[parseInt(brandIndex)].hoverImages[parseInt(imageIndex)] || '';
                })()
              : ''
          }
          onImageSelect={(image) => {
            console.log('ServiceAdmin: Wybrano zdjęcie:', {
              showImageSelector,
              image,
              content: JSON.stringify(content, null, 2)
            });
            
            if (typeof showImageSelector === 'string' && showImageSelector.startsWith('hero-')) {
              const imageIndex = parseInt(showImageSelector.replace('hero-', ''));
              const newImages = [...content.hero.images];
              newImages[imageIndex] = image;
              setContent({
                ...content,
                hero: { ...content.hero, images: newImages }
              });
            } else if (typeof showImageSelector === 'string' && showImageSelector.startsWith('brand-logo-')) {
              const brandIndex = parseInt(showImageSelector.replace('brand-logo-', ''));
              const newBrands = [...content.brands];
              newBrands[brandIndex].image = image;
              setContent({
                ...content,
                brands: newBrands
              });
            } else if (typeof showImageSelector === 'string' && showImageSelector.startsWith('brand-hover-')) {
              const [_, brandIndex, imageIndex] = showImageSelector.match(/brand-hover-(\d+)-(\d+)/)!.slice(1);
              const brandIdx = parseInt(brandIndex);
              const imgIdx = parseInt(imageIndex);
              
              console.log('ServiceAdmin: Aktualizacja hover image przed:', {
                brandIndex: brandIdx,
                imageIndex: imgIdx,
                image,
                currentBrand: content.brands[brandIdx]
              });

              const newBrands = [...content.brands];
              
              // Upewnij się, że tablica hoverImages istnieje
              if (!newBrands[brandIdx].hoverImages) {
                newBrands[brandIdx].hoverImages = [];
              }

              // Upewnij się, że indeks istnieje w tablicy
              while (newBrands[brandIdx].hoverImages.length <= imgIdx) {
                newBrands[brandIdx].hoverImages.push('');
              }

              newBrands[brandIdx].hoverImages[imgIdx] = image;

              console.log('ServiceAdmin: Aktualizacja hover image po:', {
                brandIndex: brandIdx,
                imageIndex: imgIdx,
                image,
                updatedBrand: newBrands[brandIdx]
              });

              const updatedContent = {
                ...content,
                brands: newBrands
              };

              console.log('ServiceAdmin: Nowy stan:', updatedContent);
              setContent(updatedContent);
            }
            setShowImageSelector(null);
          }}
          onClose={() => setShowImageSelector(null)}
        />
      )}
    </div>
  );
} 