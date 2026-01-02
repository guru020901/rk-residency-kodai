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

import { client, urlFor } from "@/lib/sanity";

// Remove static metadata
// export const metadata: Metadata = { ... }

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{
    title,
    favicon
  }`);

  const title = settings?.title || "RK Residency Kodaikanal";
  const icon = settings?.favicon ? urlFor(settings.favicon).width(128).height(128).url() : null;

  return {
    title: title,
    description: "Experience the comfort of home with the luxury of a residency. The perfect homestay in Kodaikanal for families and groups.",
    icons: icon ? {
      icon: icon,
      shortcut: icon,
      apple: icon,
    } : undefined,
  };
}

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
