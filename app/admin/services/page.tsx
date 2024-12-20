'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface ServiceCategory {
  id: string;
  name: string;
  services: Service[];
}

interface Service {
  id: string;
  name: string;
  price: string;
  description?: string;
}

const initialCategories: ServiceCategory[] = [
  {
    id: 'basic',
    name: 'Podstawowe usługi',
    services: [
      { id: '1', name: 'Przegląd motocykla', price: '150 zł', description: 'Podstawowy przegląd techniczny' },
      { id: '2', name: 'Wymiana oleju', price: '100 zł', description: 'Wymiana oleju z filtrem' },
    ],
  },
  {
    id: 'brakes',
    name: 'Układ hamulcowy',
    services: [
      { id: '3', name: 'Wymiana klocków', price: '120 zł', description: 'Wymiana klocków hamulcowych' },
      { id: '4', name: 'Odpowietrzanie układu', price: '150 zł', description: 'Odpowietrzanie układu hamulcowego' },
    ],
  },
];

export default function AdminServices() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [editingService, setEditingService] = useState<{
    categoryId: string;
    serviceId: string;
  } | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    description: '',
  });

  if (status === 'unauthenticated') {
    router.push('/admin/login');
    return null;
  }

  const handleEdit = (categoryId: string, service: Service) => {
    setEditingService({ categoryId, serviceId: service.id });
    setEditForm({
      name: service.name,
      price: service.price,
      description: service.description || '',
    });
  };

  const handleSave = async () => {
    if (!editingService) return;

    try {
      // Tutaj dodamy logikę zapisywania do bazy danych
      setCategories(
        categories.map((category) =>
          category.id === editingService.categoryId
            ? {
                ...category,
                services: category.services.map((service) =>
                  service.id === editingService.serviceId
                    ? {
                        ...service,
                        name: editForm.name,
                        price: editForm.price,
                        description: editForm.description,
                      }
                    : service
                ),
              }
            : category
        )
      );
      setEditingService(null);
      // Dodaj powiadomienie o sukcesie
    } catch (error) {
      console.error('Błąd podczas zapisywania:', error);
    }
  };

  const handleAddService = (categoryId: string) => {
    const newService: Service = {
      id: Date.now().toString(),
      name: 'Nowa usługa',
      price: '0 zł',
      description: 'Opis usługi',
    };

    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? { ...category, services: [...category.services, newService] }
          : category
      )
    );
  };

  const handleDeleteService = (categoryId: string, serviceId: string) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              services: category.services.filter((service) => service.id !== serviceId),
            }
          : category
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Zarządzanie usługami</h1>
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
          <div className="space-y-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
                    <button
                      onClick={() => handleAddService(category.id)}
                      className="text-[#C62400] hover:text-[#A51D00] transition-colors duration-200 flex items-center"
                    >
                      <span>Dodaj usługę</span>
                      <svg
                        className="ml-2 w-4 h-4"
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
                    </button>
                  </div>
                  <div className="space-y-4">
                    {category.services.map((service) => (
                      <div
                        key={service.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        {editingService?.serviceId === service.id ? (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Nazwa usługi
                              </label>
                              <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) =>
                                  setEditForm({ ...editForm, name: e.target.value })
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Cena
                              </label>
                              <input
                                type="text"
                                value={editForm.price}
                                onChange={(e) =>
                                  setEditForm({ ...editForm, price: e.target.value })
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
                            <div className="flex justify-end space-x-3">
                              <button
                                onClick={() => setEditingService(null)}
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
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                  {service.name}
                                </h3>
                                <p className="text-gray-600">{service.description}</p>
                              </div>
                              <span className="text-lg font-semibold text-gray-900">
                                {service.price}
                              </span>
                            </div>
                            <div className="flex justify-end space-x-3">
                              <button
                                onClick={() => handleEdit(category.id, service)}
                                className="text-[#C62400] hover:text-[#A51D00] transition-colors duration-200"
                              >
                                Edytuj
                              </button>
                              <button
                                onClick={() => handleDeleteService(category.id, service.id)}
                                className="text-red-600 hover:text-red-800 transition-colors duration-200"
                              >
                                Usuń
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 