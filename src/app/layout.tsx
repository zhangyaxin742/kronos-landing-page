import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kronos.app"),
  title: {
    default: "KRONOS - Premium Timeblocking & Productivity",
    template: "%s | KRONOS",
  },
  description:
    "Premium timeblocking and productivity tooling for teams and individuals who demand precision.",
  applicationName: "KRONOS",
  keywords: [
    "timeblocking",
    "productivity",
    "calendar",
    "focus",
    "schedule",
  ],
  authors: [{ name: "KRONOS" }],
  creator: "KRONOS",
  openGraph: {
    type: "website",
    url: "https://kronos.app",
    title: "KRONOS - Premium Timeblocking & Productivity",
    description:
      "Premium timeblocking and productivity tooling for teams and individuals who demand precision.",
    siteName: "KRONOS",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "KRONOS - Time, Mastered",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KRONOS - Premium Timeblocking & Productivity",
    description:
      "Premium timeblocking and productivity tooling for teams and individuals who demand precision.",
    images: ["/og-image.svg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "KRONOS",
  description:
    "Premium timeblocking and productivity tooling for teams and individuals who demand precision.",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web",
  url: "https://heykronos.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="kronos-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
