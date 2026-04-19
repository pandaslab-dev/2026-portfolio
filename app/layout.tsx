import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, Instrument_Serif, Sora } from "next/font/google";

import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pandaslab.dev"),
  title: "Andy Mills | Software Engineer",
  description:
    "Software engineering portfolio for Andy Mills — full-stack development, AI-assisted systems, real-time products, and production-ready web applications.",
  openGraph: {
    title: "Andy Mills | Software Engineer",
    description:
      "Full-stack developer building AI-assisted tools, real-time systems, and production-ready web applications.",
    url: "https://pandaslab.dev",
    siteName: "pandaslab.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andy Mills | Software Engineer",
    description:
      "Full-stack developer building AI-assisted tools, real-time systems, and production-ready web applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${sora.variable} ${instrumentSerif.variable} ${plexMono.variable} bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
