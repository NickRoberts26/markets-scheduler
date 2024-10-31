import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Nunito } from 'next/font/google';

// Define the font with desired styles
const nunito = Nunito({
  subsets: ['latin'],   // Specify subsets like 'latin' or 'cyrillic' based on the font
  weight: '400',        // Optionally, specify font weights like '400', '700', etc.
});

export const metadata: Metadata = {
  title: "Marketeer",
  description: "Market booking platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
