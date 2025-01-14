'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/app/components/ui/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Address {
  street: string;
  city: string;
  postalCode: string;
  additionalInfo: string;
  mapsUrl: string;
  coordinates: Coordinates;
}

interface Hours {
  weekdays: string;
  weekend: string;
}

interface SocialPlatform {
  name: string;
  url: string;
  icon: string;
}

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  contactInfo: {
    address: Address;
    phone: string;
    email: string;
    hours: Hours;
  };
  social: {
    platforms: SocialPlatform[];
  };
  seo: {
    type: string;
    name: string;
    priceRange: string;
  };
}

export default function ContactEditor() {
  const [content, setContent] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log('Fetching contact content for admin...');
        const response = await fetch('/api/content/pages/contact');
        console.log('Admin response status:', response.status);
        if (response.ok) {
          const data = await response.json();
          console.log('Admin received data:', data);
          setContent(data);
        } else {
          console.error('Failed to fetch content:', await response.text());
          showNotification({
            title: 'Błąd',
            message: 'Błąd podczas wczytywania treści',
            type: 'error'
          });
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
    if (!content) return;

    try {
      setIsSaving(true);
      console.log('Saving contact content...');
      const response = await fetch('/api/content/pages/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });
      console.log('Save response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('Save result:', result);
        showNotification({
          title: 'Sukces',
          message: 'Zmiany zostały zapisane',
          type: 'success'
        });
        router.refresh();
      } else {
        const errorText = await response.text();
        console.error('Failed to save:', errorText);
        throw new Error(errorText || 'Failed to save');
      }
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

  const renderHeroEditor = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Sekcja Hero</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tytuł</label>
        <input
          type="text"
          value={content?.hero.title}
          onChange={(e) => setContent(content ? {
            ...content,
            hero: { ...content.hero, title: e.target.value }
          } : null)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Opis</label>
        <textarea
          value={content?.hero.description}
          onChange={(e) => setContent(content ? {
            ...content,
            hero: { ...content.hero, description: e.target.value }
          } : null)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Zdjęcia (po jednym URL w linii)</label>
        <textarea
          value={content?.hero.images.join('\n')}
          onChange={(e) => setContent(content ? {
            ...content,
            hero: { ...content.hero, images: e.target.value.split('\n').filter(url => url.trim()) }
          } : null)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
      </div>
    </div>
  );

  const renderContactInfoEditor = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Informacje kontaktowe</h3>
      
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h4 className="font-medium text-gray-900">Adres</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ulica</label>
            <input
              type="text"
              value={content?.contactInfo.address.street}
              onChange={(e) => setContent(content ? {
                ...content,
                contactInfo: {
                  ...content.contactInfo,
                  address: { ...content.contactInfo.address, street: e.target.value }
                }
              } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Miasto</label>
            <input
              type="text"
              value={content?.contactInfo.address.city}
              onChange={(e) => setContent(content ? {
                ...content,
                contactInfo: {
                  ...content.contactInfo,
                  address: { ...content.contactInfo.address, city: e.target.value }
                }
              } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kod pocztowy</label>
            <input
              type="text"
              value={content?.contactInfo.address.postalCode}
              onChange={(e) => setContent(content ? {
                ...content,
                contactInfo: {
                  ...content.contactInfo,
                  address: { ...content.contactInfo.address, postalCode: e.target.value }
                }
              } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dodatkowe informacje</label>
            <input
              type="text"
              value={content?.contactInfo.address.additionalInfo}
              onChange={(e) => setContent(content ? {
                ...content,
                contactInfo: {
                  ...content.contactInfo,
                  address: { ...content.contactInfo.address, additionalInfo: e.target.value }
                }
              } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h4 className="font-medium text-gray-900">Kontakt</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
            <input
              type="text"
              value={content?.contactInfo.phone}
              onChange={(e) => setContent(content ? {
                ...content,
                contactInfo: { ...content.contactInfo, phone: e.target.value }
              } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={content?.contactInfo.email}
              onChange={(e) => setContent(content ? {
                ...content,
                contactInfo: { ...content.contactInfo, email: e.target.value }
              } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h4 className="font-medium text-gray-900">Godziny otwarcia</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dni robocze</label>
            <input
              type="text"
              value={content?.contactInfo.hours.weekdays}
              onChange={(e) => setContent(content ? {
                ...content,
                contactInfo: {
                  ...content.contactInfo,
                  hours: { ...content.contactInfo.hours, weekdays: e.target.value }
                }
              } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weekendy</label>
            <input
              type="text"
              value={content?.contactInfo.hours.weekend}
              onChange={(e) => setContent(content ? {
                ...content,
                contactInfo: {
                  ...content.contactInfo,
                  hours: { ...content.contactInfo.hours, weekend: e.target.value }
                }
              } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSocialEditor = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Media społecznościowe</h3>
      
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h4 className="font-medium text-gray-900">Platformy</h4>
        {content?.social.platforms.map((platform, index) => (
          <div key={index} className="space-y-4 p-4 bg-white rounded-md shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa platformy</label>
                <input
                  type="text"
                  value={platform.name}
                  onChange={(e) => {
                    if (!content) return;
                    const newPlatforms = [...content.social.platforms];
                    newPlatforms[index] = { ...platform, name: e.target.value };
                    setContent({
                      ...content,
                      social: { ...content.social, platforms: newPlatforms }
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                <input
                  type="text"
                  value={platform.url}
                  onChange={(e) => {
                    if (!content) return;
                    const newPlatforms = [...content.social.platforms];
                    newPlatforms[index] = { ...platform, url: e.target.value };
                    setContent({
                      ...content,
                      social: { ...content.social, platforms: newPlatforms }
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ikona</label>
                <input
                  type="text"
                  value={platform.icon}
                  onChange={(e) => {
                    if (!content) return;
                    const newPlatforms = [...content.social.platforms];
                    newPlatforms[index] = { ...platform, icon: e.target.value };
                    setContent({
                      ...content,
                      social: { ...content.social, platforms: newPlatforms }
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    if (!content) return;
                    const newPlatforms = content.social.platforms.filter((_, i) => i !== index);
                    setContent({
                      ...content,
                      social: { ...content.social, platforms: newPlatforms }
                    });
                  }}
                  className="bg-red-100 text-red-600 px-4 py-2 rounded-md hover:bg-red-200 transition-colors"
                >
                  Usuń platformę
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            if (!content) return;
            const newPlatform = { name: '', url: '', icon: '' };
            setContent({
              ...content,
              social: {
                ...content.social,
                platforms: [...content.social.platforms, newPlatform]
              }
            });
          }}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Dodaj platformę
        </button>
      </div>
    </div>
  );

  const renderSEOEditor = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">SEO</h3>
      
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h4 className="font-medium text-gray-900">Metadane</h4>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Typ</label>
            <input
              type="text"
              value={content?.seo.type}
              onChange={(e) => setContent(content ? {
                ...content,
                seo: { ...content.seo, type: e.target.value }
              } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa</label>
            <input
              type="text"
              value={content?.seo.name}
              onChange={(e) => setContent(content ? {
                ...content,
                seo: { ...content.seo, name: e.target.value }
              } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zakres cenowy</label>
            <input
              type="text"
              value={content?.seo.priceRange}
              onChange={(e) => setContent(content ? {
                ...content,
                seo: { ...content.seo, priceRange: e.target.value }
              } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
        </div>
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
        <h2 className="text-2xl font-bold">Edycja strony kontaktowej</h2>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faSave} />
          {isSaving ? 'Zapisywanie...' : 'Zapisz zmiany'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow p-4 sticky top-4">
            <h3 className="text-lg font-semibold mb-4">Sekcje</h3>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveSection('hero')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeSection === 'hero' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
                }`}
              >
                Sekcja Hero
              </button>
              <button
                onClick={() => setActiveSection('contact')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeSection === 'contact' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
                }`}
              >
                Informacje kontaktowe
              </button>
              <button
                onClick={() => setActiveSection('social')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeSection === 'social' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
                }`}
              >
                Media społecznościowe
              </button>
              <button
                onClick={() => setActiveSection('seo')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeSection === 'seo' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
                }`}
              >
                SEO
              </button>
            </nav>
          </div>
        </div>

        <div className="lg:w-3/4">
          <div className="bg-white rounded-lg shadow p-6">
            {activeSection === 'hero' && renderHeroEditor()}
            {activeSection === 'contact' && renderContactInfoEditor()}
            {activeSection === 'social' && renderSocialEditor()}
            {activeSection === 'seo' && renderSEOEditor()}
          </div>
        </div>
      </div>
    </div>
  );
} 