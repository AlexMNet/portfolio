import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import prisma from '@/app/libs/prismadb';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const userCount = await prisma.user.count();

        if (userCount === 0) {
          throw new Error('No user found, please register first');
        }

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        if (user?.email !== process.env.NEXTAUTH_ADMIN_EMAIL) {
          throw new Error(
            'You are not the owner of this site or your credentials are invalid'
          );
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isValidPassword) {
          throw new Error('Invalid credentials');
        }

        //Look into this causing an error with authorize
        return user as any;
      },
    }),
  ],

  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      console.log('TOKEN', token);
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      console.log('SESSION', session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// https://stackoverflow.com/questions/74089665/next-auth-credentials-provider-authorize-type-error
