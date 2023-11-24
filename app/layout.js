import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chaos Generator",
  description: "Generate a random chaos space marine concept.",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="dracula" lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
