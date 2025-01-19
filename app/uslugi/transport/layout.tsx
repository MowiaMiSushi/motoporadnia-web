import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transport motocykli - MotoPoradnia',
  description: 'Profesjonalny transport motocykli na terenie Poznania i całej Polski. Bezpieczny przewóz jednośladów z pełnym ubezpieczeniem.',
  keywords: 'transport motocykli poznań, przewóz motocykli, laweta motocyklowa, transport quadów, transport skuterów poznań',
  openGraph: {
    title: 'Transport Motocykli | MotoPoradnia Poznań',
    description: 'Profesjonalny transport motocykli w Poznaniu i całej Polsce. Bezpieczny przewóz jednośladów.',
    images: ['/images/DSC_6044.jpg'],
    type: 'website',
    locale: 'pl_PL',
  },
  alternates: {
    canonical: 'https://motoporadnia.pl/uslugi/transport',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transport Motocykli | MotoPoradnia Poznań',
    description: 'Profesjonalny transport motocykli w Poznaniu i całej Polsce. Bezpieczny przewóz jednośladów.',
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

export default function TransportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 