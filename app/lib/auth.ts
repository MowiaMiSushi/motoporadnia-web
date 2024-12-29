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
    maxAge: 30 * 24 * 60 * 60, // 30 dni
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  debug: false,
} 