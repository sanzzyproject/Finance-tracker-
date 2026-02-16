import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance Tracker by SANN404",
  description: "Dibuat oleh SANN404 FORUM",
  manifest: "/manifest.json",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex justify-center overflow-hidden`}>
        {/* Frame Mobile */}
        <div className="w-full max-w-[420px] bg-white h-[100dvh] shadow-2xl relative flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
