import UsersRepository from "@/app/repositories/users";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await UsersRepository.login({
          email: credentials!.email,
          password: credentials!.password,
        });
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn(params) {
      const exist = await UsersRepository.getUser({
        email: params.profile?.email,
      });
      if (!exist && params.account?.provider === "google") {
        await UsersRepository.createUser({
          email: params.user.email!,
          password: params.user.id,
          name: params.user.name!,
        });
      }
      return true;
    },
  },
};
