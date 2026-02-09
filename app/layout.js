import { Inter } from "next/font/google";
import "./globals.css";

import Header from "./components/header";
import Footer from "./components/footer";

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chapter Generator",
  description:
    "An unofficial fan tool for creating custom Space Marine chapters. Generate random colors or design your own from scratch.",
  creator: "James",
  publisher: "James",
  keywords: "Space Marines, Chapter Generator, Paint Schemes, Color Schemes, Customization, Chapter Creator, Painting Guide, Hobby Tools, Miniature Painting, Chapter Customizer, Hobbyist Tools",
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  openGraph: {
    title: "Chapter Generator",
    description:
      "Use Chapter Generator to build unique paint schemes for your loyalist or chaos force. Unofficial fan tool for warhammer hobbyists.",
    url: "https://chapter-gen.jsundby.dev",
    siteName: "Chapter Generator",
    images: [
      {
        url: "https://chapter-gen.jsundby.dev/card.png",
        width: 1200,
        height: 630,
        alt: "Line-art image of a Space Marine. Text overlay: Stuck with primer? Generate a chapter and break the block.",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Chapter Generator, the Unofficial Warhammer Paint Scheme Generator", description:
      "Design a Space Marine chapter or Chaos warband with random or manual color schemes. An unofficial tool for warhammer inspiration.",
    images: [
      {
        url: "https://chapter-gen.jsundby.dev/card.png",
        alt: "Line-art image of a Space Marine. Text overlay: Stuck with primer? Generate a chapter and break the block.",
      }
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="container mx-auto px-4 md:px-8 flex flex-col flex-1 justify-center gap-4 md:gap-8">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
