import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Focus Labs — Creative Direction, Strategy & Production",
    template: "%s | Focus Labs Media Group",
  },
  description:
    "Focus Labs transforma imaginación en experiencias significativas a través de narrativa, estrategia, dirección creativa y producción.",
  openGraph: {
    type: "website",
    siteName: "Focus Labs Media Group",
    locale: "es_US",
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
    <html lang={locale} className={`${montserrat.variable} ${inter.variable}`}>
      <body className="bg-black text-white">
        <a className="skip-link" href="#main-content">{locale === "en" ? "Skip to content" : "Saltar al contenido"}</a>
        <Navbar locale={locale} />
        <main id="main-content">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
