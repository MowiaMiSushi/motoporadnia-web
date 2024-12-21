'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

interface PriceListItem {
    service: string;
    price: string;
    description?: string;
}

interface PriceListSection {
    title: string;
    items: PriceListItem[];
}

const priceList: PriceListSection[] = [
    {
        title: "Usługi podstawowe",
        items: [
            { service: "Przegląd podstawowy", price: "od 200 zł", description: "Kontrola podstawowych układów motocykla" },
            { service: "Przegląd rozszerzony", price: "od 300 zł", description: "Szczegółowa kontrola wszystkich układów" },
            { service: "Diagnostyka komputerowa", price: "od 150 zł" }
        ]
    },
    {
        title: "Układ hamulcowy",
        items: [
            { service: "Wymiana klocków hamulcowych (przód/tył)", price: "od 100 zł" },
            { service: "Wymiana płynu hamulcowego", price: "od 150 zł" },
            { service: "Odpowietrzenie układu hamulcowego", price: "od 120 zł" }
        ]
    },
    {
        title: "Zawieszenie/nadwozie",
        items: [
            { service: "Serwis zawieszenia przedniego", price: "od 400 zł" },
            { service: "Serwis amortyzatora tylnego", price: "od 300 zł" },
            { service: "Wymiana łożysk wahacza", price: "od 350 zł" }
        ]
    },
    {
        title: "Podstawowa obsługa silnika/skrzyni biegów",
        items: [
            { service: "Wymiana oleju i filtra", price: "od 150 zł" },
            { service: "Regulacja zaworów", price: "od 400 zł" },
            { service: "Wymiana świec zapłonowych", price: "od 100 zł" }
        ]
    },
    {
        title: "Układ napędowy",
        items: [
            { service: "Wymiana łańcucha i zębatek", price: "od 250 zł" },
            { service: "Czyszczenie i smarowanie łańcucha", price: "od 80 zł" },
            { service: "Regulacja napięcia łańcucha", price: "od 50 zł" }
        ]
    },
    {
        title: "Koła i ogumienie",
        items: [
            { service: "Wymiana opony", price: "od 100 zł" },
            { service: "Wyważanie koła", price: "od 50 zł" },
            { service: "Naprawa przebitej opony", price: "od 80 zł" }
        ]
    },
    {
        title: "Układ rozrządu",
        items: [
            { service: "Regulacja rozrządu", price: "od 300 zł" },
            { service: "Wymiana łańcucha rozrządu", price: "od 500 zł" },
            { service: "Kontrola luzów zaworowych", price: "od 200 zł" }
        ]
    },
    {
        title: "Układ zasilania/gaźniki/wtryski",
        items: [
            { service: "Czyszczenie i regulacja gaźników", price: "od 300 zł" },
            { service: "Synchronizacja gaźników", price: "od 200 zł" },
            { service: "Diagnostyka układu wtryskowego", price: "od 150 zł" }
        ]
    },
    {
        title: "Prace elektryczne",
        items: [
            { service: "Diagnostyka instalacji elektrycznej", price: "od 150 zł" },
            { service: "Naprawa wiązki elektrycznej", price: "od 200 zł" },
            { service: "Wymiana akumulatora", price: "od 50 zł" }
        ]
    }
];

const heroImages = [
  '/images/serwis_1.jpg',
  '/images/serwis_2.jpg',
];

export default function Cennik() {
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

    const toggleSection = (title: string) => {
        setOpenSection(openSection === title ? null : title);
    };

    return (
        <div className="min-h-screen bg-white">
            
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
                            Cennik serwisu motocyklowego
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                            Oferujemy profesjonalny serwis motocykli w konkurencyjnych cenach. 
                            Wszystkie ceny są orientacyjne i mogą się różnić w zależności od modelu i zakresu prac.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-4xl mx-auto mb-12 bg-white rounded-lg shadow-sm p-6 text-gray-700">
                    <div className="mb-4">
                        Poniższy cennik powstał na bazie naszego doświadczenia związanego z należytą i profesjonalną obsługą motocykli.
                        Ceny bazują na roboczogodzinach, które trzeba poświęć aby zgodnie ze sztuką dokonać serwisu Waszych motocykli.
                        Przewidują one też wszelkie utrudnienia w trakcie wykonywanych prac wynikających najczęściej z wieku motocykla
                        czy wcześniejszych nieodpowiednio przeprowadzanych napraw oraz czas poświęcony na poszukiwanie trudniej dostępnych części.
                    </div>
                    <div className="mb-4">
                        Podana cena może ulec zmianie w trakcie wykonywanych prac stosunkowo w jedną jak i drugą stronę.
                    </div>
                    <div className="font-medium text-[#C62400]">
                        Powyższe ceny nie zawierają cen części zamiennych.
                    </div>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {priceList.map((section, sectionIndex) => (
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
                        <div className="mb-4">
                            Wszystkie inne nie wymienione czynności, usługi, prace są wyceniane indywidualnie zawsze na początku zlecenia
                            przed przystąpieniem do pracy.
                        </div>
                        <div className="mb-4">
                            Powyższy cennik nie stanowi oferty dla klienta a zawarte w nim ceny są poglądowe w rozumieniu prawa cywilnego,
                            art. 71 kodeksu cywilnego i stanowią zaproszenie do zawarcia umowy/zlecenia wykonania usługi.
                        </div>
                        <div className="font-medium">
                            Wszystkie ceny zawarte w cenniku są cenami brutto i zawierają podatek VAT 23%.
                            Na usługę wystawiamy paragon bądź fakturę VAT.
                        </div>
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