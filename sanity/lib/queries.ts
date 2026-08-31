import type { Image, PortableTextBlock } from "sanity";
import { client } from "./client";

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

const serviceProjection = `{
  _id,
  name,
  "slug": slug.current,
  order,
  photo,
  tagline,
  shortDescription,
  fullDescription,
  details,
  price,
  bookingMethod
}`;

const postProjection = `{
  _id,
  title,
  "slug": slug.current,
  date,
  readMin,
  photo,
  excerpt,
  description,
  body
}`;

export async function getServices(): Promise<SanityService[]> {
  return client.fetch(`*[_type == "service"] | order(order asc) ${serviceProjection}`);
}

export async function getService(slug: string): Promise<SanityService | null> {
  return client.fetch(
    `*[_type == "service" && slug.current == $slug][0] ${serviceProjection}`,
    { slug }
  );
}

export async function getPosts(): Promise<SanityPost[]> {
  return client.fetch(`*[_type == "post"] | order(date desc) ${postProjection}`);
}

export async function getPost(slug: string): Promise<SanityPost | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] ${postProjection}`,
    { slug }
  );
}

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

export async function getSiteSettings(): Promise<SiteSettings> {
  return client.fetch(`*[_type == "siteSettings"][0]{
    phoneDisplay, phoneTel, address, addressMapUrl, hours, bookingUrl,
    instagramUrl, facebookUrl, youtubeUrl, footerTagline,
    defaultCtaTitle, defaultCtaBody
  }`);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(`*[_type == "testimonial"] | order(order asc){ _id, name, quote, photo }`);
}

export async function getFaqItems(): Promise<FaqItem[]> {
  return client.fetch(`*[_type == "faqItem"] | order(order asc){ _id, question, answer }`);
}

export async function getPricingRows(): Promise<PricingRow[]> {
  return client.fetch(`*[_type == "pricingRow"] | order(order asc){ _id, label, note, price, unit }`);
}

export async function getHomepage(): Promise<Homepage> {
  return client.fetch(`*[_type == "homepage"][0]{
    heroHeadline, heroSubheading, heroPhoto, heroCards,
    aboutHeading, aboutParagraph, aboutQuote, aboutPhoto,
    whatToExpectBlocks, herdHeading, herdParagraph, herdPhoto, herdDetails
  }`);
}

export async function getPageContent(page: string): Promise<PageContent> {
  return client.fetch(`*[_type == "pageContent" && page == $page][0]{
    page, header, sections, listSections, ctaOverride
  }`, { page });
}

export function bookHref(
  service: Pick<SanityService, "bookingMethod">,
  settings: Pick<SiteSettings, "bookingUrl" | "phoneTel">
) {
  return service.bookingMethod === "online" ? settings.bookingUrl : `tel:${settings.phoneTel}`;
}
