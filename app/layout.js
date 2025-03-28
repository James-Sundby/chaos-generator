import { Inter } from "next/font/google";
import "./globals.css";

import Header from "./components/header";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chapter Generator",
  description: "Generate a random Space Marine chapter, or create and customize your own Space Marine chapter with our open painter.",
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
    description: "Generate a random Space Marine chapter, or create and customize your own Space Marine chapter with our open painter.",
    url: "https://chaos-generator.vercel.app",
    siteName: "Chapter Generator",
    images: [
      {
        url: "/card.png",
        width: 1200,
        height: 600,
        alt: "Grey card with 6 randomly generated space marine colour schemes",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Chapter Generator",
    description: "Generate a random Space Marine chapter, or create and customize your own Space Marine chapter with our open painter.",
    images: ["/card.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="business" lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
