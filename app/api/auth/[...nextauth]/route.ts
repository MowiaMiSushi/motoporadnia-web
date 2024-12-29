import NextAuth from 'next-auth';
import { authOptions } from '@/app/lib/auth';

const handler = NextAuth(authOptions);

// Eksportujemy bezpośrednio handler jako GET i POST
export { handler as GET, handler as POST }; 