import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SANN404 Finance",
  description: "Premium Dark Fintech UI",
  manifest: "/manifest.json",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
  themeColor: "#0B0F19",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.className} bg-[#020617] min-h-screen flex justify-center overflow-hidden`}>
        {/* Container Mobile Premium */}
        <div className="w-full max-w-[420px] bg-[#0B0F19] h-[100dvh] shadow-2xl shadow-black relative flex flex-col border-x border-slate-800/50">
          {children}
        </div>
      </body>
    </html>
  );
}
