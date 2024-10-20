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

  // callbacks: {
  //   async signIn({ user, account }) {
  //     const { email, name, image } = user;
  //     const university = "rusl";
  //     const faculty = "FOT";
  //     console.log("User:", user);
  //     console.log("Account:", account);

  //     if (account.provider === "google") {
  //       try {
  //         const res = await fetch("http://localhost:3001/api/student", {
  //           method: "POST",
  //           headers: {
  //             "content-type": "application/json",
  //           },
  //           body: JSON.stringify({ email, name, image, university, faculty }),
  //         });

  //         if (res.ok) {
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       } catch (error) {
  //         console.error("Error during sign-in:", error);
  //         return false;
  //       }
  //     }
  //     return false;
  //   },
  // },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
