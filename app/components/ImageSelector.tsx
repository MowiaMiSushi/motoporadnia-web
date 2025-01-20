import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

interface ImageSelectorProps {
  onSelect: (imageUrl: string) => void;
  onClose: () => void;
}

export default function ImageSelector({ onSelect, onClose }: ImageSelectorProps) {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/images');
      if (!response.ok) {
        throw new Error('Błąd podczas pobierania zdjęć');
      }
      const data = await response.json();
      if (data.success && Array.isArray(data.images)) {
        setImages(data.images);
      } else {
        throw new Error('Nieprawidłowy format danych');
      }
    } catch (error) {
      console.error('Błąd podczas pobierania zdjęć:', error);
      toast.error('Nie udało się załadować zdjęć');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Sprawdź rozmiar pliku (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Plik jest zbyt duży. Maksymalny rozmiar to 5MB');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Błąd podczas uploadowania pliku');
      }

      const data = await response.json();
      if (data.url) {
        await fetchImages(); // Odśwież listę zdjęć
        toast.success('Zdjęcie zostało dodane');
      } else {
        throw new Error('Brak URL-a w odpowiedzi');
      }
    } catch (error) {
      console.error('Błąd podczas uploadowania:', error);
      toast.error('Nie udało się dodać zdjęcia');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Wybierz zdjęcie</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="mb-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors flex items-center gap-2 disabled:bg-red-300"
          >
            <FontAwesomeIcon icon={faUpload} />
            {isUploading ? 'Uploadowanie...' : 'Upload nowego zdjęcia'}
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Ładowanie zdjęć...</div>
        ) : images.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Brak zdjęć w galerii</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => onSelect(image)}
                className="aspect-square relative group cursor-pointer hover:opacity-90 transition-opacity bg-gray-100 rounded-lg overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`Zdjęcie ${index + 1}`}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    Wybierz
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 