import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gita Samarpan – Campaign Frame Generator",
  description:
    "Create your campaign frame for Gita Samarpan – Chinmaya Mission USA's Guinness World Record attempt. 1,08,000 participants chanting Bhagavad Gita Chapter 15. 9 May 2026 · 7:30 PM IST. Free for Indian students.",
  openGraph: {
    title: "Gita Samarpan – I'm Participating! 🏆",
    description:
      "Join Chinmaya Mission USA's Guinness World Record attempt – 1,08,000 people chanting Gita Chapter 15 simultaneously. 9 May 2026. Register free: chinmaya75.org/amrit/cvstudents",
    siteName: "Gita Samarpan Frame",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gita Samarpan – Guinness World Record Attempt",
    description: "Generate your campaign frame and help spread the word!",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#C8410A" />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
