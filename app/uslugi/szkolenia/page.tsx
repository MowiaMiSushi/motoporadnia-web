'use client';

import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Link from 'next/link';

const trainings = [
  {
    id: 'podstawowe',
    name: 'Szkolenie podstawowe',
    description: 'Idealne dla początkujących motocyklistów. Nauka podstawowych technik jazdy i bezpieczeństwa na drodze.',
    duration: '2 dni (16 godzin)',
    price: '1200 zł',
    includes: [
      'Teoria bezpiecznej jazdy',
      'Podstawowe manewry',
      'Techniki hamowania',
      'Jazda w ruchu miejskim',
      'Materiały szkoleniowe',
    ],
  },
  {
    id: 'zaawansowane',
    name: 'Szkolenie zaawansowane',
    description: 'Dla doświadczonych motocyklistów chcących podnieść swoje umiejętności.',
    duration: '2 dni (16 godzin)',
    price: '1500 zł',
    includes: [
      'Zaawansowane techniki jazdy',
      'Jazda w trudnych warunkach',
      'Techniki ratunkowe',
      'Jazda torowa',
      'Analiza nagrań wideo',
    ],
  },
  {
    id: 'indywidualne',
    name: 'Szkolenie indywidualne',
    description: 'Spersonalizowane szkolenie dostosowane do Twoich potrzeb i umiejętności.',
    duration: 'Do ustalenia',
    price: 'Od 800 zł',
    includes: [
      'Program dostosowany do potrzeb',
      'Elastyczne terminy',
      'Indywidualne podejście',
      'Konsultacje po szkoleniu',
      'Materiały szkoleniowe',
    ],
  },
];
{/* Sekcja dodawania dat */ }
const schedule = [
  {
    month: 'Styczeń 2025',
    dates: [
      { training: 'Szkolenie podstawowe', date: '09-10.01.2025' },
      { training: 'Szkolenie zaawansowane', date: '23-24.01.2025' },
    ],
  },
  {
    month: 'Luty 2025',
    dates: [
      { training: 'Szkolenie podstawowe', date: '13-14.02.2025' },
      { training: 'Szkolenie zaawansowane', date: '27-28.02.2025' },
    ],
  },
  {
    month: 'Maj 2025',
    dates: [
      { training: 'Szkolenie podstawowe', date: '11-12.05.2025' },
      { training: 'Szkolenie zaawansowane', date: '25-26.05.2025' },
    ],
  },
];

export default function Trainings() {
  return (
    <div className="animate-fadeIn">
      {/* Hero sekcja */}
      <section className="relative py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Szkolenia motocyklowe
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Profesjonalne szkolenia dla początkujących i zaawansowanych motocyklistów
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sekcja z ofertą szkoleń */}
      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nasza oferta</h2>
            <p className="text-gray-600">
              Wybierz szkolenie dopasowane do Twoich potrzeb i umiejętności
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {trainings.map((training, index) => (
              <motion.div
                key={training.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{training.name}</h3>
                  <p className="text-gray-600 mb-4">{training.description}</p>
                  <div className="mb-4">
                    <p className="font-semibold">Czas trwania: {training.duration}</p>
                    <p className="font-bold text-xl text-[#C62400]">{training.price}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold">W cenie:</p>
                    <ul className="space-y-2">
                      {training.includes.map((item, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <span className="mr-2">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sekcja z harmonogramem */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Harmonogram szkoleń</h2>
            <p className="text-gray-600">
              Sprawdź dostępne terminy i zarezerwuj miejsce
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {schedule.map((month, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-8"
              >
                <h3 className="text-xl font-bold mb-4">{month.month}</h3>
                <div className="bg-gray-100 rounded-lg shadow-sm overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    {month.dates.map((date, i) => (
                      <div key={i} className="p-4 flex justify-between items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100">
                        <div>
                          <p className="font-semibold text-lg text-gray-800">{date.training}</p>
                          <p className="text-gray-600 mt-1">{date.date}</p>
                        </div>
                        <Link
                          href="/kontakt"
                          className="inline-block bg-[#C62400] hover:bg-[#A01D00] text-white px-6 py-2.5 rounded-lg transition-colors shadow-md hover:shadow-lg font-medium whitespace-nowrap min-w-[120px] text-center"
                        >
                          Zapisz się
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Gotowy na nowe wyzwania?
          </h2>
          <p className="text-xl mb-8 text-black/90">
            Skontaktuj się z nami i rozpocznij swoją przygodę z motocyklami
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:789059578"
            className="btn-primary bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors"
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