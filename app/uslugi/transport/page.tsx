'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faTruck, faMoneyBill, faTruckArrowRight, faRoadBarrier } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const heroImages = [
    '/images/transport_1.jpg',
    '/images/transport_2.jpg',
    '/images/transport_3.jpg',
];

export default function Transport() {
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
        <div className="min-h-screen bg-white">
            {/* Hero section */}
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
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Transport motocykli Poznań i Europa
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                        Profesjonalny transport motocykli na terenie Poznania, całej Polski i Europy. Bezpieczny przewóz jednośladów z pełnym ubezpieczeniem.
                    </p>
                    <Link
                        href="/uslugi/transport/cennik"
                        className="inline-flex items-center bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors mt-6"
                    >
                        Sprawdź cennik
                    </Link>
                </div>
            </section>

            {/* Main content */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] rounded-lg shadow-lg p-8 mb-16">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-[#C62400]">Profesjonalny transport motocykli na terenie Poznania i Europy</h2>
                                    <p className="text-lg leading-relaxed text-gray-700">
                                        Transport motocykli wykonujemy w sposób w pełni profesjonalny, z najwyższą dbałością o bezpieczeństwo Twojego jednośladu. Specjalizujemy się w bezpiecznym i sprawnym transporcie motocykli zarówno lokalnie, jak i na długich dystansach międzynarodowych.
                                    </p>
                                </div>
                                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                                    <Image
                                        src="/images/transport_3.jpg"
                                        alt="Transport motocykla"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] rounded-lg shadow-lg p-8 mb-16">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-[#C62400]">Największa gwarancja bezpieczeństwa</h2>
                                    <p className="text-lg leading-relaxed text-gray-700">
                                        Dla maksymalnego bezpieczeństwa podczas załadunku i rozładunku, korzystamy z wytrzymałego najazdu aluminiowego o udźwigu do 400kg.
                                        Transportowany motocykl jest zamocowany w specjalnym doku pod przednie koło, które uniemożliwia jego przechylenie na boki.
                                    </p>
                                </div>
                                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                                    <Image
                                        src="/images/transport_1.jpg"
                                        alt="Transport motocykla"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] rounded-lg shadow-lg p-8 mb-16">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-[#C62400]">Najlepsze zabezpieczenie motocykla</h2>
                                    <p className="text-lg leading-relaxed text-gray-700">
                                        Każdy motocykl zabezpieczamy profesjonalnymi pasami transportowymi w 2 lub 4 punktach, w zależności od typu i gabarytów jednośladu.
                                        Oferujemy możliwość przewozu do 2 motocykli jednocześnie, co pozwala zoptymalizować koszty transportu.
                                    </p>
                                </div>
                                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                                    <Image
                                        src="/images/transport_2.jpg"
                                        alt="Transport motocykla"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Obszar działania */}

                        <div className="bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] rounded-lg shadow-lg p-8 mb-16">
                            <div className="grid gap-12 items-center">
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-[#C62400]">Obszar działania</h2>
                                    <p className="text-lg leading-relaxed text-gray-700">
                                        Świadczymy kompleksowe usługi transportowe na trzech poziomach:
                                    </p>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-center">
                                            <FontAwesomeIcon icon={faTruck} className="text-[#C62400] w-5 h-5 mr-3" />
                                            Transport lokalny - Poznań i okolice (do 50 km)
                                        </li>
                                        <li className="flex items-center">
                                            <FontAwesomeIcon icon={faTruckArrowRight} className="text-[#C62400] w-5 h-5 mr-3" />
                                            Transport krajowy - cała Polska
                                        </li>
                                        <li className="flex items-center">
                                            <FontAwesomeIcon icon={faRoadBarrier} className="text-[#C62400] w-5 h-5 mr-3" />
                                            Transport międzynarodowy - kraje Unii Europejskiej
                                        </li>
                                    </ul>
                                    <p className="text-lg leading-relaxed text-gray-700 mt-4">
                                        Ceny ustalamy indywidualnie w zależności od odległości, ilości motocykli i specyfiki transportu. Zapewniamy konkurencyjne stawki i pełne ubezpieczenie podczas transportu.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            < section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC]" >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Potrzebujesz transportu motocykla?</h2>
                        <p className="text-xl mb-8 text-gray-600">
                            Skontaktuj się z nami, aby ustalić szczegóły transportu i otrzymać wycenę.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:789059578"
                                className="bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center justify-center"
                            >
                                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                                Zadzwoń teraz
                            </a>
                            <Link
                                href="/uslugi/transport/cennik"
                                className="bg-white text-gray-900 px-8 py-3 rounded-lg transition-colors inline-flex items-center justify-center hover:bg-gray-50 border border-gray-200"
                            >
                                <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
                                Zobacz cennik
                            </Link>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
} 