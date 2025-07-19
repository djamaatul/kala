import UsersRepository from "@/app/repositories/users";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn(params) {
      const exist = await UsersRepository.getUser({
        email: params.profile?.email,
      });
      if (!exist) {
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
