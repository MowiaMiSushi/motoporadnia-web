'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faTruck, faMoneyBill, faTruckArrowRight, faRoadBarrier } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

interface MainSection {
    title: string;
    description: string;
    image: string;
}

interface Area {
    icon: string;
    text: string;
}

interface PageContent {
    hero: {
        title: string;
        description: string;
        images: string[];
    };
    mainSections: MainSection[];
    operatingArea: {
        title: string;
        description: string;
        areas: Area[];
        additionalInfo: string;
    };
    cta: {
        title: string;
        description: string;
        phoneNumber: string;
    };
}

const defaultContent: PageContent = {
    hero: {
        title: "Transport motocykli Poznań i Europa",
        description: "Profesjonalny transport motocykli na terenie Poznania, całej Polski i Europy. Bezpieczny przewóz jednośladów z pełnym ubezpieczeniem.",
        images: [
            "/images/transport_1.webp",
            "/images/transport_2.webp",
            "/images/transport_3.webp"
        ]
    },
    mainSections: [
        {
            title: "Profesjonalny transport motocykli na terenie Poznania i Europy",
            description: "Transport motocykli wykonujemy w sposób w pełni profesjonalny, z najwyższą dbałością o bezpieczeństwo Twojego jednośladu. Specjalizujemy się w bezpiecznym i sprawnym transporcie motocykli zarówno lokalnie, jak i na długich dystansach międzynarodowych.",
            image: "/images/transport_3.webp"
        },
        {
            title: "Największa gwarancja bezpieczeństwa",
            description: "Dla maksymalnego bezpieczeństwa podczas załadunku i rozładunku, korzystamy z wytrzymałego najazdu aluminiowego o udźwigu do 400kg. Transportowany motocykl jest zamocowany w specjalnym doku pod przednie koło, które uniemożliwia jego przechylenie na boki.",
            image: "/images/transport_1.webp"
        },
        {
            title: "Najlepsze zabezpieczenie motocykla",
            description: "Każdy motocykl zabezpieczamy profesjonalnymi pasami transportowymi w 2 lub 4 punktach, w zależności od typu i gabarytów jednośladu. Oferujemy możliwość przewozu do 2 motocykli jednocześnie, co pozwala zoptymalizować koszty transportu.",
            image: "/images/transport_2.webp"
        }
    ],
    operatingArea: {
        title: "Obszar działania",
        description: "Świadczymy kompleksowe usługi transportowe na trzech poziomach:",
        areas: [
            {
                icon: "faTruck",
                text: "Transport lokalny - Poznań i okolice (do 50 km)"
            },
            {
                icon: "faTruckArrowRight",
                text: "Transport krajowy - cała Polska"
            },
            {
                icon: "faRoadBarrier",
                text: "Transport międzynarodowy - kraje Unii Europejskiej"
            }
        ],
        additionalInfo: "Ceny ustalamy indywidualnie w zależności od odległości, ilości motocykli i specyfiki transportu. Zapewniamy konkurencyjne stawki i pełne ubezpieczenie podczas transportu."
    },
    cta: {
        title: "Potrzebujesz transportu motocykla?",
        description: "Skontaktuj się z nami, aby ustalić szczegóły transportu i otrzymać wycenę.",
        phoneNumber: "789059578"
    }
};

export default function TransportPage() {
  const [content, setContent] = useState<PageContent>(defaultContent);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/public/transport');
        if (response.ok) {
          const data = await response.json();
          if (Object.keys(data).length > 0) {
            setContent(data);
          }
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Ładowanie...</div>
      </div>
    );
  }

  const getIconByName = (iconName: string) => {
    const icons: { [key: string]: any } = {
      faTruck,
      faTruckArrowRight,
      faRoadBarrier
    };
    return icons[iconName] || faTruck;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center bg-black" aria-label="Baner główny">
        {content.hero.images.map((image: string, index: number) => (
          <div
            key={image}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: currentImageIndex === index ? 1 : 0
            }}
          >
            <Image
              src={image}
              alt="Transport motocykli"
              fill
              className="object-cover md:object-contain lg:object-cover"
              sizes="100vw"
              priority={index === 0}
              style={{
                objectPosition: 'center center'
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50 z-[1]" />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm py-8 rounded-lg max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {content.hero.title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {content.hero.description}
          </p>
          <Link
            href="/uslugi/transport/cennik"
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
            {content.mainSections.map((section: MainSection, index: number) => (
              <div key={index} className="bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] rounded-lg shadow-lg p-8 mb-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#C62400]">{section.title}</h2>
                    <p className="text-lg leading-relaxed text-gray-700">
                      {section.description}
                    </p>
                  </div>
                  <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
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

            {/* Obszar działania */}
            <div className="bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] rounded-lg shadow-lg p-8 mb-16">
              <div className="grid gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#C62400]">{content.operatingArea.title}</h2>
                  <p className="text-lg leading-relaxed text-gray-700">
                    {content.operatingArea.description}
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    {content.operatingArea.areas.map((area: Area, index: number) => (
                      <li key={index} className="flex items-center">
                        <FontAwesomeIcon icon={getIconByName(area.icon)} className="text-[#C62400] w-5 h-5 mr-3" />
                        {area.text}
                      </li>
                    ))}
                  </ul>
                  <p className="text-lg leading-relaxed text-gray-700 mt-4">
                    {content.operatingArea.additionalInfo}
                  </p>
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
                href="/uslugi/transport/cennik"
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