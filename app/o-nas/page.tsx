'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHandshake, faTools, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

const values = [
  {
    icon: faHeart,
    title: "Pasja",
    description: "Motocykle to nasza pasja, którą dzielimy się z klientami"
  },
  {
    icon: faHandshake,
    title: "Profesjonalizm",
    description: "Zapewniamy najwyższą jakość usług i obsługi klienta"
  },
  {
    icon: faTools,
    title: "Doświadczenie",
    description: "Lata praktyki w branży motocyklowej"
  },
  {
    icon: faShieldAlt,
    title: "Bezpieczeństwo",
    description: "Dbamy o bezpieczeństwo naszych klientów"
  }
];

const team = [
  {
    name: "Aleksandra",
    position: "Przedstawicielka",
    image: "/images/pracownik_1.png"
  },
  {
    name: "Adrian",
    position: "Kierownik",
    image: "/images/pracownik_2.png"
  },
  {
    name: "Bartosz",
    position: "Mechanik",
    image: "/images/pracownik_3.png"
  }
];

const advantages = [
  {
    title: "Kompleksowa obsługa",
    description: "Od zakupu po serwis - wszystko w jednym miejscu"
  },
  {
    title: "Indywidualne podejście",
    description: "Każdy klient jest dla nas wyjątkowy"
  },
  {
    title: "Wieloletnie doświadczenie",
    description: "Tysiące naprawionych motocykli i zadowolonych klientów"
  }
];

const heroImages = [
  '/images/hero-bg_1.jpg',
  '/images/hero-bg_2.jpg',
  '/images/hero-bg_3.png',
  // Tutaj możesz dodać więcej zdjęć
];

export default function AboutUs() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // 10 sekund

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-black">
        <div className="absolute inset-0 bg-black/50 z-0" />
        {heroImages.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{ 
              backgroundImage: `url('${image}')`,
              opacity: currentImageIndex === index ? 1 : 0
            }}
          />
        ))}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm py-8 rounded-lg max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            O nas
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8">
            Poznaj naszą historię i pasję do motocykli
          </p>
        </div>
      </section>

      {/* Historia Section */}
      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Nasza Historia</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Motoporadnia – Fachowa pomoc przy zakupie, transporcie i serwisie motocykli jest to firma, stworzona przez ludzi, którzy nie wyobrażają sobie otaczającego ich świata bez jednośladów.
                </p>
                <p className="text-lg leading-relaxed">
                  Początek działalności miał miejsce już w najmłodszych latach założyciela. Adrian, zaraz po stawianiu pierwszych kroków wsiadł na elektrycznie napędzanego Repsola aby pokonywać pierwsze metry na dwóch (wtedy jeszcze czterech) kółkach.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/o-nas_3.jpg"
                    alt="Siedziba Motoporadni"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-gray-700">
                <p className="text-lg leading-relaxed">
                Proces rozwojowy naszej pasji i nauki wszystkiego co motocyklowe szedł swoim naturalnym trybem. Pierwsze motocykle z czasów radzieckich, ujeżdżanie wszystkiego co ma silnik i koła w czasach szkolnych, siedzenie do późnych nocy w garażu usprawniając i modyfikując swoje motocykle, praca w warsztatach.
                </p>
                <p className="text-lg leading-relaxed">
                Kolejne lata doświadczenie jak należycie obsługiwać motocykl zachowując najwyższą jakość bezpieczeństwa, serwisu i estetyki nabieraliśmy na torach wyścigowych jako mechanicy znanych zawodników oraz sami biorąc czynny udział na linii startu.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/o-nas_2.jpg"
                    alt="Siedziba Motoporadni"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-gray-700">
                <p className="text-lg leading-relaxed">
                Efektem tego czego nauczyliśmy się przez te wszystkie motocyklowe lata, setki godzin pracy i tysiące pokonanych kilometrów na drogach oraz torach jest Motoporadnia. Firma, gdzie każdy motocyklista niezależnie od doświadczenia znajdzie odpowiedź na swoje motocyklowe pytania oraz potrzeby przy pomocy specjalistów i profesjonalistów.
                </p>
                <p className="text-lg leading-relaxed">
                Zapraszamy do zapoznania się z zakresem naszych usług, który z czasem na pewno będzie się powiększał!
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/o-nas_1.jpg"
                    alt="Siedziba Motoporadni"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Zespół Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Nasz Zespół</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center group hover:-translate-y-2 transform transition-all duration-300 cursor-pointer"
                >
                  <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden group-hover:shadow-xl transition-all duration-300">
                    <Image
                      src={member.image}
                      alt={`Zdjęcie ${member.name}`}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-[#C62400] transition-colors duration-300">{member.name}</h3>
                  <p className="text-[#C62400] group-hover:text-[#A01D00] transition-colors duration-300">{member.position}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Śledź nas w social mediach</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Facebook Widget */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <a
                  href="https://www.facebook.com/motoporadnia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="h-12 w-12 text-[#1877F2] group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="text-xl font-bold mt-4 mb-2">Facebook</h3>
                  <p className="text-gray-600">Dołącz do naszej społeczności na Facebooku</p>
                </a>
              </motion.div>

              {/* Instagram Widget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <a
                  href="https://www.instagram.com/motoporadnia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="h-12 w-12 text-[#E4405F] group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="text-xl font-bold mt-4 mb-2">Instagram</h3>
                  <p className="text-gray-600">Zobacz nasze najnowsze zdjęcia</p>
                </a>
              </motion.div>

              {/* Youtube Widget */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <a
                  href="https://www.youtube.com/@motoporadnia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <FontAwesomeIcon
                    icon={faYoutube}
                    className="h-12 w-12 text-[#FF0000] group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="text-xl font-bold mt-4 mb-2">YouTube</h3>
                  <p className="text-gray-600">Obejrzyj nasze filmy i poradniki</p>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 