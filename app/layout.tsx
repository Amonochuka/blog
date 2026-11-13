import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beard & Diapers",
  description: "A Christian Social Advocacy movement advancing hope where people live, learn, heal, and belong.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${fraunces.variable} antialiased`}
    >
      <body suppressHydrationWarning className={`${dmSans.className} flex min-h-screen flex-col bg-be-100 dark:bg-be-900`}>
        <Header />

        <main className="min-w-0 flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
