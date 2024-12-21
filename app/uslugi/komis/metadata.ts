import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Komis Motocyklowy | MotoPoradnia Poznań',
  description: 'Komis motocyklowy w Poznaniu. Szeroki wybór sprawdzonych motocykli używanych. Profesjonalna wycena i pomoc w sprzedaży Twojego motocykla. Bezpieczne transakcje.',
  keywords: 'komis motocyklowy poznań, skup motocykli, sprzedaż motocykli używanych, wycena motocykla, motocykle używane poznań',
  openGraph: {
    title: 'Komis Motocyklowy | MotoPoradnia Poznań',
    description: 'Komis motocyklowy w Poznaniu. Sprawdzone motocykle używane, profesjonalna wycena i pomoc w sprzedaży.',
    images: ['/images/DSC_6044.jpg'],
    type: 'website',
    locale: 'pl_PL',
  },
  alternates: {
    canonical: 'https://motoporadnia.pl/uslugi/komis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Komis Motocyklowy | MotoPoradnia Poznań',
    description: 'Komis motocyklowy w Poznaniu. Sprawdzone motocykle używane, profesjonalna wycena i pomoc w sprzedaży.',
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