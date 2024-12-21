'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

const contactInfo = {
  address: 'ul. Węglowa 9/11, 60-122 Poznań',
  mapsUrl: 'https://www.google.com/maps/place/Motoporadnia/@52.3820632,16.8732338,17z/data=!4m6!3m5!1s0x6b3a30447fea247d:0xfebbfd65d6023f50!8m2!3d52.3816215!4d16.8719611!16s%2Fg%2F11rylcfqmv',
  phone: '+48 789 059 578',
  email: 'kontakt@motoporadnia.pl',
  hours: {
    weekdays: '8:30 - 16:30',
    sunday: 'Zamknięte',
  },
  social: {
    facebook: 'https://facebook.com/motoporadnia',
    instagram: 'https://instagram.com/motoporadnia',
  },
};

const heroImages = [
  '/images/DSC_6044.jpg',
  '/images/hero-bg_1.jpg',
  '/images/hero-bg_2.jpg',
  '/images/hero-bg_3.png',
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MotorcycleRepair',
  name: 'MotoPoradnia',
  image: '/images/DSC_6044.jpg',
  '@id': 'https://motoporadnia.pl',
  url: 'https://motoporadnia.pl',
  telephone: '+48789059578',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ul. Węglowa 9/11',
    addressLocality: 'Poznań',
    postalCode: '60-122',
    addressCountry: 'PL'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 52.38206317978576,
    longitude: 16.869772376940437
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday'
    ],
    opens: '08:30',
    closes: '16:30'
  },
  priceRange: '$$'
};

export default function Contact() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-black" aria-label="Baner główny">
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
            aria-label="Zdjęcie siedziby MotoPoradni w tle"
          />
        ))}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 z-[1]"
          aria-hidden="true"
        />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-8 rounded-lg max-w-4xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Kontakt
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Jesteśmy do Twojej dyspozycji. Skontaktuj się z nami w dogodny dla Ciebie sposób.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-8 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-12">
              {/* Lewa kolumna - Informacje kontaktowe */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-4 sm:p-8"
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-gray-800">Informacje kontaktowe</h2>
                <div className="space-y-6 sm:space-y-8">
                  {/* Adres */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#2C3E50] rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white text-lg sm:text-xl" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Adres</h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        {contactInfo.address}
                        <br />
                        <span className="text-xs sm:text-sm">(Wjazd od ulicy Górniczej)</span>
                      </p>
                      <a
                        href={contactInfo.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm sm:text-base text-[#C62400] hover:text-[#A01D00] transition-colors"
                      >
                        Zobacz na mapie
                      </a>
                    </div>
                  </div>

                  {/* Telefon */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#2C3E50] rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faPhone} className="text-white text-lg sm:text-xl" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Telefon</h3>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-sm sm:text-base text-gray-600 hover:text-[#C62400] transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#2C3E50] rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faEnvelope} className="text-white text-lg sm:text-xl" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Email</h3>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-sm sm:text-base text-gray-600 hover:text-[#C62400] transition-colors break-all"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Godziny otwarcia */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#2C3E50] rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faClock} className="text-white text-lg sm:text-xl" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Godziny otwarcia</h3>
                      <div className="space-y-1 text-sm sm:text-base text-gray-600">
                        <p>Poniedziałek - Piątek: {contactInfo.hours.weekdays}</p>
                        <p>Sobota - Niedziela: {contactInfo.hours.sunday}</p>
                      </div>
                    </div>
                  </div>

                  {/* Media społecznościowe */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#2C3E50] rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faFacebook} className="text-white text-lg sm:text-xl" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Media społecznościowe</h3>
                      <div className="flex flex-wrap gap-4">
                        <a
                          href={contactInfo.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm sm:text-base text-gray-600 hover:text-[#1877F2] transition-colors"
                        >
                          <FontAwesomeIcon icon={faFacebook} className="mr-2" />
                          Facebook
                        </a>
                        <a
                          href={contactInfo.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm sm:text-base text-gray-600 hover:text-[#E4405F] transition-colors"
                        >
                          <FontAwesomeIcon icon={faInstagram} className="mr-2" />
                          Instagram
                        </a>
                        <a
                          href="https://www.youtube.com/@motoporadnia"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm sm:text-base text-gray-600 hover:text-[#ff0000] transition-colors"
                        >
                          <FontAwesomeIcon icon={faYoutube} className="mr-2" />
                          Youtube
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Prawa kolumna - Mapa i zdjęcie dojazdu */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Zdjęcie dojazdu */}
                <div
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => setIsImageModalOpen(true)}
                >
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src="/images/dojazd.jpg"
                      alt="Szczegóły dojazdu"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="bg-black/70 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm text-center">
                        Kliknij aby zobaczyć szczegóły dojazdu
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mapa Google */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[300px] sm:h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2433.8734143191584!2d16.869772376940437!3d52.38206317978576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b3a30447fea247d%3A0xfebbfd65d6023f50!2sMotoporadnia!5e0!3m2!1spl!2spl!4v1704906411209!5m2!1spl!2spl"
                    width="100%"
                    height="100%"
                    title="Lokalizacja MotoPoradni na mapie Google"
                    aria-label="Mapa pokazująca lokalizację serwisu MotoPoradnia w Poznaniu"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] text-black shadow-2xl border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Potrzebujesz pomocy?</h2>
            <div className="text-xl mb-8">
              Skontaktuj się z nami telefonicznie lub napisz do nas. <br />
              Doradzimy i pomożemy w doborze odpowiedniego zakresu usług.
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${contactInfo.phone}`}
                className="btn-primary bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Zadzwoń teraz
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="btn-secondary bg-white/10 hover:bg-white/20 text-black px-8 py-3 rounded-lg transition-colors hover:shadow-lg hover:bg-grey-100"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Napisz do nas
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal ze zdjęciem */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="relative w-full max-w-4xl aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/dojazd.jpg"
              alt="Mapa dojazdu"
              fill
              className="object-contain"
              quality={100}
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white text-xl hover:text-gray-300"
            onClick={() => setIsImageModalOpen(false)}
            aria-label="Zamknij"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
} 