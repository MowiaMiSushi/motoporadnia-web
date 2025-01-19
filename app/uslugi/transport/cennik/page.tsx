'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faRoute, faMapMarkedAlt, faHandshake, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const iconMap: { [key: string]: IconDefinition } = {
  faTruck,
  faRoute,
  faMapMarkedAlt,
  faHandshake,
  faEnvelope,
  faPhone
};

interface PriceListItem {
  name: string;
  price: string;
}

interface PriceListSection {
  title: string;
  icon: string;
  description: string;
  items: PriceListItem[];
}

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  pricingCategories: PriceListSection[];
}

const defaultContent: PageContent = {
  hero: {
    title: "Cennik transportu motocykli",
    description: "Oferujemy profesjonalny transport motocykli. Ceny są orientacyjne i mogą się różnić w zależności od odległości i specyfiki zlecenia.",
    images: ['/images/transport_1.jpg', '/images/transport_2.jpg']
  },
  pricingCategories: [
    {
      title: "Transport lokalny",
      icon: "faTruck",
      description: "Transport motocykli w obrębie miasta i okolic",
      items: [
        { name: "Transport w granicach miasta", price: "od 100 zł" },
        { name: "Transport do 50 km", price: "od 200 zł" },
        { name: "Transport powyżej 50 km", price: "2 zł/km" }
      ]
    },
    {
      title: "Transport krajowy",
      icon: "faRoute",
      description: "Transport motocykli na terenie całej Polski",
      items: [
        { name: "Transport do 100 km", price: "od 350 zł" },
        { name: "Transport do 200 km", price: "od 500 zł" },
        { name: "Transport powyżej 200 km", price: "2,5 zł/km" }
      ]
    },
    {
      title: "Usługi dodatkowe",
      icon: "faHandshake",
      description: "Dodatkowe usługi związane z transportem",
      items: [
        { name: "Załadunek/rozładunek", price: "w cenie" },
        { name: "Zabezpieczenie motocykla", price: "w cenie" },
        { name: "Transport ekspresowy", price: "wycena indywidualna" }
      ]
    }
  ]
};

export default function TransportPricingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [content, setContent] = useState<PageContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log('Client: Rozpoczynam pobieranie danych');
        const response = await fetch('/api/content/pricing/transport', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        
        const responseText = await response.text();
        console.log('Client: Surowa odpowiedź z API:', responseText);

        if (response.ok) {
          try {
            const data = JSON.parse(responseText);
            console.log('Client: Sparsowane dane:', JSON.stringify(data, null, 2));
            if (data && data.hero && data.pricingCategories && data.pricingCategories.length > 0) {
              console.log('Client: Ustawiam otrzymane dane');
              setContent(data);
            } else {
              console.log('Client: Brak wymaganych pól w danych z API, używam domyślnej zawartości');
              setContent(defaultContent);
            }
          } catch (e) {
            console.error('Client: Błąd parsowania JSON:', e);
            setContent(defaultContent);
          }
        } else {
          console.error('Client: Failed to fetch content. Status:', response.status);
          console.error('Client: Error text:', responseText);
          setContent(defaultContent);
        }
      } catch (error) {
        console.error('Client: Error fetching content:', error);
        setContent(defaultContent);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    if (content?.hero?.images?.length) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === content.hero.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [content]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-xl">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-black" aria-label="Baner główny">
        <div className="absolute inset-0 bg-black/50 z-0" />
        {content.hero.images.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 transition-opacity duration-1000 hero-image"
            style={{
              backgroundImage: `url('${image}')`,
              opacity: currentImageIndex === index ? 1 : 0,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
            role="img"
            aria-label="Zdjęcie transportu motocykla w tle"
          />
        ))}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 z-[1]" 
          aria-hidden="true"
        />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-8 rounded-lg max-w-4xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {content.hero.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              {content.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {content.pricingCategories.map((category, index) => (
              <div
                key={category.title}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="text-[#C62400] mb-4">
                    <FontAwesomeIcon icon={iconMap[category.icon]} className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex justify-between items-center border-b border-gray-100 pb-2"
                      >
                        <span className="text-gray-700">{item.name}</span>
                        <span className="text-[#C62400] font-semibold">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Potrzebujesz pomocy w transporcie?</h2>
            <p className="text-xl mb-8 text-gray-600">
              Skontaktuj się z nami, aby omówić szczegóły i umówić transport motocykla.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:789059578"
                className="bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Zadzwoń teraz
              </a>
              <a
                href="/kontakt"
                className="bg-white text-gray-900 px-8 py-3 rounded-lg transition-colors inline-flex items-center justify-center hover:bg-gray-50 border border-gray-200"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Napisz do nas
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 