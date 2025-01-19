'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faTruck, faMoneyBill, faTruckArrowRight, faRoadBarrier } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { readFile } from 'fs/promises';
import path from 'path';
import { Metadata } from 'next';
import { headers } from 'next/headers';

interface MainSection {
    title: string;
    description: string;
    image: string;
}

interface Area {
    icon: string;
    text: string;
}

interface PageContent {
    hero: {
        title: string;
        description: string;
        images: string[];
    };
    mainSections: MainSection[];
    operatingArea: {
        title: string;
        description: string;
        areas: Area[];
        additionalInfo: string;
    };
    cta: {
        title: string;
        description: string;
        phoneNumber: string;
    };
}

const defaultContent: PageContent = {
    hero: {
        title: "Transport motocykli Poznań i Europa",
        description: "Profesjonalny transport motocykli na terenie Poznania, całej Polski i Europy. Bezpieczny przewóz jednośladów z pełnym ubezpieczeniem.",
        images: [
            "/images/transport_1.webp",
            "/images/transport_2.webp",
            "/images/transport_3.webp"
        ]
    },
    mainSections: [
        {
            title: "Profesjonalny transport motocykli na terenie Poznania i Europy",
            description: "Transport motocykli wykonujemy w sposób w pełni profesjonalny, z najwyższą dbałością o bezpieczeństwo Twojego jednośladu. Specjalizujemy się w bezpiecznym i sprawnym transporcie motocykli zarówno lokalnie, jak i na długich dystansach międzynarodowych.",
            image: "/images/transport_3.webp"
        },
        {
            title: "Największa gwarancja bezpieczeństwa",
            description: "Dla maksymalnego bezpieczeństwa podczas załadunku i rozładunku, korzystamy z wytrzymałego najazdu aluminiowego o udźwigu do 400kg. Transportowany motocykl jest zamocowany w specjalnym doku pod przednie koło, które uniemożliwia jego przechylenie na boki.",
            image: "/images/transport_1.webp"
        },
        {
            title: "Najlepsze zabezpieczenie motocykla",
            description: "Każdy motocykl zabezpieczamy profesjonalnymi pasami transportowymi w 2 lub 4 punktach, w zależności od typu i gabarytów jednośladu. Oferujemy możliwość przewozu do 2 motocykli jednocześnie, co pozwala zoptymalizować koszty transportu.",
            image: "/images/transport_2.webp"
        }
    ],
    operatingArea: {
        title: "Obszar działania",
        description: "Świadczymy kompleksowe usługi transportowe na trzech poziomach:",
        areas: [
            {
                icon: "faTruck",
                text: "Transport lokalny - Poznań i okolice (do 50 km)"
            },
            {
                icon: "faTruckArrowRight",
                text: "Transport krajowy - cała Polska"
            },
            {
                icon: "faRoadBarrier",
                text: "Transport międzynarodowy - kraje Unii Europejskiej"
            }
        ],
        additionalInfo: "Ceny ustalamy indywidualnie w zależności od odległości, ilości motocykli i specyfiki transportu. Zapewniamy konkurencyjne stawki i pełne ubezpieczenie podczas transportu."
    },
    cta: {
        title: "Potrzebujesz transportu motocykla?",
        description: "Skontaktuj się z nami, aby ustalić szczegóły transportu i otrzymać wycenę.",
        phoneNumber: "789059578"
    }
};

const iconMap: { [key: string]: any } = {
    faTruck,
    faTruckArrowRight,
    faRoadBarrier
};

async function getTransportContent() {
    try {
        const contentPath = path.join(process.cwd(), 'content', 'services', 'transport.json');
        const content = await readFile(contentPath, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error('Error reading transport content:', error);
        return null;
    }
}

export const revalidate = 0; // Wyłączamy cache dla tej strony

export default async function TransportPage() {
    const content = await getTransportContent();
    
    if (!content) {
        return <div>Błąd wczytywania treści</div>;
    }

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gray-900 text-white py-24">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    {content.hero.images.map((image: string, index: number) => (
                        <img
                            key={index}
                            src={image}
                            alt="Transport motocykli"
                            className={`absolute inset-0 w-full h-full object-cover ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))}
                </div>
                <div className="relative container mx-auto px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{content.hero.title}</h1>
                        <p className="text-xl mb-8">{content.hero.description}</p>
                    </div>
                </div>
            </section>

            {/* Main Sections */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-1 gap-12">
                        {content.mainSections.map((section: any, index: number) => (
                            <div key={index} className="flex flex-col md:flex-row items-center gap-8">
                                <div className="md:w-1/2">
                                    <img
                                        src={section.image}
                                        alt={section.title}
                                        className="rounded-lg shadow-lg w-full"
                                    />
                                </div>
                                <div className="md:w-1/2">
                                    <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                                    <p className="text-gray-600">{section.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Operating Area */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">{content.operatingArea.title}</h2>
                    <p className="text-xl text-center mb-12">{content.operatingArea.description}</p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {content.operatingArea.areas.map((area: any, index: number) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                                <div className="text-red-600 text-4xl mb-4">
                                    <FontAwesomeIcon icon={iconMap[area.icon]} />
                                </div>
                                <p className="text-gray-600">{area.text}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-gray-600 mt-12 text-center max-w-3xl mx-auto">
                        {content.operatingArea.additionalInfo}
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-red-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">{content.cta.title}</h2>
                    <p className="text-xl mb-8">{content.cta.description}</p>
                    <a
                        href={`tel:${content.cta.phoneNumber}`}
                        className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
                    >
                        {content.cta.phoneNumber}
                    </a>
                </div>
            </section>
        </main>
    );
} 