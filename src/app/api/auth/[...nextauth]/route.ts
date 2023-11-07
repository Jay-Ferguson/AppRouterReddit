import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
// eslint-disable-next-line no-unused-vars
import { CredentialsProvider } from "next-auth/providers";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
