'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  openingHours: OpeningHours;
  socialMedia: SocialMedia;
  mapLink: string;
}

interface OpeningHours {
  weekdays: string;
  saturday: string;
  sunday: string;
}

interface SocialMedia {
  facebook: string;
  instagram: string;
}

const initialContactInfo: ContactInfo = {
  address: 'ul. Przykładowa 123, 00-000 Warszawa',
  phone: '+48 123 456 789',
  email: 'kontakt@motoporadnia.pl',
  openingHours: {
    weekdays: '8:00 - 18:00',
    saturday: '9:00 - 15:00',
    sunday: 'Zamknięte',
  },
  socialMedia: {
    facebook: 'https://facebook.com/motoporadnia',
    instagram: 'https://instagram.com/motoporadnia',
  },
  mapLink: 'https://goo.gl/maps/example',
};

export default function AdminContact() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [contactInfo, setContactInfo] = useState(initialContactInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(initialContactInfo);

  if (status === 'unauthenticated') {
    router.push('/admin/login');
    return null;
  }

  const handleSave = async () => {
    try {
      // Tutaj dodamy logikę zapisywania do bazy danych
      setContactInfo(editForm);
      setIsEditing(false);
      // Dodaj powiadomienie o sukcesie
    } catch (error) {
      console.error('Błąd podczas zapisywania:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Zarządzanie danymi kontaktowymi
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="p-6">
              {isEditing ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Podstawowe informacje
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Adres
                        </label>
                        <input
                          type="text"
                          value={editForm.address}
                          onChange={(e) =>
                            setEditForm({ ...editForm, address: e.target.value })
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Telefon
                        </label>
                        <input
                          type="text"
                          value={editForm.phone}
                          onChange={(e) =>
                            setEditForm({ ...editForm, phone: e.target.value })
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) =>
                            setEditForm({ ...editForm, email: e.target.value })
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Godziny otwarcia
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Dni robocze
                        </label>
                        <input
                          type="text"
                          value={editForm.openingHours.weekdays}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              openingHours: {
                                ...editForm.openingHours,
                                weekdays: e.target.value,
                              },
                            })
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Sobota
                        </label>
                        <input
                          type="text"
                          value={editForm.openingHours.saturday}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              openingHours: {
                                ...editForm.openingHours,
                                saturday: e.target.value,
                              },
                            })
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Niedziela
                        </label>
                        <input
                          type="text"
                          value={editForm.openingHours.sunday}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              openingHours: {
                                ...editForm.openingHours,
                                sunday: e.target.value,
                              },
                            })
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Media społecznościowe
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Facebook
                        </label>
                        <input
                          type="text"
                          value={editForm.socialMedia.facebook}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              socialMedia: {
                                ...editForm.socialMedia,
                                facebook: e.target.value,
                              },
                            })
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Instagram
                        </label>
                        <input
                          type="text"
                          value={editForm.socialMedia.instagram}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              socialMedia: {
                                ...editForm.socialMedia,
                                instagram: e.target.value,
                              },
                            })
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Link do mapy
                    </h2>
                    <div>
                      <input
                        type="text"
                        value={editForm.mapLink}
                        onChange={(e) =>
                          setEditForm({ ...editForm, mapLink: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                      Anuluj
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-[#C62400] text-white rounded-md hover:bg-[#A51D00] transition-colors duration-200"
                    >
                      Zapisz zmiany
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Podstawowe informacje
                    </h2>
                    <dl className="grid grid-cols-1 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Adres</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {contactInfo.address}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Telefon</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {contactInfo.phone}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {contactInfo.email}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Godziny otwarcia
                    </h2>
                    <dl className="grid grid-cols-1 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Dni robocze
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {contactInfo.openingHours.weekdays}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Sobota</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {contactInfo.openingHours.saturday}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Niedziela
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {contactInfo.openingHours.sunday}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Media społecznościowe
                    </h2>
                    <dl className="grid grid-cols-1 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Facebook
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {contactInfo.socialMedia.facebook}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Instagram
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {contactInfo.socialMedia.instagram}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Link do mapy
                    </h2>
                    <p className="text-sm text-gray-900">{contactInfo.mapLink}</p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-[#C62400] text-white rounded-md hover:bg-[#A51D00] transition-colors duration-200"
                    >
                      Edytuj dane
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 