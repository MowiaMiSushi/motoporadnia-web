'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faLaptop, faTools, faOilCan, faRing, faSun, faUserCog, faCogs, faShieldAlt, faDollarSign, faPhone, faMoneyBill, faMotorcycle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';

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
    images: ['/images/serwis_1.jpg', '/images/serwis_2.jpg']
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
    },
    {
      icon: "faTools",
      title: "Naprawy mechaniczne",
      description: "Kompleksowe naprawy silnika i innych podzespołów"
    },
    {
      icon: "faOilCan",
      title: "Wymiana płynów",
      description: "Wymiana oleju, płynu hamulcowego i chłodniczego"
    },
    {
      icon: "faMotorcycle",
      title: "Przygotowanie do sezonu",
      description: "Kompleksowe przygotowanie motocykla do sezonu"
    },
    {
      icon: "faCogs",
      title: "Modyfikacje",
      description: "Profesjonalne modyfikacje i tuning"
    }
  ],
  brands: [
    {
      name: "Honda",
      image: "/images/brands/honda.png"
    },
    {
      name: "Yamaha",
      image: "/images/brands/yamaha.png"
    },
    {
      name: "Suzuki",
      image: "/images/brands/suzuki.png"
    },
    {
      name: "Kawasaki",
      image: "/images/brands/kawasaki.png"
    },
    {
      name: "BMW",
      image: "/images/brands/bmw.png"
    },
    {
      name: "KTM",
      image: "/images/brands/ktm.png"
    },
    {
      name: "Ducati",
      image: "/images/brands/ducati.png"
    },
    {
      name: "Triumph",
      image: "/images/brands/triumph.png"
    }
  ],
  cta: {
    title: "Potrzebujesz serwisu?",
    description: "Skontaktuj się z nami i umów wizytę w dogodnym terminie.",
    phoneNumber: "789059578"
  }
};

const iconMap: { [key: string]: any } = {
  faWrench,
  faLaptop,
  faTools,
  faOilCan,
  faRing,
  faSun,
  faUserCog,
  faCogs,
  faShieldAlt,
  faDollarSign,
  faPhone,
  faMoneyBill,
  faMotorcycle,
  faCheckCircle
};

interface CardProps {
  item: Service;
  className?: string;
}

const Card = ({ item, className = "" }: CardProps) => {
  const icon = iconMap[item.icon] || faTools;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <div className="flex items-center mb-4">
        <div className="bg-[#C62400] p-3 rounded-lg">
          <FontAwesomeIcon icon={icon} className="w-6 h-6 text-white" />
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
      <p className="text-gray-600">{item.description}</p>
    </motion.div>
  );
};

export default function Serwis() {
  const [content, setContent] = useState<PageContent | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log('Client: Rozpoczynam pobieranie danych');
        const response = await fetch('/api/content/services/serwis', {
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
            if (data && data.hero && data.services) {
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
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    if (content?.hero.images) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === content.hero.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [content]);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        {content.hero.images.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${image}')`,
              opacity: currentImageIndex === index ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-black/30 backdrop-blur-sm py-8 px-6 sm:px-25 rounded-lg max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              {content.hero.title}
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8">
              {content.hero.description}
            </p>
            <Link 
              href="/uslugi/serwis/cennik"
              className="inline-flex items-center bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors"
            >
              Sprawdź cennik
            </Link>
          </div>
        </div>
      </section>

      {/* Usługi */}
      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Zakres usług serwisowych</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.services.map((service) => (
              <Card key={service.title} item={service} className="hover:-translate-y-1" />
            ))}
          </div>
        </div>
      </section>

      {/* Marki jakie obsługujemy */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Marki jakie obsługujemy</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {content.brands.map((brand) => (
              <div 
                key={brand.name}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <h3 className="text-lg font-semibold p-3 text-center border-b truncate">{brand.name}</h3>
                <div className="relative h-32 w-full">
                  <Image
                    src={brand.image}
                    alt={`Logo ${brand.name}`}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#C62400]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">{content.cta.title}</h2>
            <p className="text-xl mb-8">{content.cta.description}</p>
            <a
              href={`tel:${content.cta.phoneNumber}`}
              className="inline-flex items-center bg-white text-[#C62400] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              {content.cta.phoneNumber}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 