import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";

import "./globals.css";

const playfair = localFont({
  src: [
    {
      path: "./fonts/PlayfairDisplay-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "./fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pandaslab.dev"),
  title: "Andy Mills | Software Engineer",
  description:
    "Andy Mills - software engineer in Oklahoma City building practical AI tools, real-time systems, and production web apps.",
  openGraph: {
    title: "Andy Mills | Software Engineer",
    description:
      "Software engineer building useful AI tools, real-time systems, and production web apps.",
    url: "https://pandaslab.dev",
    siteName: "pandaslab.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andy Mills | Software Engineer",
    description:
      "Software engineer building useful AI tools, real-time systems, and production web apps.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.className} ${playfair.variable}`}>{children}</body>
    </html>
  );
}
