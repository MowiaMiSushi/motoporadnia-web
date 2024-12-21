'use client';

import { useState, useEffect } from 'react';
import { faPhone, faEnvelope, faCalendar, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const heroImages = [
  '/images/szkolenia_1.jpg',
  '/images/szkolenia_2.jpeg',
  '/images/szkolenia_3.jpg',
];

const trainings = [
  {
    id: 'tor-bydgoszcz',
    name: 'Szkolenie na torze Bydgoszcz',
    description: 'Profesjonalne szkolenie na jednym z najlepszych torów w Polsce. Poznaj techniki jazdy torowej i popraw swoje umiejętności pod okiem doświadczonych instruktorów.',
    includes: [
      'Teoria jazdy torowej',
      'Techniki pokonywania zakrętów',
      'Pozycja na motocyklu',
      'Analiza telemetrii',
      'Materiały szkoleniowe',
    ],
  },
  {
    id: 'tor-kisielin',
    name: 'Szkolenie na torze Stary Kisielin',
    description: 'Szkolenie na technicznym torze w Starym Kisielinie. Idealne miejsce do nauki precyzyjnej jazdy i doskonalenia techniki.',
    includes: [
      'Teoria jazdy torowej',
      'Dobór linii przejazdu',
      'Techniki hamowania',
      'Praca z gazem',
      'Analiza przejazdów',
    ],
  }
];

const events = [
  {
    id: 1,
    title: 'Szkolenie Bydgoszcz - Kwiecień 2025',
    date: '12-13.04.2025',
    location: 'Tor Bydgoszcz',
    fbEvent: 'https://facebook.com/events/123',
    description: 'Dwudniowe szkolenie na torze w Bydgoszczy. Grupa początkująca i średniozaawansowana.',
  },
  {
    id: 2,
    title: 'Szkolenie Stary Kisielin - Maj 2025',
    date: '18-19.05.2025',
    location: 'Tor Stary Kisielin',
    fbEvent: 'https://facebook.com/events/124',
    description: 'Intensywne szkolenie dla wszystkich poziomów zaawansowania.',
  },
  {
    id: 3,
    title: 'Szkolenie Bydgoszcz - Czerwiec 2025',
    date: '15-16.06.2025',
    location: 'Tor Bydgoszcz',
    fbEvent: 'https://facebook.com/events/125',
    description: 'Szkolenie zaawansowane z analizą telemetrii.',
  },
  {
    id: 4,
    title: 'Szkolenie Stary Kisielin - Lipiec 2025',
    date: '20-21.07.2025',
    location: 'Tor Stary Kisielin',
    fbEvent: 'https://facebook.com/events/126',
    description: 'Szkolenie dla początkujących i średniozaawansowanych.',
  },
  {
    id: 5,
    title: 'Szkolenie Bydgoszcz - Sierpień 2025',
    date: '17-18.08.2025',
    location: 'Tor Bydgoszcz',
    fbEvent: 'https://facebook.com/events/127',
    description: 'Ostatnie letnie szkolenie na torze w Bydgoszczy.',
  }
];

export default function Trainings() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="animate-fadeIn">
      {/* Hero sekcja */}
      <section className="relative h-[60vh] flex items-center justify-center" aria-label="Baner główny">
        <div className="absolute inset-0 bg-black/50 z-10" />
        {heroImages.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${image}')`,
              opacity: currentImageIndex === index ? 1 : 0,
            }}
            role="img"
            aria-label="Zdjęcie ze szkolenia motocyklowego"
          />
        ))}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Szkolenia motocyklowe na torze
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Profesjonalne szkolenia na najlepszych torach w Polsce.
              Rozwijaj swoje umiejętności pod okiem doświadczonych instruktorów.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#harmonogram"
                className="inline-block bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg font-medium"
                aria-label="Przejdź do harmonogramu szkoleń"
              >
                Zobacz terminy szkoleń
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sekcja z ofertą szkoleń */}
      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] text-black" aria-labelledby="tory-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 id="tory-heading" className="text-3xl font-bold mb-4">Nasze tory</h2>
            <p className="text-gray-600">
              Szkolimy na najlepszych torach w Polsce
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {trainings.map((training, index) => (
              <motion.article
                key={training.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{training.name}</h3>
                  <p className="text-gray-600 mb-4">{training.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Program szkolenia:</h4>
                    <ul className="space-y-2" role="list">
                      {training.includes.map((item, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <span className="mr-2 text-[#C62400]" aria-hidden="true">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Sekcja z harmonogramem */}
      <section id="harmonogram" className="py-16 bg-white" aria-labelledby="harmonogram-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 id="harmonogram-heading" className="text-3xl font-bold mb-4">Harmonogram szkoleń 2025</h2>
            <p className="text-gray-600">
              Zapisz się na najbliższy termin
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {events.map((event, index) => (
                <motion.article
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                        <div className="mt-2 space-y-1">
                          <p className="text-gray-600">
                            <FontAwesomeIcon icon={faCalendar} className="mr-2" aria-hidden="true" />
                            <time dateTime={event.date.replace('.', '-')}>{event.date}</time>
                          </p>
                          <p className="text-gray-600">{event.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 min-w-[200px]">
                        <a
                          href={event.fbEvent}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg font-medium"
                          aria-label={`Dowiedz się więcej o szkoleniu ${event.title}`}
                        >
                          <FontAwesomeIcon icon={faFacebook} className="mr-2" aria-hidden="true" />
                          Dowiedz się więcej
                        </a>
                        <Link
                          href="/kontakt"
                          className="inline-flex items-center justify-center px-4 py-2 bg-[#C62400] hover:bg-[#A01D00] text-white rounded-lg transition-colors shadow-md hover:shadow-lg font-medium"
                          aria-label={`Umów się na szkolenie ${event.title}`}
                        >
                          <FontAwesomeIcon icon={faPhone} className="mr-2" aria-hidden="true" />
                          Umów się
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] text-black" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-3xl font-bold mb-6">
            Gotowy na nowe wyzwania?
          </h2>
          <p className="text-xl mb-8 text-black/90">
            Skontaktuj się z nami i rozpocznij swoją przygodę z jazdą torową
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:789059578"
              className="btn-primary bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors"
              aria-label="Zadzwoń do nas"
            >
              <FontAwesomeIcon icon={faPhone} className="mr-2" aria-hidden="true" />
              Zadzwoń teraz
            </a>
            <Link
              href="/kontakt"
              className="btn-secondary bg-white hover:bg-gray-50 text-black px-8 py-3 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
              aria-label="Przejdź do formularza kontaktowego"
            >
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" aria-hidden="true" />
              Napisz do nas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 