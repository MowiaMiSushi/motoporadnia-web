'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHandshake, faFileContract, faMoneyBillWave, faCamera, faListCheck, faPhone, faEnvelope, faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const platforms = [
  {
    name: 'OtoMoto',
    description: 'Największa platforma ogłoszeń motoryzacyjnych w Polsce',
    url: 'https://www.otomoto.pl/',
    icon: faMotorcycle,
  },
  {
    name: 'OLX',
    description: 'Popularna platforma ogłoszeniowa z szerokim wyborem motocykli',
    url: 'https://www.olx.pl/',
    icon: faMotorcycle,
  },
  {
    name: 'Facebook',
    description: 'Społecznościowa platforma ogłoszeniowa',
    url: 'https://www.facebook.com/motoporadnia/?locale=pl_PL',
    icon: faFacebook,
  },
  {
    name: 'Instagram',
    description: 'Śledź nasze najnowsze ogłoszenia na Instagramie',
    url: 'https://www.instagram.com/motoporadnia/',
    icon: faInstagram,
  },
];

const rules = [
  {
    title: 'Profesjonalna wycena',
    description: 'Oferujemy bezpłatną, profesjonalną wycenę Twojego motocykla.',
  },
  {
    title: 'Kompleksowa obsługa',
    description: 'Zajmujemy się wszystkimi formalnościami związanymi ze sprzedażą.',
  },
  {
    title: 'Uczciwe warunki',
    description: 'Jasne i przejrzyste zasady współpracy oraz konkurencyjne prowizje.',
  },
  {
    title: 'Szeroki zasięg',
    description: 'Publikujemy ogłoszenia na wszystkich głównych platformach sprzedażowych.',
  },
  {
    title: 'Bezpieczeństwo transakcji',
    description: 'Gwarantujemy bezpieczną i legalną transakcję.',
  },
  {
    title: 'Profesjonalna prezentacja',
    description: 'Wykonujemy profesjonalne zdjęcia i przygotowujemy atrakcyjne ogłoszenia.',
  },
];

const steps = [
  {
    title: "Wstępna wycena",
    description: "Na podstawie przesłanych zdjęć i opisu dokonujemy wstępnej wyceny motocykla.",
    icon: faSearch
  },
  {
    title: "Oględziny",
    description: "Umawiamy się na spotkanie, podczas którego dokładnie sprawdzamy stan techniczny pojazdu.",
    icon: faListCheck
  },
  {
    title: "Dokumentacja fotograficzna",
    description: "Wykonujemy profesjonalne zdjęcia motocykla do ogłoszenia.",
    icon: faCamera
  },
  {
    title: "Umowa komisu",
    description: "Podpisujemy umowę komisową, ustalając warunki sprzedaży.",
    icon: faFileContract
  },
  {
    title: "Wystawienie ogłoszenia",
    description: "Przygotowujemy atrakcyjne ogłoszenie i publikujemy je na popularnych portalach.",
    icon: faHandshake
  },
  {
    title: "Finalizacja sprzedaży",
    description: "Po znalezieniu kupca finalizujemy transakcję i wypłacamy środki.",
    icon: faMoneyBillWave
  }
];

const heroImages = [
  '/images/komis_1.jpg',
  '/images/hero-bg_1.jpg',
  '/images/hero-bg_2.jpg',
];

export default function Komis() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-fadeIn">
      {/* Hero section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-black" aria-label="Baner główny">
        <div className="absolute inset-0 bg-black/50 z-0" />
        {heroImages.map((image, index) => (
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
              Komis motocyklowy
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Profesjonalna pomoc w sprzedaży i zakupie motocykla. 
              Sprawdzamy stan techniczny i dokumentację każdego pojazdu.
            </p>
            <Link
              href="#platforms"
              className="inline-flex items-center text-white font-semibold bg-[#C62400] hover:bg-[#A01D00] px-8 py-3 rounded-lg transition-colors"
              aria-label="Zobacz nasze ogłoszenia"
            >
              Zobacz nasze ogłoszenia
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
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
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform cursor-pointer border border-gray-100 group"
              >
                <div className="w-12 h-12 bg-[#000000] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#A01D00] transition-colors duration-300">
                  <FontAwesomeIcon icon={step.icon} className="text-white text-xl" />
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
            {platforms.map((platform, index) => (
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
                  <FontAwesomeIcon icon={platform.icon} className="w-10 h-10" />
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
            Chcesz sprzedać lub kupić motocykl?
          </h2>
          <p className="text-xl mb-8 text-black/90">
            Skontaktuj się z nami i skorzystaj z naszego doświadczenia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:789059578"
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