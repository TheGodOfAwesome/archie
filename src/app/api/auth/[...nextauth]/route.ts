import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "MOCK_GITHUB_ID",
      clientSecret: process.env.GITHUB_SECRET || "MOCK_GITHUB_SECRET",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "MOCK_GOOGLE_ID",
      clientSecret: process.env.GOOGLE_SECRET || "MOCK_GOOGLE_SECRET",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development_purposes",
  callbacks: {
    async session({ session, token }) {
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
