'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faLaptop, faTools, faOilCan, faRing, faSun, faUserCog, faCogs, faShieldAlt, faDollarSign, faPhone, faMoneyBill, faMotorcycle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface Brand {
  name: string;
  image: string;
  hoverImages?: string[];
}

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  services: Service[];
  brands: Brand[];
  cta: {
    title: string;
    description: string;
    phoneNumber: string;
  };
}

export default function Serwis() {
    const [content, setContent] = useState<PageContent | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch('/api/content/services/serwis');
                if (response.ok) {
                    const data = await response.json();
                    setContent(data);
                }
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        fetchContent();
    }, []);

    useEffect(() => {
        if (content?.hero.images) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) =>
                    prevIndex === content.hero.images.length - 1 ? 0 : prevIndex + 1
                );
            }, 10000);

            return () => clearInterval(interval);
        }
    }, [content]);

    if (!content) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Ładowanie...</div>
            </div>
        );
    }

    const getIconByName = (iconName: string) => {
        const icons: { [key: string]: any } = {
            faWrench,
            faLaptop,
            faTools,
            faOilCan,
            faRing,
            faSun,
            faUserCog,
            faCogs,
            faShieldAlt,
            faDollarSign,
            faPhone,
            faMoneyBill,
            faMotorcycle,
            faCheckCircle
        };
        return icons[iconName] || faTools;
    };

    const Card = ({ item, className = "" }: { item: Service; className?: string }) => (
        <div className={`bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
            <div className="text-[#C62400] mb-6">
                <FontAwesomeIcon icon={getIconByName(item.icon)} className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
        </div>
    );

    const BrandCard = ({ brand }: { brand: Brand }) => {
        const [isHovered, setIsHovered] = useState(false);
        const [currentImageIndex, setCurrentImageIndex] = useState(0);

        useEffect(() => {
            let interval: NodeJS.Timeout;
            if (isHovered && brand.hoverImages && brand.hoverImages.length > 0) {
                interval = setInterval(() => {
                    setCurrentImageIndex((prev) => 
                        prev === brand.hoverImages!.length - 1 ? 0 : prev + 1
                    );
                }, 5000);
            }
            return () => {
                if (interval) {
                    clearInterval(interval);
                }
            };
        }, [isHovered, brand.hoverImages]);

        return (
            <motion.div
                className="relative aspect-square"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => {
                    setIsHovered(false);
                    setCurrentImageIndex(0);
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
            >
                <AnimatePresence>
                    {isHovered && brand.hoverImages && brand.hoverImages.length > 0 ? (
                        <motion.img
                            key={currentImageIndex}
                            src={brand.hoverImages[currentImageIndex]}
                            alt={`${brand.name} service`}
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    ) : (
                        <motion.img
                            src={brand.image}
                            alt={brand.name}
                            className="w-full h-full object-contain"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero section */}
            <section className="relative h-[80vh] flex items-center justify-center bg-black" aria-label="Baner główny">
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
                                backgroundImage: `url('${content.hero.images[currentImageIndex]}')`,
                            }}
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
                    <div className="bg-black/30 backdrop-blur-sm py-8 px-6 sm:px-25 rounded-lg max-w-4xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                            {content.hero.title}
                        </h1>
                        <p className="text-xl sm:text-2xl text-white/90 mb-8">
                            {content.hero.description}
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
                        {content.services.map((service) => (
                            <Card key={service.title} item={service} className="hover:-translate-y-1" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Marki jakie obsługujemy */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Obsługiwane marki</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8">
                        {content.brands.map((brand) => (
                            <BrandCard key={brand.name} brand={brand} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] text-black">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">{content.cta.title}</h2>
                        <p className="text-xl mb-6">
                            {content.cta.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={`tel:${content.cta.phoneNumber}`}
                                className="btn-primary bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors"
                            >
                                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                                Zadzwoń teraz
                            </a>
                            <Link
                                href="/uslugi/serwis/cennik"
                                className="btn-secondary bg-white text-gray-900 px-8 py-3 rounded-lg transition-colors hover:bg-gray-50 border border-gray-200"
                            >
                                <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
                                Zobacz cennik
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
} 