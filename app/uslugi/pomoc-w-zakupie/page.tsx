'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faClipboardCheck, faSearch, faHandshake, faTools, faMotorcycle, faMoneyBill, faTruckArrowRight, faTruck, faTag } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  mainSections: Array<{
    title: string;
    content: string[];
    image: string;
  }>;
  serviceFeatures: {
    title: string;
    features: Array<{
      icon: string;
      text: string;
    }>;
  };
  infoSections: Array<{
    title: string;
    introduction: string;
    items: string[];
    conclusion?: string;
  }>;
  remoteSection: {
    title: string;
    content: string[];
  };
  cta: {
    title: string;
    description: string;
    phoneNumber: string;
  };
}

export default function PurchaseAssistance() {
  const [content, setContent] = useState<PageContent | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/services/pomoc-w-zakupie');
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

  const getIconByName = (iconName: string) => {
    const icons: { [key: string]: any } = {
      faClipboardCheck,
      faSearch,
      faHandshake,
      faTools,
      faMotorcycle,
      faMoneyBill,
      faTruckArrowRight,
      faTruck,
      faTag
    };
    return icons[iconName] || faClipboardCheck;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-black" aria-label="Baner główny">
        {content.hero.images.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${image}')`,
              opacity: currentImageIndex === index ? 1 : 0
            }}
          />
        ))}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm py-8 rounded-lg max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {content.hero.title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {content.hero.description}
          </p>
          <Link
            href="/uslugi/pomoc-w-zakupie/cennik"
            className="inline-flex items-center bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors mt-6"
          >
            Sprawdź cennik
          </Link>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {content.mainSections.map((section, index) => (
              <div key={index} className="bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] rounded-lg shadow-lg p-8 mb-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#C62400]">{section.title}</h2>
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-lg leading-relaxed text-gray-700">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className={`relative h-[400px] rounded-lg overflow-hidden shadow-lg ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Co zawiera usługa */}
            <div className="bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] rounded-lg shadow-lg p-8 mb-16">
              <h2 className="text-2xl font-bold mb-6">{content.serviceFeatures.title}</h2>
              <ul className="space-y-3 text-gray-700">
                {content.serviceFeatures.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FontAwesomeIcon icon={getIconByName(feature.icon)} className="text-[#C62400] w-5 h-5 mr-3" />
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Informacje dla klientów */}
            <div className="grid md:grid-cols-2 gap-8">
              {content.infoSections.map((section, index) => (
                <div key={index} className="bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] rounded-lg shadow-lg p-8 mb-16">
                  <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
                  <p className="text-gray-700 mb-4">{section.introduction}</p>
                  <ul className="space-y-3 text-gray-700">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>– {item}</li>
                    ))}
                  </ul>
                  {section.conclusion && (
                    <p className="text-gray-700 mt-4">{section.conclusion}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Sekcja zakupu zdalnego */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] rounded-lg shadow-lg p-8 mb-16">
                <div className="grid gap-12 items-center">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#C62400]">{content.remoteSection.title}</h2>
                    {content.remoteSection.content.map((paragraph, index) => (
                      <p key={index} className="text-lg leading-relaxed text-gray-700">
                        {paragraph}
                      </p>
                    ))}
                    <Link
                      href="/uslugi/pomoc-w-zakupie/cennik"
                      className="inline-block bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors"
                    >
                      Sprawdź cennik
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{content.cta.title}</h2>
            <p className="text-xl mb-8 text-gray-600">
              {content.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${content.cta.phoneNumber}`}
                className="bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Zadzwoń teraz
              </a>
              <Link
                href="/uslugi/pomoc-w-zakupie/cennik"
                className="bg-white text-gray-900 px-8 py-3 rounded-lg transition-colors inline-flex items-center justify-center hover:bg-gray-50 border border-gray-200"
              >
                <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
                Zobacz cennik
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 