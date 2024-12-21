import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Wprowadź nazwę użytkownika i hasło');
        }

        const validUsername = 'admin-adrian';
        const validPasswordHash = '$2a$12$wLyxAjrxVtxhh70sBbeu6uHvTAVaJlMgP956XR4XA15k38LpihJ0.';

        if (credentials.username === validUsername) {
          const isValid = await compare(credentials.password, validPasswordHash);
          if (isValid) {
            return {
              id: '1',
              name: 'Admin',
              email: 'admin@motoporadnia.pl',
              role: 'admin'
            };
          }
        }

        throw new Error('Nieprawidłowa nazwa użytkownika lub hasło');
      }
    })
  ],
  pages: {
    signIn: '/admin/login'
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
        session.user.role = token.role;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 // 24 godziny
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 