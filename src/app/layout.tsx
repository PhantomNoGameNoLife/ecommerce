import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/_components/navbar/navbar";
import Providers from "@/Providers/Providers";
import { Toaster } from 'react-hot-toast'
import Footer from "./_components/footer/Footer";
import { Encode_Sans_Expanded } from "next/font/google";


const encodeSans = Encode_Sans_Expanded({
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
  variable: "--font-encode-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart",
  description: "FreshCart is ecommerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${encodeSans.variable} antialiased scrollbar-thin overflow-x-hidden scrollbar-thumb-primary scrollbar-track-background`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <Providers
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Toaster position="bottom-right" />
          <Navbar />
          {children}
          <Footer />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
