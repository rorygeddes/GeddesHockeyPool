import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geddes Hockey Pool",
  description: "NHL Playoff Pool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} min-h-screen bg-gray-200`}>
        <Navigation />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
