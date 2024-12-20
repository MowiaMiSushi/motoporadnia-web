import './styles/globals.css';
import { Inter } from 'next/font/google';
import { ClientLayout } from './client-layout';
import { metadata } from './metadata';
import { headers } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from './lib/auth';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export { metadata };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="pl" className="h-full">
      <body className={`${inter.className} h-full bg-background`}>
        <Providers>
          <ClientLayout session={session}>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
} 