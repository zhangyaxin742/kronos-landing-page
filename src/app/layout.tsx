import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const viewport = {
  themeColor: "#F5F3F4",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://heykronos.com"),
  title: {
    default: "KRONOS — AI Life Coach for the Unreasonably Ambitious",
    template: "%s | KRONOS",
  },
  description:
    "The AI coach that won't let you settle. Set moonshot goals. Get confronted when you fall short. No coddling.",
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
    title: "KRONOS — Unf*ck your life.",
    description:
      "AI accountability for the unreasonably ambitious.",
    siteName: "KRONOS",
    images: [
      {
        url: "/og/kronos-hero.png",
        width: 1200,
        height: 630,
        alt: "KRONOS — Unf*ck your life.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KRONOS — Unf*ck your life.",
    description:
      "AI accountability for the unreasonably ambitious.",
    images: ["/og/kronos-hero.png"],
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
    "AI accountability for the unreasonably ambitious.",
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
        className={`${jakarta.variable} ${inter.variable} antialiased`}
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
