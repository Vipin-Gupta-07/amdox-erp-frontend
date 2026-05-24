import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amdox ERP Suite | AI-Powered Cloud Enterprise Resource Planning",
  description:
    "Next-generation intelligent resource planning platform delivering financial management, supply chain automation, HR & payroll, project tracking, and business intelligence.",
  keywords: ["ERP", "Enterprise", "AI", "Cloud", "Finance", "HR", "Supply Chain", "Amdox"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
