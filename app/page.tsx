'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faTruck, faHandshake, faGraduationCap, faMotorcycle, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const heroImages = [
  '/images/hero-bg_1.jpg',
  '/images/hero-bg_2.jpg',
  '/images/hero-bg_3.png',
];

export default function Home() {
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
    <main className="animate-fadeIn">
      {/* Hero section */}
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
            aria-label="Zdjęcie motocykla w tle"
          />
        ))}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 z-[1]" 
          aria-hidden="true"
        />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-8 rounded-lg max-w-4xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              MotoPoradnia
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8">
              Fachowa pomoc przy zakupie, transporcie i serwisie motocykli jest to firma, stworzona przez ludzi, którzy nie wyobrażają sobie otaczającego ich świata bez jednośladów.
            </p>
            <Link
              href="/o-nas"
              className="inline-flex items-center text-white font-semibold hover:text-[#fff] transition-colors duration-200 bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors"
              aria-label="Przejdź do strony O nas"
            >
              Dowiedz się więcej o nas
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Sekcja usług */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] text-black shadow-2xl border-t border-white/10" aria-labelledby="services-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Nasze usługi
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Pomoc w zakupie */}
            <article className="bg-[#F3F3F3] rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-[#C62400] mb-6" aria-hidden="true">
                <FontAwesomeIcon icon={faHandshake} className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Pomoc w zakupie Motocykla</h3>
              <p className="text-gray-600 mb-6">
                Pomagamy w wyborze i zakupie motocykla. Sprawdzamy stan techniczny i dokumentację. Doradzamy w wyborze motocykla sprawdzając wszystkie dostępne oferty.
              </p>
              <Link href="/uslugi/pomoc-w-zakupie" className="text-[#C62400] font-semibold hover:text-[#A51D00] transition-colors duration-200" aria-label="Dowiedz się więcej o pomocy w zakupie motocykla">
                Zobacz szczegóły →
              </Link>
            </article>

            {/* Serwis */}
            <article className="bg-[#F3F3F3] rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-[#C62400] mb-6" aria-hidden="true">
                <FontAwesomeIcon icon={faWrench} className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Serwis motocykli</h3>
              <p className="text-gray-600 mb-6">
                Profesjonalny serwis motocyklowy. Wykonujemy przeglądy, naprawy i modyfikacje.
              </p>
              <Link href="/uslugi/serwis" className="text-[#C62400] font-semibold hover:text-[#A51D00] transition-colors duration-200" aria-label="Dowiedz się więcej o serwisie motocykli">
                Dowiedz się więcej →
              </Link>
            </article>

            {/* Transport */}
            <article className="bg-[#F3F3F3] rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-[#C62400] mb-6" aria-hidden="true">
                <FontAwesomeIcon icon={faTruck} className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Transport motocykli</h3>
              <p className="text-gray-600 mb-6">
                Bezpieczny transport motocykli na terenie Poznania i okolic.
              </p>
              <Link href="/uslugi/transport" className="text-[#C62400] font-semibold hover:text-[#A51D00] transition-colors duration-200" aria-label="Sprawdź ofertę transportu motocykli">
                Sprawdź ofertę →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Sekcja dodatkowa */}
      <section className="py-16 sm:py-24 bg-[#ffffff]" aria-labelledby="additional-services-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="additional-services-heading" className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Dodatkowo oferujemy
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {/* Komis */}
            <article className="bg-gray-100 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-[#C62400] mb-6" aria-hidden="true">
                <FontAwesomeIcon icon={faMotorcycle} className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Komis motocyklowy</h3>
              <p className="text-gray-600 mb-6">
                W naszym komisie znajdziesz szeroki wybór sprawdzonych jednośladów.
                Pomagamy w wyborze i załatwiamy wszystkie formalności.
              </p>
              <Link href="/komis" className="text-[#C62400] font-semibold hover:text-[#A51D00] transition-colors duration-200" aria-label="Zobacz ofertę komisu motocyklowego">
                Zobacz ofertę →
              </Link>
            </article>

            {/* Szkolenia */}
            <article className="bg-gray-100 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-[#C62400] mb-6" aria-hidden="true">
                <FontAwesomeIcon icon={faGraduationCap} className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Szkolenia motocyklowe</h3>
              <p className="text-gray-600 mb-6">
                Oferujemy profesjonalne szkolenia motocyklowe dla początkujących i zaawansowanych.
                Nasi instruktorzy pomogą Ci rozwinąć umiejętności i pewność siebie na motocyklu.
              </p>
              <Link href="/szkolenia" className="text-[#C62400] font-semibold hover:text-[#A51D00] transition-colors duration-200" aria-label="Dowiedz się więcej o szkoleniach motocyklowych">
                Dowiedz się więcej →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Panel reklamowy z filmem */}
      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Film promocyjny o nas</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg bg-black">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/6KlCvhyna94"
                title="Film promocyjny"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] text-black shadow-2xl border-t border-white/10" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold mb-6">
            Potrzebujesz pomocy z motocyklem?
          </h2>
          <p className="text-xl mb-8 text-black/90">
            Skontaktuj się z nami i dowiedz się więcej o naszych usługach
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:789059578"
              className="btn-primary bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              aria-label="Zadzwoń do nas"
            >
              <FontAwesomeIcon icon={faPhone} className="mr-2" aria-hidden="true" />
              Zadzwoń teraz
            </a>
            <Link
              href="/kontakt"
              className="btn-secondary bg-white/10 hover:bg-white/20 text-black px-8 py-3 rounded-lg transition-colors hover:shadow-lg hover:bg-grey-100"
              aria-label="Przejdź do strony kontaktowej"
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