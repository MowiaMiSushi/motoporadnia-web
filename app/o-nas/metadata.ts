import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O nas | MotoPoradnia - Historia i Doświadczenie',
  description: 'Poznaj historię MotoPoradni - profesjonalnego serwisu motocyklowego w Poznaniu. Dowiedz się więcej o naszym doświadczeniu, zespole i pasji do motocykli.',
  keywords: 'historia motoporadnia, serwis motocyklowy poznań historia, doświadczenie mechanik motocyklowy, zespół motoporadnia, warsztat motocyklowy poznań',
  openGraph: {
    title: 'O nas | MotoPoradnia - Historia i Doświadczenie',
    description: 'Poznaj historię MotoPoradni - profesjonalnego serwisu motocyklowego w Poznaniu. Wieloletnie doświadczenie i pasja do motocykli.',
    images: ['/images/DSC_6044.jpg'],
    type: 'website',
    locale: 'pl_PL',
  },
  alternates: {
    canonical: 'https://motoporadnia.pl/o-nas',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'O nas | MotoPoradnia - Historia i Doświadczenie',
    description: 'Poznaj historię MotoPoradni - profesjonalnego serwisu motocyklowego w Poznaniu. Wieloletnie doświadczenie i pasja do motocykli.',
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