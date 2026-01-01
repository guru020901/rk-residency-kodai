import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google"; // Using Lato as a clean sans
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kodai Luxury Resort",
  description: "Experience silence and mist in Kodaikanal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${lato.variable} font-sans bg-kp-cream text-kp-dark antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
