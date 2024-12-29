import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://motoporadnia.pl'),
  title: {
    default: 'Motoporadnia - Fachowa pomoc przy zakupie, transporcie i serwisie motocykli',
    template: '%s | Motoporadnia'
  },
  description: 'Profesjonalna pomoc przy zakupie motocykla, transport motocykli oraz serwis motocyklowy w Poznaniu. Sprawdź naszą ofertę!',
  keywords: 'serwis motocyklowy poznań, naprawa motocykli poznań, mechanik motocyklowy, przegląd motocykla, transport motocykli, pomoc w zakupie motocykla',
  openGraph: {
    title: 'MotoPoradnia - Profesjonalny Serwis Motocyklowy w Poznaniu',
    description: 'Kompleksowy serwis motocyklowy oferujący naprawy, przeglądy, transport motocykli oraz profesjonalne doradztwo techniczne.',
    images: ['/images/DSC_6044.webp'],
    type: 'website',
    locale: 'pl_PL',
  },
  alternates: {
    canonical: 'https://motoporadnia.pl',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motoporadnia - Fachowa pomoc przy zakupie, transporcie i serwisie motocykli',
    description: 'Profesjonalna pomoc przy zakupie motocykla, transport motocykli oraz serwis motocyklowy w Poznaniu. Sprawdź naszą ofertę!',
    images: ['/images/DSC_6044.webp'],
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