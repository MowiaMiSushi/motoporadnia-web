'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export default function GalleryManager() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/admin/gallery');
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/admin/gallery/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImages([...images, data.url]);
        setSelectedFile(null);
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imagePath: string) => {
    try {
      const response = await fetch('/api/admin/gallery/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: imagePath }),
      });

      if (response.ok) {
        setImages(images.filter(img => img !== imagePath));
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Zarządzanie galerią</h1>

      {/* Upload section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Dodaj nowe zdjęcie</h2>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faUpload} />
            Wybierz plik
          </label>
          {selectedFile && (
            <span className="text-gray-600">{selectedFile.name}</span>
          )}
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="bg-[#C62400] hover:bg-[#A01D00] text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {isUploading ? 'Przesyłanie...' : 'Prześlij'}
          </button>
        </div>
      </div>

      {/* Gallery grid */}
      {isLoading ? (
        <div className="text-center py-8">Ładowanie galerii...</div>
      ) : images.length === 0 ? (
        <div className="text-center py-8 text-gray-500">Brak zdjęć w galerii</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`Zdjęcie ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <button
                onClick={() => handleDelete(image)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 