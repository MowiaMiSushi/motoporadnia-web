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
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/admin/login',
    signOut: '/',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes('/admin/login')) {
        return `${baseUrl}/admin/dashboard`;
      }
      
      const callbackUrl = new URL(url, baseUrl).searchParams.get('callbackUrl');
      if (callbackUrl && callbackUrl.startsWith(baseUrl)) {
        return callbackUrl;
      }
      
      return `${baseUrl}/admin/dashboard`;
    }
  }
} 