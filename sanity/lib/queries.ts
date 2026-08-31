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

export const SETMORE_URL = "https://painandwellnesssolutions.setmore.com/katherinemorton";
export const PHONE_TEL = "tel:6138851311";
export const PHONE_DISPLAY = "613-885-1311";

export function bookHref(service: Pick<SanityService, "bookingMethod">) {
  return service.bookingMethod === "online" ? SETMORE_URL : PHONE_TEL;
}
