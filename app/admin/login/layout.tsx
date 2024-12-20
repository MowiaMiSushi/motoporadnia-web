import { Inter } from 'next/font/google';
import { Providers } from '../../providers';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-[#F3F3F3]`}>
      <Providers>
        {children}
      </Providers>
    </div>
  );
} 