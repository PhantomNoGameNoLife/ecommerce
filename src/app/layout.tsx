import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/_components/navbar/navbar";
import ReduxProvider from "@/app/_provider/ReduxProvider";
import ThemeProvider from "@/app/_provider/ThemeProvider";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ReduxProvider is use client commponent because of  redux-persist */}
        <ReduxProvider>
          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
