import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Serwis Motocyklowy | MotoPoradnia Poznań',
  description: 'Profesjonalny serwis motocyklowy w Poznaniu. Oferujemy kompleksowe naprawy, przeglądy, diagnostykę i konserwację motocykli wszystkich marek. Doświadczeni mechanicy.',
  keywords: 'serwis motocyklowy poznań, naprawa motocykli, przegląd motocykla, diagnostyka motocykla, mechanik motocyklowy poznań',
  openGraph: {
    title: 'Serwis Motocyklowy | MotoPoradnia Poznań',
    description: 'Profesjonalny serwis motocyklowy w Poznaniu. Kompleksowe naprawy, przeglądy i diagnostyka motocykli.',
    images: ['/images/DSC_6044.jpg'],
    type: 'website',
    locale: 'pl_PL',
  },
  alternates: {
    canonical: 'https://motoporadnia.pl/uslugi/serwis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Serwis Motocyklowy | MotoPoradnia Poznań',
    description: 'Profesjonalny serwis motocyklowy w Poznaniu. Kompleksowe naprawy, przeglądy i diagnostyka motocykli.',
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