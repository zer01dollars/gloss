import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Gloss — Make any selfie look expensive",
  description:
    "Gloss applies premium color grades to your selfies in the browser. 13 looks, fine-tune sliders, and Beautify — Soft Glam to Neon Pop. Made By Zer01 — Artificially Intelligent, Digitally Enhanced.",
  keywords: ["selfie", "filter", "beauty", "gloss", "photo editor", "Zer01"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
