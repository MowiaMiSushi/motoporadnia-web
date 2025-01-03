'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/app/components/ui/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

interface Service {
  id: string;
  title: string;
  description: string;
  price?: string;
}

export default function ServiceEditor() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services/serwis');
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        showNotification({
          title: 'Błąd',
          message: 'Nie udało się pobrać listy usług',
          type: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleAddService = () => {
    setServices([
      ...services,
      {
        id: Date.now().toString(),
        title: 'Nowa usługa',
        description: 'Opis usługi',
        price: '',
      },
    ]);
  };

  const handleRemoveService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch('/api/services/serwis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(services),
      });

      if (!response.ok) {
        throw new Error('Failed to save services');
      }

      showNotification({
        title: 'Sukces',
        message: 'Zmiany zostały zapisane',
        type: 'success'
      });
      router.refresh();
    } catch (error) {
      console.error('Error saving services:', error);
      showNotification({
        title: 'Błąd',
        message: 'Nie udało się zapisać zmian',
        type: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Edycja usług serwisowych</h2>
        <div className="space-x-4">
          <button
            onClick={handleAddService}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Dodaj usługę
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? 'Zapisywanie...' : 'Zapisz zmiany'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {services.map((service, index) => (
          <div key={service.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => {
                    const newServices = [...services];
                    newServices[index] = { ...service, title: e.target.value };
                    setServices(newServices);
                  }}
                  className="w-full text-xl font-bold mb-2 p-2 border rounded"
                  placeholder="Nazwa usługi"
                />
                <textarea
                  value={service.description}
                  onChange={(e) => {
                    const newServices = [...services];
                    newServices[index] = { ...service, description: e.target.value };
                    setServices(newServices);
                  }}
                  className="w-full p-2 border rounded"
                  rows={3}
                  placeholder="Opis usługi"
                />
                <input
                  type="text"
                  value={service.price || ''}
                  onChange={(e) => {
                    const newServices = [...services];
                    newServices[index] = { ...service, price: e.target.value };
                    setServices(newServices);
                  }}
                  className="w-full mt-2 p-2 border rounded"
                  placeholder="Cena (opcjonalnie)"
                />
              </div>
              <button
                onClick={() => handleRemoveService(service.id)}
                className="ml-4 text-red-600 hover:text-red-800"
              >
                <FontAwesomeIcon icon={faTrash} size="lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 