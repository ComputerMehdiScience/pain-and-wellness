import type { Image, PortableTextBlock } from "sanity";

export type SanityService = {
  _id: string;
  name: string;
  slug: string;
  order: number;
  photo: Image;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  details: string[];
  price?: string;
  bookingMethod: "online" | "call";
};

export type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  readMin: number;
  photo: Image;
  excerpt: string;
  description: string;
  body: PortableTextBlock[];
};

export type SiteSettings = {
  phoneDisplay: string;
  phoneTel: string;
  address: string;
  addressMapUrl: string;
  hours: string;
  bookingUrl: string;
  instagramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  footerTagline: string;
  defaultCtaTitle: string;
  defaultCtaBody: string;
};

export type Testimonial = {
  _id: string;
  name: string;
  quote: string;
  photo: Image;
};

export type FaqItem = {
  _id: string;
  question: string;
  answer: string;
};

export type PricingRow = {
  _id: string;
  label: string;
  note: string;
  price: string;
  unit: string;
};

export type Homepage = {
  heroHeadline: [string, string, string];
  heroSubheading: string;
  heroPhoto: Image;
  heroCards: { eyebrow: string; title: string }[];
  aboutHeading: string;
  aboutParagraph: string;
  aboutQuote: string;
  aboutPhoto: Image;
  whatToExpectBlocks: { heading: string; paragraph: string; photo: Image; imageSide: "left" | "right" }[];
  herdHeading: string;
  herdParagraph: string;
  herdPhoto: Image;
  herdDetails: { label: string; value: string }[];
};

export type PageContentSection = {
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  image?: Image;
  imageSide?: "left" | "right";
};

export type PageContentListSection = {
  heading: string;
  items: string[];
  footnote?: string;
  image?: Image;
  imageSide?: "left" | "right";
};

export type PageContent = {
  page: string;
  header: {
    eyebrow: string;
    title: string;
    image?: Image;
    note: string;
    body: string;
  };
  sections: PageContentSection[];
  listSections: PageContentListSection[];
  ctaOverride?: { title: string; body: string };
};

export function bookHref(
  service: Pick<SanityService, "bookingMethod">,
  settings: Pick<SiteSettings, "bookingUrl" | "phoneTel">
) {
  return service.bookingMethod === "online" ? settings.bookingUrl : `tel:${settings.phoneTel}`;
}
