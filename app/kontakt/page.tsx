'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import { contactData as defaultContent } from './data';

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  contactInfo: {
    address: {
      street: string;
      city: string;
      postalCode: string;
      additionalInfo: string;
      mapsUrl: string;
      coordinates: {
        latitude: number;
        longitude: number;
      };
    };
    phone: string;
    email: string;
    hours: {
      weekdays: string;
      weekend: string;
    };
  };
  social: {
    platforms: Array<{
      name: string;
      url: string;
      icon: string;
    }>;
  };
  seo: {
    type: string;
    name: string;
    priceRange: string;
  };
}

export default function Contact() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [content, setContent] = useState<PageContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/contact');
        if (response.ok) {
          const data = await response.json();
          setContent(data || defaultContent);
        } else {
          setContent(defaultContent);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        setContent(defaultContent);
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

  useEffect(() => {
    if (content?.seo) {
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': content.seo.type,
        name: content.seo.name,
        image: content.hero.images[0],
        '@id': 'https://motoporadnia.pl',
        url: 'https://motoporadnia.pl',
        telephone: content.contactInfo.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: content.contactInfo.address.street,
          addressLocality: content.contactInfo.address.city,
          postalCode: content.contactInfo.address.postalCode,
          addressCountry: 'PL'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: content.contactInfo.address.coordinates.latitude,
          longitude: content.contactInfo.address.coordinates.longitude
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
        priceRange: content.seo.priceRange
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [content]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-black" aria-label="Baner główny">
        {content.hero.images.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: currentImageIndex === index ? 1 : 0
            }}
          >
            <Image
              src={image}
              alt="Zdjęcie siedziby MotoPoradni"
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
              quality={100}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50 z-[1]" />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-8 rounded-lg max-w-4xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {content.hero.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              {content.hero.description}
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
                        {content.contactInfo.address.street}
                        <br />
                        {content.contactInfo.address.postalCode} {content.contactInfo.address.city}
                        <br />
                        <span className="text-xs sm:text-sm">{content.contactInfo.address.additionalInfo}</span>
                      </p>
                      <a
                        href={content.contactInfo.address.mapsUrl}
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
                        href={`tel:${content.contactInfo.phone}`}
                        className="text-sm sm:text-base text-gray-600 hover:text-[#C62400] transition-colors"
                      >
                        {content.contactInfo.phone}
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
                        href={`mailto:${content.contactInfo.email}`}
                        className="text-sm sm:text-base text-gray-600 hover:text-[#C62400] transition-colors break-all"
                      >
                        {content.contactInfo.email}
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
                        <p>Poniedziałek - Piątek: {content.contactInfo.hours.weekdays}</p>
                        <p>Sobota - Niedziela: {content.contactInfo.hours.weekend}</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#2C3E50] rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faFacebook} className="text-white text-lg sm:text-xl" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Social Media</h3>
                      <div className="flex space-x-4">
                        {content.social.platforms.map((platform) => (
                          <a
                            key={platform.name}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-[#C62400] transition-colors"
                          >
                            <FontAwesomeIcon 
                              icon={
                                platform.icon === 'faFacebook' ? faFacebook :
                                platform.icon === 'faInstagram' ? faInstagram :
                                platform.icon === 'faYoutube' ? faYoutube :
                                faFacebook
                              } 
                              className="text-2xl" 
                            />
                          </a>
                        ))}
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
                      src="/images/dojazd.webp"
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2433.8413872414395!2d16.869772376940437!3d52.38206317978576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47045b3af3a8f6ef%3A0x7ca4997b0b2f5f1b!2sMotoPoradnia!5e0!3m2!1spl!2spl!4v1689612341020!5m2!1spl!2spl"
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