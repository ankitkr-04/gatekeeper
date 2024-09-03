import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    // signIn: "/login",
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',cl
    // newUser: null
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const { email, password } = credentials;

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Check if the password is correct
        const passwordMatch = await compare(password, user.password || "");

        if (passwordMatch) {
          return user;
        } else {
          throw new Error("Invalid password");
        }
      },
    }),
  ],
};
