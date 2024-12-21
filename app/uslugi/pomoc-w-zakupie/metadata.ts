import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pomoc w Zakupie Motocykla | MotoPoradnia Poznań',
  description: 'Profesjonalne doradztwo przy zakupie motocykla w Poznaniu. Oferujemy oględziny, diagnostykę i ekspertyzę techniczną motocykli używanych. Pomożemy wybrać odpowiedni motocykl.',
  keywords: 'pomoc w zakupie motocykla poznań, oględziny motocykla, ekspertyza motocykla, doradztwo motocyklowe, zakup używanego motocykla',
  openGraph: {
    title: 'Pomoc w Zakupie Motocykla | MotoPoradnia Poznań',
    description: 'Profesjonalne doradztwo przy zakupie motocykla. Oględziny i ekspertyza techniczna motocykli używanych.',
    images: ['/images/DSC_6044.jpg'],
    type: 'website',
    locale: 'pl_PL',
  },
  alternates: {
    canonical: 'https://motoporadnia.pl/uslugi/pomoc-w-zakupie',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pomoc w Zakupie Motocykla | MotoPoradnia Poznań',
    description: 'Profesjonalne doradztwo przy zakupie motocykla. Oględziny i ekspertyza techniczna motocykli używanych.',
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