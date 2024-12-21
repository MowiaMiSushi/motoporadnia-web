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
  // Serwis
  {
    id: '1',
    name: 'Przegląd techniczny',
    description: 'Kompleksowy przegląd techniczny motocykla',
    price: 'od 200 zł',
    category: 'Serwis',
  },
  {
    id: '2',
    name: 'Wymiana oleju',
    description: 'Wymiana oleju silnikowego wraz z filtrem',
    price: 'od 150 zł',
    category: 'Serwis',
  },
  {
    id: '3',
    name: 'Diagnostyka komputerowa',
    description: 'Pełna diagnostyka komputerowa motocykla',
    price: 'od 100 zł',
    category: 'Serwis',
  },

  // Szkolenia
  {
    id: '4',
    name: 'Szkolenie podstawowe',
    description: 'Podstawowe szkolenie z jazdy motocyklem',
    price: 'od 500 zł',
    category: 'Szkolenia',
  },
  {
    id: '5',
    name: 'Szkolenie zaawansowane',
    description: 'Zaawansowane techniki jazdy motocyklem',
    price: 'od 800 zł',
    category: 'Szkolenia',
  },

  // Transport
  {
    id: '6',
    name: 'Transport motocykla',
    description: 'Transport motocykla na terenie miasta',
    price: 'od 150 zł',
    category: 'Transport',
  },
  {
    id: '7',
    name: 'Transport międzymiastowy',
    description: 'Transport motocykla między miastami',
    price: 'od 2 zł/km',
    category: 'Transport',
  },

  // Pomoc w zakupie
  {
    id: '8',
    name: 'Oględziny motocykla',
    description: 'Profesjonalne oględziny motocykla przed zakupem',
    price: 'od 200 zł',
    category: 'Pomoc w zakupie',
  },
  {
    id: '9',
    name: 'Wycena motocykla',
    description: 'Profesjonalna wycena wartości motocykla',
    price: 'od 100 zł',
    category: 'Pomoc w zakupie',
  },

  // Komis
  {
    id: '10',
    name: 'Wystawienie motocykla',
    description: 'Wystawienie motocykla w komisie',
    price: 'prowizja 5%',
    category: 'Komis',
  },
  {
    id: '11',
    name: 'Przygotowanie do sprzedaży',
    description: 'Przygotowanie motocykla do sprzedaży (czyszczenie, drobne naprawy)',
    price: 'od 300 zł',
    category: 'Komis',
  },
];

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedService) return;

    try {
      // Tutaj będzie logika zapisywania do bazy danych
      if (selectedService.id) {
        setServices(services.map((s) => (s.id === selectedService.id ? selectedService : s)));
      } else {
        setServices([...services, { ...selectedService, id: Date.now().toString() }]);
      }
      setSelectedService(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Błąd podczas zapisywania:', error);
    }
  };

  const handleAdd = () => {
    const newService: Service = {
      id: '',
      name: '',
      description: '',
      price: '',
      category: 'Serwis',
    };
    setSelectedService(newService);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    try {
      // Tutaj będzie logika usuwania z bazy danych
      setServices(services.filter((s) => s.id !== id));
      if (selectedService?.id === id) {
        setSelectedService(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Błąd podczas usuwania:', error);
    }
  };

  const handleCancel = () => {
    setSelectedService(null);
    setIsEditing(false);
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
                  <option value="Pomoc w zakupie">Pomoc w zakupie</option>
                  <option value="Komis">Komis</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancel}
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