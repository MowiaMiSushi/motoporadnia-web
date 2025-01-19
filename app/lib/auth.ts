import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { connectToDatabase } from './mongodb';

interface Credentials {
  username?: string;
  password?: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: Credentials | undefined) {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error('Wprowadź login i hasło');
          }

          const { db } = await connectToDatabase();
          const user = await db.collection('users').findOne({
            username: credentials.username,
          });

          if (!user) {
            throw new Error('Nieprawidłowy login lub hasło');
          }

          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error('Nieprawidłowy login lub hasło');
          }

          return {
            id: user._id.toString(),
            name: user.username,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error('Błąd autoryzacji:', error);
          throw error;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 dni
    updateAge: 24 * 60 * 60, // 24 godziny
  },
  pages: {
    signIn: '/admin/login',
    signOut: '/',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Jeśli URL zawiera /admin/login, przekieruj do dashboardu
      if (url.includes('/admin/login')) {
        return `${baseUrl}/admin/dashboard`;
      }
      
      // Sprawdź czy jest callbackUrl i czy jest bezpieczny
      const callbackUrl = new URL(url, baseUrl).searchParams.get('callbackUrl');
      if (callbackUrl && callbackUrl.startsWith(baseUrl) && callbackUrl.includes('/admin')) {
        return callbackUrl;
      }
      
      // Domyślnie przekieruj do dashboardu
      return `${baseUrl}/admin/dashboard`;
    }
  },
  debug: process.env.NODE_ENV === 'development',
} 