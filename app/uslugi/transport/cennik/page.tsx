'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faRoute, faMapMarkedAlt, faHandshake, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function TransportPricingPage() {
  const pricingCategories = [
    {
      title: 'Transport lokalny',
      icon: faTruck,
      description: 'Transport na terenie Poznania i okolic',
      items: [
        { name: 'Transport w granicach miasta Poznań', price: 'od 150 zł' },
        { name: 'Transport do 30 km od Poznania', price: 'od 200 zł' },
        { name: 'Transport do 50 km od Poznania', price: 'od 250 zł' },
      ]
    },
    {
      title: 'Transport krajowy',
      icon: faRoute,
      description: 'Transport na terenie całej Polski',
      items: [
        { name: 'Transport do 100 km', price: 'od 350 zł' },
        { name: 'Transport do 200 km', price: 'od 500 zł' },
        { name: 'Transport powyżej 200 km', price: '2,5 zł/km' },
      ]
    },
    {
      title: 'Usługi dodatkowe',
      icon: faHandshake,
      description: 'Dodatkowe usługi transportowe',
      items: [
        { name: 'Pomoc przy załadunku/rozładunku', price: 'od 50 zł' },
        { name: 'Zabezpieczenie motocykla', price: 'w cenie' },
        { name: 'Ubezpieczenie transportu', price: 'w cenie' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <section className="relative bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Cennik transportu motocykli
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferujemy profesjonalny transport motocykli w konkurencyjnych cenach. 
              Wszystkie ceny są orientacyjne i mogą się różnić w zależności od specyfiki zlecenia.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingCategories.map((category, index) => (
              <div
                key={category.title}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="text-[#C62400] mb-4">
                    <FontAwesomeIcon icon={category.icon} className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex justify-between items-center border-b border-gray-100 pb-2"
                      >
                        <span className="text-gray-700">{item.name}</span>
                        <span className="text-[#C62400] font-semibold">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Potrzebujesz pomocy w transportie?</h2>
            <p className="text-xl mb-8 text-gray-600">
              Skontaktuj się z nami, aby omówić szczegóły i umówić transport motocykla.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:789059578"
                className="bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Zadzwoń teraz
              </a>
              <a
                href="/kontakt"
                className="bg-white text-gray-900 px-8 py-3 rounded-lg transition-colors inline-flex items-center justify-center hover:bg-gray-50 border border-gray-200"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Napisz do nas
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 