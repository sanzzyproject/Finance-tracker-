import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance 2026",
  description: "Modern Finance Tracker",
  manifest: "/manifest.json", 
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950 min-h-screen flex justify-center`}>
        <div className="w-full max-w-[420px] bg-slate-50 dark:bg-slate-950 min-h-screen shadow-2xl relative overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
