import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt | MotoPoradnia - Serwis Motocyklowy Poznań',
  description: 'Skontaktuj się z MotoPoradnią - profesjonalnym serwisem motocyklowym w Poznaniu. Znajdziesz nas przy ul. Węglowej 9/11. Oferujemy kompleksową obsługę motocykli, transport i doradztwo.',
  keywords: 'kontakt motoporadnia, serwis motocyklowy poznań, adres serwis motocyklowy, kontakt mechanik motocyklowy, naprawa motocykli poznań kontakt',
  openGraph: {
    title: 'Kontakt | MotoPoradnia - Serwis Motocyklowy Poznań',
    description: 'Skontaktuj się z profesjonalnym serwisem motocyklowym w Poznaniu. Kompleksowa obsługa motocykli, transport i doradztwo.',
    images: ['/images/DSC_6044.jpg'],
    type: 'website',
    locale: 'pl_PL',
  },
  alternates: {
    canonical: 'https://motoporadnia.pl/kontakt',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kontakt | MotoPoradnia - Serwis Motocyklowy Poznań',
    description: 'Skontaktuj się z profesjonalnym serwisem motocyklowym w Poznaniu. Kompleksowa obsługa motocykli, transport i doradztwo.',
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