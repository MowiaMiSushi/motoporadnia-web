'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { serviceData } from './data';

interface PriceListItem {
    service: string;
    price: string;
    description?: string;
}

interface PriceListSection {
    title: string;
    items: PriceListItem[];
}

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  priceList: PriceListSection[];
  disclaimer: {
    top: string[];
    bottom: string[];
  };
}

export default function Cennik() {
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [content, setContent] = useState<PageContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch('/api/content/pricing/service');
                if (response.ok) {
                    const data = await response.json();
                    setContent(data || serviceData);
                } else {
                    setContent(serviceData);
                }
            } catch (error) {
                console.error('Error fetching content:', error);
                setContent(serviceData);
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

    if (isLoading || !content) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="text-xl">Ładowanie...</div>
            </div>
        );
    }

    const toggleSection = (title: string) => {
        setOpenSection(openSection === title ? null : title);
    };

    return (
        <div className="min-h-screen bg-white">
            
            {/* Hero section */}
            <section className="relative h-[80vh] flex items-center justify-center bg-black" aria-label="Baner główny">
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
                        aria-label="Zdjęcie serwisu motocyklowego w tle"
                    />
                ))}
                <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 z-[1]" 
                    aria-hidden="true"
                />
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

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-4xl mx-auto mb-12 bg-white rounded-lg shadow-sm p-6 text-gray-700">
                    {content.disclaimer.top.map((text, index) => (
                        <div key={index} className={`${index < content.disclaimer.top.length - 1 ? 'mb-4' : ''}`}>
                            {text}
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {content.priceList.map((section, sectionIndex) => (
                        <div key={`section-${sectionIndex}`} className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <button
                                onClick={() => toggleSection(section.title)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                            >
                                <h3 className="text-xl font-semibold">{section.title}</h3>
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openSection === section.title ? 'transform rotate-180' : ''
                                        }`}
                                />
                            </button>
                            {openSection === section.title && (
                                <div className="px-6 pb-4">
                                    <div className="divide-y divide-gray-200">
                                        {section.items.map((item, itemIndex) => (
                                            <div key={`item-${sectionIndex}-${itemIndex}`} className="py-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <div className="font-medium">{item.service}</div>
                                                        {item.description && (
                                                            <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                                                        )}
                                                    </div>
                                                    <div className="text-[#C62400] font-semibold ml-4 whitespace-nowrap">
                                                        {item.price}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto mt-12 space-y-4">
                    <div className="bg-white rounded-lg shadow-sm p-6 text-gray-700">
                        {content.disclaimer.bottom.map((text, index) => (
                            <div key={index} className={`${index < content.disclaimer.bottom.length - 1 ? 'mb-4' : ''}`}>
                                {text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] text-black shadow-2xl border-t border-white/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Potrzebujesz wyceny?</h2>
                        <div className="text-xl mb-8">
                            Skontaktuj się z nami telefonicznie lub napisz do nas.
                            <br />
                            Doradzimy i pomożemy w doborze odpowiedniego zakresu usług.
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:789059578"
                                className="btn-primary bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
                            >
                                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                                Zadzwoń teraz
                            </a>
                            <a
                                href="/kontakt"
                                className="btn-secondary bg-white/10 hover:bg-white/20 text-black px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl border border-white/20"
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