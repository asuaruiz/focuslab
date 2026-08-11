import type { Metadata } from "next";
import { Montserrat, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/ui/WhatsAppFAB";
import { getSiteUrl } from "@/lib/site";
import { getLocale } from "@/lib/i18n";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Focus Labs Media Group — Productora Audiovisual Independiente",
    template: "%s | Focus Labs Media Group",
  },
  description:
    "Focus Labs Media Group transforma la imaginación en experiencias significativas a través de fotografía, video cinematográfico y estrategia de marca.",
  openGraph: {
    type: "website",
    siteName: "Focus Labs Media Group",
    locale: "es",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getLocale();
  return (
    <html lang={locale} className={`${montserrat.variable} ${inter.variable} ${playfair.variable}`}>
      <body className="bg-black text-white">
        <Navbar locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
        <WhatsAppFAB locale={locale} />
      </body>
    </html>
  );
}
