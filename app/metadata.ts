import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MotoPoradnia - Profesjonalny Serwis Motocyklowy w Poznaniu',
  description: 'Kompleksowa obsługa motocykli w Poznaniu. Oferujemy serwis, transport, pomoc w zakupie, szkolenia motocyklowe oraz komis. Wieloletnie doświadczenie i profesjonalne podejście.',
  keywords: 'serwis motocyklowy Poznań, transport motocykli, szkolenia motocyklowe, komis motocyklowy, zakup motocykla, mechanik motocyklowy',
  openGraph: {
    title: 'MotoPoradnia - Profesjonalny Serwis Motocyklowy w Poznaniu',
    description: 'Kompleksowa obsługa motocykli w Poznaniu. Oferujemy serwis, transport, pomoc w zakupie, szkolenia motocyklowe oraz komis.',
    images: ['/images/hero-bg_1.jpg'],
    type: 'website',
    locale: 'pl_PL',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://motoporadnia.pl',
  },
}; 