import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { staticText } from "@/components/utils/staticText";
import SearchBar from "@/components/SearchBar";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen isolate overflow-hidden border-b border-gray-200 bg-white">
          <NavBar />
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-24 sm:pb-32 lg:flex gap-16 lg:px-8 lg:py-24">
            <div className="w-full h-full flex flex-col items-center gap-4">
              <h1 className="tracking-tight text-4xl sm:text-6xl font-bold">
                {staticText.title}
              </h1>
              <p className="max-w-xl text-center text-lg text-slate-700">
                {staticText.description}
              </p>
              <div className="mx-auto mt-16 w-full max-w-2xl flex flex-col">
                <SearchBar />
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
