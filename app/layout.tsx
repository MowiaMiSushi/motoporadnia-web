import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'MotoPoradnia',
  description: 'Profesjonalne porady motoryzacyjne',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={inter.className}>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen pt-[176px]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
} 