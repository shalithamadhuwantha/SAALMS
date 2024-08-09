import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {NextauthProvider} from "./Providers"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SAALMS- Student Attendance & Lecture Management System",
  description: "SAALMS- Student Attendance & Lecture Management System By Group 11",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      <NextauthProvider>
        {children}
        </NextauthProvider>
        </body>
    </html>
  );
}
