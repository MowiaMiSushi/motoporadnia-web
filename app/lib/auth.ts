import { connectToDatabase } from './db';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { JWT } from 'next-auth/jwt';

interface ExtendedUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface ExtendedToken extends JWT {
  role?: string;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Brak zmiennej środowiskowej MONGODB_URI');
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "Nazwa użytkownika", type: "text" },
        password: { label: "Hasło", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const { db } = await connectToDatabase();
          const user = await db.collection('users').findOne({ username: credentials.username });

          if (!user) {
            console.log('Nie znaleziono użytkownika');
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            console.log('Nieprawidłowe hasło');
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.username,
            email: user.email,
            role: user.role
          } as ExtendedUser;
        } catch (error) {
          console.error('Błąd autoryzacji:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/admin/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as ExtendedToken).id = user.id;
        (token as ExtendedToken).role = (user as ExtendedUser).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = (token as ExtendedToken).id;
        (session.user as any).role = (token as ExtendedToken).role;
      }
      return session;
    }
  }
}; 