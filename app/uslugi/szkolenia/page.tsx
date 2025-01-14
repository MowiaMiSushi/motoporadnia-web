'use client';

import { useState, useEffect } from 'react';
import { faPhone, faCalendar, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

interface Training {
  id: string;
  name: string;
  description: string;
  includes: string[];
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  fbEvent: string;
  description: string;
}

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  trainings: Training[];
  events: Event[];
  cta: {
    title: string;
    description: string;
    phoneNumber: string;
  };
  schedule: {
    title: string;
    subtitle: string;
  };
}

export default function Trainings() {
  const [content, setContent] = useState<PageContent | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/services/szkolenia');
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
      }, 5000);

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
    <main className="animate-fadeIn">
      {/* Hero sekcja */}
      <section className="relative h-[80vh] flex items-center justify-center bg-black" aria-label="Baner główny">
        <div className="absolute inset-0 bg-black/50 z-10" />
        {content.hero.images.map((image, index) => (
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
              {content.hero.title}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {content.hero.description}
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
            {content.trainings.map((training, index) => (
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
            <h2 id="harmonogram-heading" className="text-3xl font-bold mb-4">{content.schedule.title}</h2>
            <p className="text-gray-600">
              {content.schedule.subtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {content.events.map((event, index) => (
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
            {content.cta.title}
          </h2>
          <p className="text-xl mb-8 text-black/90">
            {content.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${content.cta.phoneNumber}`}
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