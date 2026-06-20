import type { Metadata } from "next";
import type { ReactNode } from "react";

import { pixelifySans, playfair } from "./fonts";
import "./globals.css";

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
      <body className={`${playfair.className} ${playfair.variable} ${pixelifySans.variable}`}>
        {children}
      </body>
    </html>
  );
}
