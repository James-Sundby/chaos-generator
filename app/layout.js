import { Inter } from "next/font/google";
import "./globals.css";

import Header from "./components/header";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chaos Generator",
  description: "Generate a random chaos space marine concept.",
  // authors: [{ name: "" }],
  // creator: "",
  // publisher: "",
  // icons: {
  //   icon: [
  //     { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  //     { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
  //     { url: '/favicon.ico', sizes: 'any' }
  //   ],
  //   apple: [
  //     { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
  //   ],
  //   other: [
  //     { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
  //     { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
  //   ]
  // },
  // openGraph: {
  //   title: "",
  //   description: "",
  //   url: "",
  //   siteName: "",
  //   images: [
  //     {
  //       url: "",
  //       width: 800,
  //       height: 400,
  //       alt: "",
  //     },
  //   ],
  //   locale: 'en_US',
  //   type: 'website',
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: "",
  //   description: "",
  //   images: [""],
  // },
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="dracula" lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
