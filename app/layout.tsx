import type { Metadata } from "next";
import { Unbounded, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getSiteSettings } from "@/lib/settings";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700", "800", "900"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Биулу Моторс — автомобили из Китая под ключ",
  description:
    "ООО «Биулу Моторс» — подбор, выкуп и доставка новых автомобилей из Китая в Беларусь под ключ.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  const themeStyle = {
    "--brand-primary": settings.colorPrimary,
    "--brand-secondary": settings.colorSecondary,
    "--brand-accent": settings.colorAccent,
    "--brand-bg": settings.colorBg,
  } as React.CSSProperties;

  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${manrope.variable} h-full antialiased`}
      style={themeStyle}
    >
      <body className="flex min-h-full flex-col bg-bg text-secondary">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
