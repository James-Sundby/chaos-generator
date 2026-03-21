import { Inter } from "next/font/google";
import "./globals.css";

import Header from "./components/header";
import Footer from "./components/footer";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://chapter-gen.jsundby.dev"),

  title: {
    default: "Chapter Generator",
    template: "%s | Chapter Generator",
  },

  description:
    "An unofficial Warhammer hobby tool for generating and customizing paint schemes for Space Marine chapters, Chaos warbands, and xenos forces.",

  applicationName: "Chapter Generator",
  creator: "James",
  publisher: "James",
  authors: [{ name: "James" }],
  category: "games",

  keywords: [
    "space marine chapter generator",
    "warhammer chapter generator",
    "chapter generator warhammer",
    "space marine chapter creator",
    "space marine chapter maker",
    "warhammer paint scheme generator",
    "chaos warband generator",
    "warhammer 40k paint schemes",
    "miniature painting tool",
    "chapter creator",
  ],

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Chapter Generator",
    title: "Chapter Generator",
    description:
      "Generate custom Space Marine chapters, Chaos warbands, and other Warhammer-inspired paint schemes.",
    images: [
      {
        url: "/card.png",
        width: 1200,
        height: 630,
        alt: "Line-art image of a Space Marine. Text overlay: Stuck with primer? Generate a chapter and break the block.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Chapter Generator",
    description:
      "Generate custom Space Marine chapters, Chaos warbands, and other Warhammer-inspired paint schemes.",
    images: ["/card.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="chaos">
      <body className={`${inter.className} min-h-screen bg-base-200 text-base-content antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 md:px-8 md:py-10">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}