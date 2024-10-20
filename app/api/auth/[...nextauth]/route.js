// app\api\auth\[...nextauth]\route.js

import { callback } from "chart.js/helpers";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

const authOptions = {
  // google authenticate SSO
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/',
  },

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
