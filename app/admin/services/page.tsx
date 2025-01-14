'use client';

import Link from 'next/link';

const services = [
  {
    id: 'pomoc-w-zakupie',
    title: 'Pomoc w zakupie motocykla',
    description: 'Edytuj zawartość strony pomocy w zakupie motocykla',
    sections: ['Hero', 'Main content', 'Co zawiera usługa', 'Informacje dla klientów', 'Sekcja zakupu zdalnego', 'CTA']
  },
  {
    id: 'serwis',
    title: 'Serwis motocykli',
    description: 'Edytuj zawartość strony serwisu motocyklowego',
    sections: ['Hero', 'Main content', 'Cennik', 'Galeria', 'CTA']
  },
  {
    id: 'transport',
    title: 'Transport motocykli',
    description: 'Edytuj zawartość strony transportu motocykli',
    sections: ['Hero', 'Main content', 'Cennik', 'FAQ', 'CTA']
  },
  {
    id: 'szkolenia',
    title: 'Szkolenia motocyklowe',
    description: 'Edytuj zawartość strony szkoleń motocyklowych',
    sections: ['Hero', 'Main content', 'Oferta szkoleń', 'Harmonogram', 'CTA']
  },
  {
    id: 'komis',
    title: 'Komis motocyklowy',
    description: 'Edytuj zawartość strony komisu motocyklowego',
    sections: ['Hero', 'Main content', 'Oferta', 'Procedura komisowa', 'CTA']
  }
];

export default function ServicesAdmin() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Wybierz stronę do edycji</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/admin/services/${service.id}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="mt-auto">
                <p className="text-sm text-gray-500 mb-2">Dostępne sekcje:</p>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {service.sections.map((section, index) => (
                    <li key={index}>{section}</li>
                  ))}
                </ul>
                <div className="mt-4 text-red-600 hover:text-red-700">
                  Edytuj →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 