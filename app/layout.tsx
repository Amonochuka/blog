import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";
import type { Metadata } from "next";
import { Caveat, DM_Sans, Nunito } from "next/font/google";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Beard & Diapers",
  description: "A Christian Social Advocacy movement advancing hope where people live, learn, heal, and belong.",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${nunito.variable} ${caveat.variable} antialiased`}
    >
      <body suppressHydrationWarning className={`${dmSans.className} flex min-h-screen flex-col bg-be-100 dark:bg-be-900`}>
        <Header />
        <SectionDivider from="light" />

        <main className="min-w-0 flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
