import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";

import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pracify - AI-Powered Voice Mock Interviews",
    template: "%s | Pracify",
  },
  description: "Practice job interviews with our AI voice interviewer. Get instant feedback, track progress, and ace your next interview with confidence.",
  keywords: ["mock interview", "AI interview practice", "voice interview", "job interview preparation", "interview coaching", "interview feedback"],
  authors: [{ name: "Pracify" }],
  openGraph: {
    title: "Pracify - AI-Powered Voice Mock Interviews",
    description: "Practice job interviews with our AI voice interviewer. Get instant feedback and ace your next interview.",
    url: "https://pracify.com",
    siteName: "Pracify",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pracify - AI-Powered Voice Mock Interviews",
    description: "Practice job interviews with our AI voice interviewer.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.className} antialiased pattern`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
