import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Fraunces, Nunito } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";
import { stegaClean } from "next-sanity";
import SmoothScroll from "@/components/SmoothScroll";
import { SiteSettingsProvider } from "@/sanity/lib/SiteSettingsProvider";
import { SiteTextProvider } from "@/sanity/lib/SiteTextProvider";
import { EditModeProvider } from "@/sanity/lib/EditMode";
import { getSiteSettings, getSiteText } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { SanityLive } from "@/sanity/lib/live";
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

const FALLBACK_TITLE = "Pain & Wellness Solutions | Bowen Therapy, Stirling ON";
const FALLBACK_DESCRIPTION =
  "Kathy Morton is a certified Bowen and myoskeletal therapist in Stirling, ON. Drug-free pain relief for people, horses, and dogs. Serving Hastings County.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.seoTitle ? stegaClean(settings.seoTitle) : FALLBACK_TITLE;
  const description = settings.seoDescription ? stegaClean(settings.seoDescription) : FALLBACK_DESCRIPTION;
  const shareImage = settings.ogImage
    ? urlForImage(settings.ogImage).width(1200).height(630).fit("crop").url()
    : "/og-image.jpg";

  return {
    metadataBase: new URL("https://painandwellnesssolutions.ca"),
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://painandwellnesssolutions.ca",
      siteName: "Pain & Wellness Solutions",
      locale: "en_CA",
      type: "website",
      images: [{ url: shareImage, width: 1200, height: 630, alt: "Pain & Wellness Solutions" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, text] = await Promise.all([getSiteSettings(), getSiteText()]);
  const { isEnabled: editing } = await draftMode();
  return (
    <html lang="en" className={`${fraunces.variable} ${nunito.variable}`}>
      <body>
        <SmoothScroll />
        <EditModeProvider editing={editing}>
          <SiteSettingsProvider settings={settings}>
            <SiteTextProvider text={text}>{children}</SiteTextProvider>
          </SiteSettingsProvider>
        </EditModeProvider>
        <SanityLive />
        <VisualEditing />
      </body>
    </html>
  );
}
