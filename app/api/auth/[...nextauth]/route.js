// File: app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
import User from '@/app/utilis/model/user'; // Adjust path as needed
import { connectToDB } from '@/app/utilis/mongodb'; // Adjust path as needed

const handler = NextAuth({
  providers: [
    // Credentials Provider
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error('Email and Password are required');
        }

        try {
          await connectToDB();

          // Check if user exists in the database
          const user = await User.findOne({ email: credentials.email });
          
          if (user && await bcrypt.compare(credentials.password, user.password)) {
            return {
              email: user.email,
              username: user.username || 'User',
            };
          }

          // Create new user if not exists
          if (!user) {
            const hashedPassword = await bcrypt.hash(credentials.password, 10);

            const newUser = new User({
              email: credentials.email,
              username: credentials.email.split('@')[0], // Default username
              password: hashedPassword,
            });

            await newUser.save();

            return {
              email: newUser.email,
              username: newUser.username,
            };
          }

          return null;
        } catch (error) {
          console.error('Authentication Error:', error);
          throw new Error('Authentication failed');
        }
      },
    }),

    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid profile email',
        },
      },
    }),
  ],
  pages: {
    signIn: '/signin', // Adjust as needed
    error: '/auth/error', // Adjust as needed
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        await connectToDB();

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = new User({
            email: user.email,
            username: user.name || 'User',
            // No password for Google users
          });

          await newUser.save();
        }
      }

      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          email: token.email,
          username: token.username || 'User',
        };
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
