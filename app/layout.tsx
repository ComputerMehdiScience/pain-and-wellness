import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://painandwellnesssolutions.ca"),
  title: "Pain & Wellness Solutions | Bowen Therapy · Stirling, Ontario",
  description:
    "Kathy Morton is a certified Bowen and myoskeletal therapist in Stirling, ON. Drug-free pain relief for people, horses, and dogs. Serving Hastings County.",
  openGraph: {
    title: "Pain & Wellness Solutions | Bowen Therapy in Stirling, Ontario",
    description:
      "Certified Bowen and myoskeletal therapy for people, horses, and dogs in Stirling and Hastings County, Ontario.",
    url: "https://painandwellnesssolutions.ca",
    siteName: "Pain & Wellness Solutions",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/photos/hero-photo.png",
        width: 1254,
        height: 1254,
        alt: "Kathy Morton giving a Bowen therapy treatment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pain & Wellness Solutions | Bowen Therapy · Stirling, Ontario",
    description:
      "Certified Bowen and myoskeletal therapy for people, horses, and dogs in Stirling, Ontario.",
    images: ["/photos/hero-photo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${nunito.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
