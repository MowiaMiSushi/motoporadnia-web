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
          console.log('Autoryzacja - dane:', { username: credentials?.username });

          if (!credentials?.username || !credentials?.password) {
            console.log('Brak danych logowania');
            return null;
          }

          const { db } = await connectToDatabase();
          const user = await db.collection('users').findOne({
            username: credentials.username,
          });

          console.log('Znaleziono użytkownika:', !!user);

          if (!user) {
            console.log('Nie znaleziono użytkownika');
            return null;
          }

          const isValid = await compare(credentials.password, user.password);
          console.log('Hasło poprawne:', isValid);

          if (!isValid) {
            console.log('Nieprawidłowe hasło');
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.username,
            role: user.role,
          };
        } catch (error) {
          console.error('Błąd autoryzacji:', error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: { 
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dni
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role as string;
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
} 