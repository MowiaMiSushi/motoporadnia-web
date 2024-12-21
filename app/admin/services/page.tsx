'use client';

import Link from 'next/link';

const services = [
  {
    id: 'pomoc-w-zakupie',
    title: 'Pomoc w zakupie motocykla',
    description: 'Profesjonalne wsparcie przy zakupie motocykla, ocena stanu technicznego i weryfikacja historii.'
  },
  {
    id: 'serwis',
    title: 'Serwis motocykli',
    description: 'Kompleksowy serwis motocykli, naprawy, przeglądy i diagnostyka.'
  },
  {
    id: 'transport',
    title: 'Transport motocykli',
    description: 'Bezpieczny transport motocykli na terenie całego kraju.'
  },
  {
    id: 'komis',
    title: 'Komis motocyklowy',
    description: 'Sprzedaż i skup motocykli używanych.'
  },
  {
    id: 'szkolenia',
    title: 'Szkolenia motocyklowe',
    description: 'Szkolenia z techniki jazdy i bezpieczeństwa na drodze.'
  }
];

export default function ServicesAdmin() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Zarządzanie usługami</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/admin/services/${service.id}`}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-600">{service.description}</p>
            <div className="mt-4">
              <span className="text-red-600 hover:text-red-700">
                Edytuj treść →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 