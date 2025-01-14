'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHandshake, faFileContract, faMoneyBillWave, faCamera, faListCheck, faPhone, faEnvelope, faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

interface Platform {
  name: string;
  description: string;
  url: string;
  icon: string;
}

interface Step {
  title: string;
  description: string;
  icon: string;
}

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  platforms: Platform[];
  steps: Step[];
  cta: {
    title: string;
    description: string;
    phoneNumber: string;
  };
}

const getIconByName = (iconName: string) => {
  const icons: { [key: string]: any } = {
    faSearch,
    faHandshake,
    faFileContract,
    faMoneyBillWave,
    faCamera,
    faListCheck,
    faMotorcycle,
    faFacebook,
    faInstagram
  };
  return icons[iconName] || faMotorcycle;
};

export default function Komis() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [content, setContent] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/services/komis');
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
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

  if (isLoading || !content) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
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
            aria-label="Zdjęcie motocykla w tle"
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

      {/* Jak działamy */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Jak działamy</h2>
            <p className="text-gray-600">
              Poznaj proces sprzedaży motocykla w naszym komisie
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {content.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform cursor-pointer border border-gray-100 group"
              >
                <div className="w-12 h-12 bg-[#000000] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#A01D00] transition-colors duration-300">
                  <FontAwesomeIcon icon={getIconByName(step.icon)} className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#C62400] transition-colors duration-300">{step.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sekcja z platformami */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Gdzie nas znajdziesz?</h2>
            <p className="text-gray-600">
              Nasze ogłoszenia publikujemy na najpopularniejszych platformach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.platforms.map((platform, index) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 transform cursor-pointer group"
              >
                <div className="mb-4 text-gray-700 group-hover:text-[#C62400] transition-colors duration-300">
                  <FontAwesomeIcon icon={getIconByName(platform.icon)} className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-[#C62400] transition-colors duration-300">{platform.name}</h3>
                <p className="text-gray-600">{platform.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {content.cta.title}
          </h2>
          <p className="text-xl mb-8 text-black/90">
            {content.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${content.cta.phoneNumber}`}
              className="btn-primary bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              Zadzwoń teraz
            </a>
            <a
              href="/kontakt"
              className="btn-secondary bg-white/10 hover:bg-white/20 text-black px-8 py-3 rounded-lg transition-colors hover:shadow-lg hover:bg-grey-100"
            >
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              Napisz do nas
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 