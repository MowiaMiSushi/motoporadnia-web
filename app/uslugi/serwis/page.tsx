'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faLaptop, faTools, faOilCan, faRing, faSun, faUserCog, faCogs, faShieldAlt, faDollarSign, faPhone, faMoneyBill, faMotorcycle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';

const heroImages = [
    '/images/serwis_1.jpg',
    '/images/serwis_2.jpg',
];

export default function Serwis() {
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const services = [
        {
            icon: faWrench,
            title: 'Przeglądy okresowe',
            description: 'Regularne przeglądy zgodne z książką serwisową, zapewniające długą żywotność motocykla.'
        },
        {
            icon: faLaptop,
            title: 'Diagnostyka komputerowa',
            description: 'Profesjonalny sprzęt diagnostyczny do wykrywania i analizy usterek elektronicznych.'
        },
        {
            icon: faTools,
            title: 'Naprawy mechaniczne',
            description: 'Kompleksowe naprawy silnika, skrzyni biegów i innych podzespołów mechanicznych.'
        },
        {
            icon: faOilCan,
            title: 'Wymiana płynów i filtrów',
            description: 'Wymiana oleju silnikowego, płynu hamulcowego i innych płynów eksploatacyjnych.'
        },
        {
            icon: faRing,
            title: 'Wymiana opon',
            description: 'Profesjonalna wymiana opon, wyważanie kół i doradztwo w doborze ogumienia.'
        },
        {
            icon: faSun,
            title: 'Przygotowanie do sezonu',
            description: 'Kompleksowe przygotowanie motocykla do sezonu lub zimowania.'
        }
    ];

    const benefits = [
        {
            icon: faUserCog,
            title: 'Doświadczeni mechanicy',
            description: 'Nasz zespół to wykwalifikowani specjaliści z wieloletnim doświadczeniem.'
        },
        {
            icon: faCogs,
            title: 'Nowoczesny sprzęt',
            description: 'Korzystamy z najnowocześniejszego sprzętu diagnostycznego i narzędzi.'
        },
        {
            icon: faShieldAlt,
            title: 'Gwarancja jakości',
            description: 'Udzielamy gwarancji na wszystkie wykonane usługi i wymienione części.'
        },
        {
            icon: faDollarSign,
            title: 'Konkurencyjne ceny',
            description: 'Oferujemy atrakcyjne ceny przy zachowaniu najwyższej jakości usług.'
        }
    ];

    const brands = [
        {
            name: 'Honda',
            image: '/images/brands/honda.jpg'
        },
        {
            name: 'Yamaha',
            image: '/images/brands/yamaha.jpg'
        },
        {
            name: 'Suzuki',
            image: '/images/brands/suzuki.jpg'
        },
        {
            name: 'Ducati',
            image: '/images/brands/ducati.jpg'
        },
        {
            name: 'Kawasaki',
            image: '/images/brands/kawasaki.jpg'
        },
        {
            name: 'BMW',
            image: '/images/brands/bmw.jpg'
        },
        {
            name: 'KTM',
            image: '/images/brands/ktm.jpg'
        },
        {
            name: 'Harley Davidson',
            image: '/images/brands/harley.jpg'
        },
        {
            name: 'Husqvarna',
            image: '/images/brands/husqvarna.jpg'
        },
        {
            name: 'Piaggio',
            image: '/images/brands/piaggio.jpg'
        },
        {
            name: 'Triumph',
            image: '/images/brands/triumph.jpg'
        },
        {
            name: 'Indian',
            image: '/images/brands/indian.jpg'
        },
        {
            name: 'MV Agusta',
            image: '/images/brands/mv_agusta.jpg'
        },
        {
            name: 'Benelli',
            image: '/images/brands/benelli.jpg'
        },
        {
            name: 'Aprilia',
            image: '/images/brands/aprilia.jpg'
        },
        {
            name: 'Moto Guzzi',
            image: '/images/brands/moto_guzzi.jpg'
        },
    ];

    const toggleSection = (title: string) => {
        setOpenSection(openSection === title ? null : title);
    };

    const Card = ({ item, className = "" }: { item: any; className?: string }) => (
        <div className={`bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
            <div className="text-[#C62400] mb-6">
                <FontAwesomeIcon icon={item.icon} className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
        </div>
    );

    const BrandCard = ({ brand }: { brand: { name: string; image: string } }) => (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <h3 className="text-xl font-semibold p-4 text-center border-b">{brand.name}</h3>
            <div className="relative h-48 w-full">
                <Image
                    src={brand.image}
                    alt={`Logo ${brand.name}`}
                    fill
                    className="object-contain p-4"
                />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Hero section */}
            <section className="relative h-[60vh] flex items-center justify-center bg-black overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-0" />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url('${heroImages[currentImageIndex]}')`,
                            }}
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
                    <div className="bg-black/30 backdrop-blur-sm py-8 px-6 sm:px-25 rounded-lg max-w-4xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                            Serwis Motocykli 
                        </h1>
                        <p className="text-xl sm:text-2xl text-white/90 mb-8">
                            Profesjonalna obsługa i naprawa Twojego motocykla.
                        </p>
                        <Link 
                            href="/uslugi/serwis/cennik"
                            className="inline-flex items-center bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors"
                        >
                            Sprawdź cennik
                        </Link>
                    </div>
                </div>
            </section>

            {/* Usługi */}
            <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] text-black">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Zakres usług serwisowych</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <Card key={service.title} item={service} className="hover:-translate-y-1" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Marki jakie obsługujemy */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Marki jakie obsługujemy</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                        {brands.map((brand) => (
                            <div 
                                key={brand.name}
                                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                            >
                                <h3 className="text-lg font-semibold p-3 text-center border-b truncate">{brand.name}</h3>
                                <div className="relative h-32 w-full">
                                    <Image
                                        src={brand.image}
                                        alt={`Logo ${brand.name}`}
                                        fill
                                        className="object-contain p-4"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] text-black">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Jak umówić się na serwis?</h2>
                        <p className="text-xl mb-6">
                            Skontaktuj się z nami telefonicznie lub napisz do nas,
                            aby umówić termin wizyty w serwisie. Doradzimy i pomożemy w wyborze
                            odpowiedniego zakresu usług.
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
                                href="/uslugi/serwis/cennik"
                                className="btn-secondary bg-white/10 hover:bg-white/20 text-black px-8 py-3 rounded-lg transition-colors"
                            >
                                <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
                                Zobacz cennik
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
} 