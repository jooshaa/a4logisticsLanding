import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Logit Smartbot — Avtomatik reklama",
  description: "Logistika dispetcherlari uchun avtomatik reklama tarqatish boti",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
