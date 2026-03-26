import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "वैश्विक गीता पाठ – Frame Generator",
  description:
    "Create your personalised campaign frame for the Geeta Chanting Mahotsav – Chapter 15 · 8 May",
  openGraph: {
    title: "वैश्विक गीता पाठ कार्यक्रम – I'm Participating",
    description: "Generate your Geeta Chanting campaign frame in Hindi or English.",
    siteName: "Geeta Chanting Frame",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Geeta Chanting Mahotsav – Frame Generator",
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
