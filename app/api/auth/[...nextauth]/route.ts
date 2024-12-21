import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

// Dane użytkownika z bazy
const users = [
  {
    id: '675bbbeae85eb3e3331d0199',
    name: 'admin-adrian',
    username: 'admin-adrian',
    email: 'admin@motoporadnia.pl',
    role: 'admin',
    createdAt: '2024-12-13T04:45:30.468+00:00',
    password: 'Administrator25!',
  },
];

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Wymagane są nazwa użytkownika i hasło');
        }

        const user = users.find(u => u.username === credentials.username);
        
        if (!user) {
          throw new Error('Nieprawidłowa nazwa użytkownika lub hasło');
        }

        
        const isPasswordValid = credentials.password === user.password;

        if (!isPasswordValid) {
          throw new Error('Nieprawidłowa nazwa użytkownika lub hasło');
        }

        return {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dni
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.username = token.username as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST }; 