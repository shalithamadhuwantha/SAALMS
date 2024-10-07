import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {NextauthProvider} from "./Providers"

const inter = Inter({ subsets: ["latin"] });
const APP_NAME = "SA&LMS";
const APP_DEFAULT_TITLE = "SAALMS- Student Attendance & Lecture Management System";
const APP_TITLE_TEMPLATE = "%s - SA&LMS";
const APP_DESCRIPTION = "SAALMS- Student Attendance & Lecture Management System By Group 11";


export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
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
