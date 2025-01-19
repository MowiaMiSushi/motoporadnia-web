'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface Brand {
  name: string;
  image: string;
}

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  services: Service[];
  brands: Brand[];
  cta: {
    title: string;
    description: string;
    phoneNumber: string;
  };
}

const defaultContent: PageContent = {
  hero: {
    title: "Profesjonalny serwis motocyklowy",
    description: "Oferujemy kompleksową obsługę serwisową motocykli wszystkich marek. Nasz zespół doświadczonych mechaników zadba o Twój jednoślad.",
    images: ['/images/serwis_1.webp', '/images/serwis_2.webp']
  },
  services: [
    {
      icon: "faWrench",
      title: "Przeglądy okresowe",
      description: "Regularne przeglądy zgodne z książką serwisową"
    },
    {
      icon: "faLaptop",
      title: "Diagnostyka komputerowa",
      description: "Profesjonalny sprzęt diagnostyczny"
    }
  ],
  brands: [
    {
      name: "Honda",
      image: "/images/brands/honda.webp"
    },
    {
      name: "Yamaha",
      image: "/images/brands/yamaha.webp"
    }
  ],
  cta: {
    title: "Potrzebujesz serwisu?",
    description: "Skontaktuj się z nami i umów wizytę w dogodnym terminie.",
    phoneNumber: "789059578"
  }
};

export default function ServiceAdmin() {
  const { data: session } = useSession();
  const router = useRouter();
  const [content, setContent] = useState<PageContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log('Admin: Rozpoczynam pobieranie danych');
        const response = await fetch('/api/content/services/serwis', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });

        const responseText = await response.text();
        console.log('Admin: Surowa odpowiedź z API:', responseText);

        if (response.ok) {
          try {
            const data = JSON.parse(responseText);
            console.log('Admin: Sparsowane dane:', JSON.stringify(data, null, 2));
            if (data && data.hero && data.services) {
              console.log('Admin: Ustawiam otrzymane dane');
              setContent(data);
            } else {
              console.log('Admin: Brak wymaganych pól w danych z API, używam domyślnej zawartości');
              setContent(defaultContent);
            }
          } catch (e) {
            console.error('Admin: Błąd parsowania JSON:', e);
            setContent(defaultContent);
          }
        } else {
          console.error('Admin: Failed to fetch content. Status:', response.status);
          console.error('Admin: Error text:', responseText);
          setContent(defaultContent);
        }
      } catch (error) {
        console.error('Admin: Error fetching content:', error);
        setContent(defaultContent);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchContent();
    }
  }, [session]);

  const handleSave = async () => {
    try {
      console.log('Admin: Rozpoczynam zapisywanie danych');
      console.log('Admin: Dane do wysłania:', JSON.stringify(content, null, 2));

      const response = await fetch('/api/content/services/serwis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(content)
      });

      const responseText = await response.text();
      console.log('Admin: Surowa odpowiedź z API:', responseText);

      if (response.ok) {
        try {
          const data = JSON.parse(responseText);
          console.log('Admin: Sparsowane dane z odpowiedzi:', JSON.stringify(data, null, 2));
          toast.success('Zmiany zostały zapisane');
          router.refresh();
        } catch (e) {
          console.error('Admin: Błąd parsowania odpowiedzi JSON:', e);
          toast.error('Błąd podczas zapisywania zmian');
        }
      } else {
        console.error('Admin: Błąd podczas zapisywania. Status:', response.status);
        console.error('Admin: Treść błędu:', responseText);
        toast.error('Błąd podczas zapisywania zmian');
      }
    } catch (error) {
      console.error('Admin: Error saving content:', error);
      toast.error('Błąd podczas zapisywania zmian');
    }
  };

  const addService = () => {
    setContent(prev => ({
      ...prev,
      services: [
        ...prev.services,
        {
          icon: "faTools",
          title: "Nowa usługa",
          description: "Opis nowej usługi"
        }
      ]
    }));
  };

  const removeService = (index: number) => {
    setContent(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const updateService = (index: number, field: keyof Service, value: string) => {
    setContent(prev => ({
      ...prev,
      services: prev.services.map((service, i) =>
        i === index ? { ...service, [field]: value } : service
      )
    }));
  };

  const addBrand = () => {
    setContent(prev => ({
      ...prev,
      brands: [
        ...prev.brands,
        {
          name: "Nowa marka",
          image: "/images/brands/default.webp"
        }
      ]
    }));
  };

  const removeBrand = (index: number) => {
    setContent(prev => ({
      ...prev,
      brands: prev.brands.filter((_, i) => i !== index)
    }));
  };

  const updateBrand = (index: number, field: keyof Brand, value: string) => {
    setContent(prev => ({
      ...prev,
      brands: prev.brands.map((brand, i) =>
        i === index ? { ...brand, [field]: value } : brand
      )
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Edycja strony serwisu</h1>
        <button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          Zapisz zmiany
        </button>
      </div>

      {/* Hero Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Sekcja Hero</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tytuł</label>
            <input
              type="text"
              value={content.hero.title}
              onChange={(e) => setContent(prev => ({
                ...prev,
                hero: { ...prev.hero, title: e.target.value }
              }))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Opis</label>
            <textarea
              value={content.hero.description}
              onChange={(e) => setContent(prev => ({
                ...prev,
                hero: { ...prev.hero, description: e.target.value }
              }))}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Zdjęcia (po przecinku)</label>
            <input
              type="text"
              value={content.hero.images.join(', ')}
              onChange={(e) => setContent(prev => ({
                ...prev,
                hero: { ...prev.hero, images: e.target.value.split(',').map(s => s.trim()) }
              }))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Usługi</h2>
          <button
            onClick={addService}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Dodaj usługę
          </button>
        </div>
        <div className="space-y-4">
          {content.services.map((service, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Usługa {index + 1}</h3>
                <button
                  onClick={() => removeService(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Ikona</label>
                  <input
                    type="text"
                    value={service.icon}
                    onChange={(e) => updateService(index, 'icon', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tytuł</label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => updateService(index, 'title', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Opis</label>
                  <textarea
                    value={service.description}
                    onChange={(e) => updateService(index, 'description', e.target.value)}
                    className="w-full p-2 border rounded"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brands Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Marki</h2>
          <button
            onClick={addBrand}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Dodaj markę
          </button>
        </div>
        <div className="space-y-4">
          {content.brands.map((brand, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Marka {index + 1}</h3>
                <button
                  onClick={() => removeBrand(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nazwa</label>
                  <input
                    type="text"
                    value={brand.name}
                    onChange={(e) => updateBrand(index, 'name', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">URL obrazu</label>
                  <input
                    type="text"
                    value={brand.image}
                    onChange={(e) => updateBrand(index, 'image', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Sekcja CTA</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tytuł</label>
            <input
              type="text"
              value={content.cta.title}
              onChange={(e) => setContent(prev => ({
                ...prev,
                cta: { ...prev.cta, title: e.target.value }
              }))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Opis</label>
            <textarea
              value={content.cta.description}
              onChange={(e) => setContent(prev => ({
                ...prev,
                cta: { ...prev.cta, description: e.target.value }
              }))}
              className="w-full p-2 border rounded"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Numer telefonu</label>
            <input
              type="text"
              value={content.cta.phoneNumber}
              onChange={(e) => setContent(prev => ({
                ...prev,
                cta: { ...prev.cta, phoneNumber: e.target.value }
              }))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </section>
    </div>
  );
} 