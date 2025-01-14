import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Szkolenia Motocyklowe na Torze | MotoPoradnia',
  description: 'Profesjonalne szkolenia motocyklowe na torach w Bydgoszczy i Starym Kisielinie. Nauka technik jazdy torowej, analiza telemetrii i indywidualne podejście.',
  keywords: 'szkolenia motocyklowe, jazda torowa, tor Bydgoszcz, tor Stary Kisielin, nauka jazdy motocyklem, techniki jazdy torowej',
  openGraph: {
    title: 'Szkolenia Motocyklowe na Torze | MotoPoradnia',
    description: 'Profesjonalne szkolenia motocyklowe na torach w Bydgoszczy i Starym Kisielinie. Nauka technik jazdy torowej, analiza telemetrii i indywidualne podejście.',
    images: ['/images/szkolenia_1.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function SzkoleniaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 