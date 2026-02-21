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
  metadataBase: new URL("https://heykronos.com"),
  title: {
    default: "KRONOS - AI Life Coach for the Unreasonably Ambitious",
    template: "%s | KRONOS",
  },
  description:
    "AI life coach that confronts you, tracks moonshot goals, and turns timeblocking into accountability.",
  applicationName: "KRONOS",
  keywords: [
    "AI life coach",
    "moonshot goals",
    "accountability",
    "timeblocking",
    "productivity",
    "goal tracking",
  ],
  authors: [{ name: "KRONOS" }],
  creator: "KRONOS",
  openGraph: {
    type: "website",
    url: "https://heykronos.com",
    title: "KRONOS - AI Life Coach for the Unreasonably Ambitious",
    description:
      "AI life coach that confronts you, tracks moonshot goals, and turns timeblocking into accountability.",
    siteName: "KRONOS",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "KRONOS - Always seek the asymmetric outcome",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KRONOS - AI Life Coach for the Unreasonably Ambitious",
    description:
      "AI life coach that confronts you, tracks moonshot goals, and turns timeblocking into accountability.",
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
    "AI life coach that confronts you, tracks moonshot goals, and turns timeblocking into accountability.",
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
