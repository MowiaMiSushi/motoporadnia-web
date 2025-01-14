'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faTruck, faHandshake, faGraduationCap, faMotorcycle, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface HomePageContent {
  hero: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    images: string[];
  };
  services: {
    title: string;
    services: Array<{
      icon: string;
      title: string;
      description: string;
      link: string;
      linkText: string;
    }>;
  };
  additional: {
    title: string;
    services: Array<{
      icon: string;
      title: string;
      description: string;
      link: string;
      linkText: string;
    }>;
  };
  promo: {
    title: string;
    videoUrl: string;
  };
  cta: {
    title: string;
    description: string;
    primaryButton: {
      text: string;
      link: string;
    };
    secondaryButton: {
      text: string;
      link: string;
    };
  };
}

const defaultContent: HomePageContent = {
  hero: {
    title: 'MotoPoradnia',
    description: 'Fachowa pomoc przy zakupie, transporcie i serwisie motocykli jest to firma, stworzona przez ludzi, którzy nie wyobrażają sobie otaczającego ich świata bez jednośladów.',
    buttonText: 'Dowiedz się więcej o nas',
    buttonLink: '/o-nas',
    images: ['/images/hero-bg_1.webp', '/images/hero-bg_2.webp', '/images/hero-bg_3.webp']
  },
  services: {
    title: 'Nasze usługi',
    services: [
      {
        icon: 'faHandshake',
        title: 'Pomoc w zakupie Motocykla',
        description: 'Pomagamy w wyborze i zakupie motocykla. Sprawdzamy stan techniczny i dokumentację. Doradzamy w wyborze motocykla sprawdzając wszystkie dostępne oferty.',
        link: '/uslugi/pomoc-w-zakupie',
        linkText: 'Zobacz szczegóły'
      },
      {
        icon: 'faWrench',
        title: 'Serwis motocykli',
        description: 'Profesjonalny serwis motocyklowy. Wykonujemy przeglądy, naprawy i modyfikacje.',
        link: '/uslugi/serwis',
        linkText: 'Dowiedz się więcej'
      },
      {
        icon: 'faTruck',
        title: 'Transport motocykli',
        description: 'Bezpieczny transport motocykli na terenie Poznania i okolic.',
        link: '/uslugi/transport',
        linkText: 'Sprawdź ofertę'
      }
    ]
  },
  additional: {
    title: 'Dodatkowo oferujemy',
    services: [
      {
        icon: 'faMotorcycle',
        title: 'Komis motocyklowy',
        description: 'W naszym komisie znajdziesz szeroki wybór sprawdzonych jednośladów. Pomagamy w wyborze i załatwiamy wszystkie formalności.',
        link: '/komis',
        linkText: 'Zobacz ofertę'
      },
      {
        icon: 'faGraduationCap',
        title: 'Szkolenia motocyklowe',
        description: 'Oferujemy profesjonalne szkolenia motocyklowe dla początkujących i zaawansowanych. Nasi instruktorzy pomogą Ci rozwinąć umiejętności i pewność siebie na motocyklu.',
        link: '/szkolenia',
        linkText: 'Dowiedz się więcej'
      }
    ]
  },
  promo: {
    title: 'Film promocyjny o nas',
    videoUrl: 'https://www.youtube.com/embed/6KlCvhyna94'
  },
  cta: {
    title: 'Potrzebujesz pomocy z motocyklem?',
    description: 'Skontaktuj się z nami i dowiedz się więcej o naszych usługach',
    primaryButton: {
      text: 'Zadzwoń teraz',
      link: 'tel:789059578'
    },
    secondaryButton: {
      text: 'Napisz do nas',
      link: '/kontakt'
    }
  }
};

const iconMap = {
  faHandshake,
  faWrench,
  faTruck,
  faMotorcycle,
  faGraduationCap
};

export default function Home() {
  const [content, setContent] = useState<HomePageContent>(defaultContent);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/home', {
          cache: 'no-store',
          next: { revalidate: 30 }
        });
        if (response.ok) {
          const data = await response.json();
          if (Object.keys(data).length > 0) {
            setContent(data);
          }
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();

    // Rewalidacja co 30 sekund
    const interval = setInterval(() => {
      router.refresh();
    }, 30000);

    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === content.hero.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [content.hero.images.length]);

  return (
    <main className="animate-fadeIn">
      {/* Hero section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-black" aria-label="Baner gówny">
        <div className="absolute inset-0 bg-black/50 z-0" />
        {content.hero.images.map((image, index) => (
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
              {content.hero.title}
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8">
              {content.hero.description}
            </p>
            <Link
              href={content.hero.buttonLink}
              className="inline-flex items-center text-white font-semibold hover:text-[#fff] transition-colors duration-200 bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors"
              aria-label="Przejdź do strony O nas"
            >
              {content.hero.buttonText}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Panel reklamowy z filmem */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">{content.promo.title}</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
              {!isVideoLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
              <iframe
                src="https://www.youtube-nocookie.com/embed/6KlCvhyna94"
                title="Film promocyjny"
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
                  isVideoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                onLoad={() => setIsVideoLoaded(true)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja usług */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] text-black shadow-2xl border-t border-white/10" aria-labelledby="services-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold text-center mb-12">
            {content.services.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.services.services.map((service, index) => (
              <article key={index} className="bg-[#F3F3F3] rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-[#C62400] mb-6" aria-hidden="true">
                  <FontAwesomeIcon icon={iconMap[service.icon as keyof typeof iconMap]} className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <Link href={service.link} className="text-[#C62400] font-semibold hover:text-[#A51D00] transition-colors duration-200">
                  {service.linkText} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sekcja dodatkowa */}
      <section className="py-16 sm:py-24 bg-[#ffffff]" aria-labelledby="additional-services-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="additional-services-heading" className="text-3xl sm:text-4xl font-bold text-center mb-12">
            {content.additional.title}
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {content.additional.services.map((service, index) => (
              <article key={index} className="bg-gray-100 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-[#C62400] mb-6" aria-hidden="true">
                  <FontAwesomeIcon icon={iconMap[service.icon as keyof typeof iconMap]} className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <Link href={service.link} className="text-[#C62400] font-semibold hover:text-[#A51D00] transition-colors duration-200">
                  {service.linkText} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] text-black shadow-2xl border-t border-white/10" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold mb-6">
            {content.cta.title}
          </h2>
          <p className="text-xl mb-8 text-black/90">
            {content.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={content.cta.primaryButton.link}
              className="btn-primary bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <FontAwesomeIcon icon={faPhone} className="mr-2" aria-hidden="true" />
              {content.cta.primaryButton.text}
            </a>
            <Link
              href={content.cta.secondaryButton.link}
              className="btn-secondary bg-white/10 hover:bg-white/20 text-black px-8 py-3 rounded-lg transition-colors hover:shadow-lg hover:bg-grey-100"
            >
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" aria-hidden="true" />
              {content.cta.secondaryButton.text}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 