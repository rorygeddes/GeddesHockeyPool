import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geddes Hockey Pool 2025",
  description: "NHL Playoff Pool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body className={`${inter.className} min-h-screen bg-gray-200 [color-scheme:light]`} style={{ colorScheme: 'light' }}>
        <Navigation />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
