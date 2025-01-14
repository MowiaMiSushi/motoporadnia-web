import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Szkolenia Motocyklowe | MotoPoradnia Poznań',
  description: 'Profesjonalne szkolenia motocyklowe w Poznaniu. Oferujemy indywidualne podejście, naukę techniki jazdy, diagnostykę i konserwację motocykla. Doświadczeni instruktorzy.',
  keywords: 'szkolenia motocyklowe poznań, nauka jazdy motocyklem, technika jazdy motocyklem, kurs motocyklowy, instruktor motocyklowy poznań',
  openGraph: {
    title: 'Szkolenia Motocyklowe | MotoPoradnia Poznań',
    description: 'Profesjonalne szkolenia motocyklowe w Poznaniu. Indywidualne podejście, nauka techniki jazdy i konserwacji motocykla.',
    images: ['/images/DSC_6044.jpg'],
    type: 'website',
    locale: 'pl_PL',
  },
  alternates: {
    canonical: 'https://motoporadnia.pl/uslugi/szkolenia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Szkolenia Motocyklowe | MotoPoradnia Poznań',
    description: 'Profesjonalne szkolenia motocyklowe w Poznaniu. Indywidualne podejście, nauka techniki jazdy i konserwacji motocykla.',
    images: ['/images/DSC_6044.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}; 