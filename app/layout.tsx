import './styles/globals.css';
import { Inter } from 'next/font/google';
import { ClientLayout } from './client-layout';
import { metadata } from './metadata';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="h-full">
      <body className={`${inter.className} h-full bg-background`}>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
} 