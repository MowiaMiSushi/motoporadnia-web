import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Providers } from './providers';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'MotoPoradnia - Profesjonalny Serwis Motocyklowy w Poznaniu',
  description: 'Oferujemy kompleksową obsługę serwisową motocykli wszystkich marek. Nasz zespół doświadczonych mechaników zadba o Twój jednoślad.',
  keywords: 'serwis motocyklowy, naprawa motocykli, mechanik motocyklowy, serwis motocykli poznań, warsztat motocyklowy poznań',
  openGraph: {
    title: 'MotoPoradnia - Profesjonalny Serwis Motocyklowy w Poznaniu',
    description: 'Oferujemy kompleksową obsługę serwisową motocykli wszystkich marek. Nasz zespół doświadczonych mechaników zadba o Twój jednoślad.',
    url: 'https://motoporadnia.pl',
    siteName: 'MotoPoradnia',
    locale: 'pl_PL',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen pt-[176px]">
            {children}
          </main>
          <Footer />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Providers>
      </body>
    </html>
  );
} 