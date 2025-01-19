import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Tutaj możesz dodać logikę weryfikacji użytkownika
        // Na przykład, sprawdzenie czy email to admin@example.com i hasło to odpowiedni hash
        const isValidEmail = credentials.email === 'admin@example.com';
        const hashedPassword = '$2a$10$YourHashedPasswordHere'; // Zastąp prawdziwym hashem
        const isValidPassword = await bcrypt.compare(credentials.password, hashedPassword);

        if (isValidEmail && isValidPassword) {
          return {
            id: '1',
            email: credentials.email,
            name: 'Admin'
          };
        }

        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/admin/login'
  }
};

const handler = NextAuth(authOptions);

// Eksportujemy bezpośrednio handler jako GET i POST
export { handler as GET, handler as POST }; 