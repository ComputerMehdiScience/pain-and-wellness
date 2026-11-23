import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool, defineLocations, defineDocuments } from "sanity/presentation";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const PAGE_HREF: Record<string, string> = {
  services: "/services",
  blog: "/blog",
  about: "/about",
  contact: "/contact",
  "personal-pain-management": "/personal-pain-management",
  results: "/results",
  "equine-body-work": "/equine-body-work",
};

const pageDoc = (page: string) => ({
  route: PAGE_HREF[page],
  filter: `_type == "pageContent" && page == "${page}"`,
});

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  releases: { enabled: false },
  plugins: [
    // First tool in the list is the one the Studio opens on: the live site editor.
    presentationTool({
      title: "Edit my website",
      previewUrl: {
        origin: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        // Which document opens when you are looking at a given page.
        mainDocuments: defineDocuments([
          { route: "/", filter: `_type == "homepage"` },
          { route: "/services/:slug", filter: `_type == "service" && slug.current == $slug` },
          { route: "/blog/:slug", filter: `_type == "post" && slug.current == $slug` },
          ...Object.keys(PAGE_HREF).map(pageDoc),
        ]),
        // Where each document shows up on the site (the "Documents on this page" list).
        locations: {
          homepage: defineLocations({
            locations: [{ title: "Homepage", href: "/" }],
          }),
          siteSettings: defineLocations({
            message: "Phone, address, hours and buttons used across the whole site",
            locations: [{ title: "Homepage", href: "/" }, { title: "Contact page", href: "/contact" }],
          }),
          service: defineLocations({
            select: { title: "name", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [
                { title: doc?.title || "This service", href: `/services/${doc?.slug}` },
                { title: "Services page", href: "/services" },
                { title: "Homepage", href: "/" },
              ],
            }),
          }),
          post: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [
                { title: doc?.title || "This blog post", href: `/blog/${doc?.slug}` },
                { title: "Blog page", href: "/blog" },
              ],
            }),
          }),
          pageContent: defineLocations({
            select: { page: "page" },
            resolve: (doc) => ({
              locations: doc?.page && PAGE_HREF[doc.page] ? [{ title: "This page", href: PAGE_HREF[doc.page] }] : [],
            }),
          }),
          testimonial: defineLocations({
            locations: [{ title: "Results page", href: "/results" }],
          }),
          faqItem: defineLocations({
            locations: [
              { title: "Homepage", href: "/" },
              { title: "Services page", href: "/services" },
              { title: "Personal Pain Management page", href: "/personal-pain-management" },
            ],
          }),
          pricingRow: defineLocations({
            locations: [{ title: "Services page", href: "/services" }],
          }),
        },
      },
    }),
    structureTool({ structure, title: "All content" }),
  ],
});
