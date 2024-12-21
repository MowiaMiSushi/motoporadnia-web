'use client';

import { useState } from 'react';

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

const initialServices: Service[] = [
  {
    id: '1',
    name: 'Przegląd techniczny',
    description: 'Kompleksowy przegląd techniczny motocykla',
    price: 'od 200 zł',
    category: 'Serwis',
  },
  {
    id: '2',
    name: 'Szkolenie podstawowe',
    description: 'Podstawowe szkolenie z jazdy motocyklem',
    price: 'od 500 zł',
    category: 'Szkolenia',
  },
];

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleEdit = (service: Service) => {
    setSelectedService(service);
  };

  const handleSave = () => {
    if (!selectedService) return;

    setServices(services.map((s) => (s.id === selectedService.id ? selectedService : s)));
    setSelectedService(null);
  };

  const handleAdd = () => {
    const newService: Service = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: '',
      category: 'Serwis',
    };
    setSelectedService(newService);
  };

  const handleDelete = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
    if (selectedService?.id === id) {
      setSelectedService(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Zarządzanie usługami</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Dodaj usługę
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lista usług */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Lista usług</h2>
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-4 border rounded hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-sm text-gray-500">{service.category}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Usuń
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formularz edycji */}
        {selectedService && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              {selectedService.id ? 'Edycja usługi' : 'Nowa usługa'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nazwa
                </label>
                <input
                  type="text"
                  value={selectedService.name}
                  onChange={(e) =>
                    setSelectedService({ ...selectedService, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Opis
                </label>
                <textarea
                  value={selectedService.description}
                  onChange={(e) =>
                    setSelectedService({
                      ...selectedService,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cena
                </label>
                <input
                  type="text"
                  value={selectedService.price}
                  onChange={(e) =>
                    setSelectedService({ ...selectedService, price: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Kategoria
                </label>
                <select
                  value={selectedService.category}
                  onChange={(e) =>
                    setSelectedService({
                      ...selectedService,
                      category: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="Serwis">Serwis</option>
                  <option value="Szkolenia">Szkolenia</option>
                  <option value="Transport">Transport</option>
                  <option value="Komis">Komis</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 text-sm text-gray-700 border rounded hover:bg-gray-50"
                >
                  Anuluj
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Zapisz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 