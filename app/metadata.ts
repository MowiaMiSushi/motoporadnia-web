import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MotoPoradnia - Profesjonalny Serwis Motocyklowy w Poznaniu',
  description: 'MotoPoradnia to kompleksowy serwis motocyklowy w Poznaniu. Oferujemy naprawy, przeglądy, transport motocykli, pomoc w zakupie oraz profesjonalne doradztwo techniczne.',
  keywords: 'serwis motocyklowy poznań, naprawa motocykli poznań, mechanik motocyklowy, przegląd motocykla, transport motocykli, pomoc w zakupie motocykla',
  openGraph: {
    title: 'MotoPoradnia - Profesjonalny Serwis Motocyklowy w Poznaniu',
    description: 'Kompleksowy serwis motocyklowy oferujący naprawy, przeglądy, transport motocykli oraz profesjonalne doradztwo techniczne.',
    images: ['/images/DSC_6044.jpg'],
    type: 'website',
    locale: 'pl_PL',
  },
  alternates: {
    canonical: 'https://motoporadnia.pl',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MotoPoradnia - Profesjonalny Serwis Motocyklowy w Poznaniu',
    description: 'Kompleksowy serwis motocyklowy oferujący naprawy, przeglądy, transport motocykli oraz profesjonalne doradztwo techniczne.',
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