import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { portfolioData } from "@/lib/data";

import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"]
});

const bodyFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL(portfolioData.site.url),
  title: {
    default: portfolioData.site.title,
    template: `%s | ${portfolioData.name}`
  },
  description: portfolioData.site.description,
  keywords: [...portfolioData.site.keywords],
  alternates: {
    canonical: portfolioData.site.canonicalUrl
  },
  openGraph: {
    type: "website",
    url: portfolioData.site.canonicalUrl,
    title: portfolioData.site.title,
    description: portfolioData.site.description,
    siteName: portfolioData.name,
    images: [
      {
        url: portfolioData.site.ogImage,
        width: 1200,
        height: 630,
        alt: portfolioData.site.title
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioData.site.title,
    description: portfolioData.site.description,
    images: [portfolioData.site.ogImage]
  },
  icons: {
    icon: "/favicon.svg"
  }
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} bg-bg-void font-body text-text-primary antialiased selection:bg-accent-cyan/20 selection:text-text-primary`}
      >
        <CustomCursor />
        <div className="relative z-10 min-h-screen overflow-x-clip">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
