'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
}

const initialImages: GalleryImage[] = [
  {
    id: '1',
    url: '/images/gallery/example1.jpg',
    title: 'Serwis motocykla',
    description: 'Profesjonalny serwis motocyklowy',
    category: 'serwis',
  },
  {
    id: '2',
    url: '/images/gallery/example2.jpg',
    title: 'Szkolenie',
    description: 'Szkolenie z bezpiecznej jazdy',
    category: 'szkolenia',
  },
];

export default function AdminGallery() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [images, setImages] = useState(initialImages);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    category: '',
  });
  const [isUploading, setIsUploading] = useState(false);

  if (status === 'unauthenticated') {
    router.push('/admin/login');
    return null;
  }

  const handleEdit = (image: GalleryImage) => {
    setSelectedImage(image);
    setEditForm({
      title: image.title,
      description: image.description,
      category: image.category,
    });
  };

  const handleSave = async () => {
    if (!selectedImage) return;

    try {
      // Tutaj dodamy logikę zapisywania do bazy danych
      setImages(
        images.map((img) =>
          img.id === selectedImage.id
            ? { ...img, ...editForm }
            : img
        )
      );
      setSelectedImage(null);
      // Dodaj powiadomienie o sukcesie
    } catch (error) {
      console.error('Błąd podczas zapisywania:', error);
    }
  };

  const handleDelete = async (imageId: string) => {
    try {
      // Tutaj dodamy logikę usuwania z bazy danych
      setImages(images.filter((img) => img.id !== imageId));
      // Dodaj powiadomienie o sukcesie
    } catch (error) {
      console.error('Błąd podczas usuwania:', error);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      // Tutaj dodamy logikę uploadowania do serwera
      // Tymczasowo dodajemy przykładowe zdjęcie
      const newImage: GalleryImage = {
        id: Date.now().toString(),
        url: '/images/gallery/example-new.jpg',
        title: 'Nowe zdjęcie',
        description: 'Opis nowego zdjęcia',
        category: 'inne',
      };
      setImages([...images, newImage]);
    } catch (error) {
      console.error('Błąd podczas uploadowania:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Zarządzanie galerią
            </h1>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="text-[#C62400] hover:text-[#A51D00] transition-colors duration-200"
            >
              ← Powrót do panelu
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <label
              htmlFor="image-upload"
              className="inline-flex items-center px-4 py-2 bg-[#C62400] text-white rounded-md hover:bg-[#A51D00] transition-colors duration-200 cursor-pointer"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {isUploading ? 'Uploadowanie...' : 'Dodaj nowe zdjęcie'}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="relative aspect-w-16 aspect-h-9">
                  <Image
                    src={image.url}
                    alt={image.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                {selectedImage?.id === image.id ? (
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tytuł
                      </label>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Opis
                      </label>
                      <textarea
                        value={editForm.description}
                        onChange={(e) =>
                          setEditForm({ ...editForm, description: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Kategoria
                      </label>
                      <input
                        type="text"
                        value={editForm.category}
                        onChange={(e) =>
                          setEditForm({ ...editForm, category: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                      >
                        Anuluj
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-[#C62400] text-white rounded-md hover:bg-[#A51D00] transition-colors duration-200"
                      >
                        Zapisz
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {image.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {image.description}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {image.category}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(image)}
                          className="text-[#C62400] hover:text-[#A51D00] transition-colors duration-200"
                        >
                          Edytuj
                        </button>
                        <button
                          onClick={() => handleDelete(image.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          Usuń
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 