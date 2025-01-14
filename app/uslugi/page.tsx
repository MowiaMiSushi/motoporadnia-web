'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Feature {
  title: string;
  description: string;
}

interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string[];
  image: string;
  link: string;
  features: Feature[];
}

interface ServicesContent {
  hero: {
    title: string;
    subtitle: string;
    backgroundImages: string[];
  };
  services: Service[];
}

export default function ServicesPage() {
  const [content, setContent] = useState<ServicesContent | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/services');
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    if (content?.hero.backgroundImages.length) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === content.hero.backgroundImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [content?.hero.backgroundImages]);

  if (!content) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        {content.hero.backgroundImages.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${image}')`,
              opacity: currentImageIndex === index ? 1 : 0,
            }}
          />
        ))}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            {content.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl text-white"
          >
            {content.hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                  <ul className="space-y-2 mb-6">
                    {service.description.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[#C62400] mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.link}
                    className="inline-block bg-[#C62400] text-white px-6 py-2 rounded-md hover:bg-[#A01D00] transition-colors duration-300"
                  >
                    Dowiedz się więcej
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 