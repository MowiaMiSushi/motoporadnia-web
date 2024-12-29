'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

interface SeoEditorProps {
  initialData: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
    ogTitle: string;
    ogDescription: string;
  };
  onSave: (data: any) => void;
  pageName: string;
}

export default function SeoEditor({ initialData, onSave, pageName }: SeoEditorProps) {
  const [data, setData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(data);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Edycja SEO - {pageName}</h2>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Tytuł strony
          </label>
          <input
            type="text"
            id="title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C62400]"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Opis strony
          </label>
          <textarea
            id="description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C62400]"
          />
        </div>

        {/* Keywords */}
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
            Słowa kluczowe
          </label>
          <textarea
            id="keywords"
            value={data.keywords}
            onChange={(e) => setData({ ...data, keywords: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C62400]"
          />
        </div>

        {/* OG Image */}
        <div>
          <label htmlFor="ogImage" className="block text-sm font-medium text-gray-700 mb-1">
            Obraz OG (Open Graph)
          </label>
          <input
            type="text"
            id="ogImage"
            value={data.ogImage}
            onChange={(e) => setData({ ...data, ogImage: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C62400]"
          />
        </div>

        {/* OG Title */}
        <div>
          <label htmlFor="ogTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Tytuł OG
          </label>
          <input
            type="text"
            id="ogTitle"
            value={data.ogTitle}
            onChange={(e) => setData({ ...data, ogTitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C62400]"
          />
        </div>

        {/* OG Description */}
        <div>
          <label htmlFor="ogDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Opis OG
          </label>
          <textarea
            id="ogDescription"
            value={data.ogDescription}
            onChange={(e) => setData({ ...data, ogDescription: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C62400]"
          />
        </div>

        {/* Submit button */}
        <div>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center space-x-2 bg-[#C62400] hover:bg-[#A01D00] text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
            <span>{isSaving ? 'Zapisywanie...' : 'Zapisz zmiany'}</span>
          </button>
        </div>
      </div>
    </form>
  );
} 