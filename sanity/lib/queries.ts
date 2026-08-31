import "server-only";
import { sanityFetch } from "./live";
import type {
  SanityService,
  SanityPost,
  SiteSettings,
  Testimonial,
  FaqItem,
  PricingRow,
  Homepage,
  PageContent,
} from "./types";

export * from "./types";

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
  const { data } = await sanityFetch({ query: `*[_type == "service"] | order(order asc) ${serviceProjection}` });
  return data as SanityService[];
}

export async function getService(slug: string): Promise<SanityService | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "service" && slug.current == $slug][0] ${serviceProjection}`,
    params: { slug },
  });
  return data as SanityService | null;
}

export async function getPosts(): Promise<SanityPost[]> {
  const { data } = await sanityFetch({ query: `*[_type == "post"] | order(date desc) ${postProjection}` });
  return data as SanityPost[];
}

export async function getPost(slug: string): Promise<SanityPost | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "post" && slug.current == $slug][0] ${postProjection}`,
    params: { slug },
  });
  return data as SanityPost | null;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data } = await sanityFetch({
    query: `*[_type == "siteSettings"][0]{
      phoneDisplay, phoneTel, address, addressMapUrl, hours, bookingUrl,
      instagramUrl, facebookUrl, youtubeUrl, footerTagline,
      defaultCtaTitle, defaultCtaBody
    }`,
  });
  return data as SiteSettings;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "testimonial"] | order(order asc){ _id, name, quote, photo }`,
  });
  return data as Testimonial[];
}

export async function getFaqItems(): Promise<FaqItem[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "faqItem"] | order(order asc){ _id, question, answer }`,
  });
  return data as FaqItem[];
}

export async function getPricingRows(): Promise<PricingRow[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "pricingRow"] | order(order asc){ _id, label, note, price, unit }`,
  });
  return data as PricingRow[];
}

export async function getHomepage(): Promise<Homepage> {
  const { data } = await sanityFetch({
    query: `*[_type == "homepage"][0]{
      heroHeadline, heroSubheading, heroPhoto, heroCards,
      aboutHeading, aboutParagraph, aboutQuote, aboutPhoto,
      whatToExpectBlocks, herdHeading, herdParagraph, herdPhoto, herdDetails
    }`,
  });
  return data as Homepage;
}

export async function getPageContent(page: string): Promise<PageContent> {
  const { data } = await sanityFetch({
    query: `*[_type == "pageContent" && page == $page][0]{
      page, header, sections, listSections, ctaOverride
    }`,
    params: { page },
  });
  return data as PageContent;
}
