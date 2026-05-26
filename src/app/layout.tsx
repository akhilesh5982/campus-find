// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CompareProvider } from "@/contexts/CompareContext";
import Navbar from "@/components/Navbar";
import CompareBar from "@/components/college/CompareBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CampusFind - Discover Your Perfect College",
  description: "Search, compare, and find the best colleges in India",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <AuthProvider>
          <CompareProvider>
            <Navbar />
            <main>{children}</main>
            <CompareBar />
          </CompareProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
