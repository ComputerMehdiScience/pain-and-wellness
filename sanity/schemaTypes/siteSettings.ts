import { defineField, defineType } from "sanity";
import { validateImageQuality } from "./validateImageQuality";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "phoneDisplay", title: "Phone (display)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "phoneTel", title: "Phone (tel: link, digits only)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "address", title: "Clinic Address", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "addressMapUrl", title: "Address Google Maps URL", type: "url", validation: (Rule) => Rule.required() }),
    defineField({ name: "hours", title: "Business Hours", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "bookingUrl", title: "Online Booking URL (Setmore)", type: "url", validation: (Rule) => Rule.required() }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
    defineField({ name: "youtubeUrl", title: "YouTube URL", type: "url" }),
    defineField({ name: "footerTagline", title: "Footer Tagline", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: "seoTitle", title: "Browser tab and Google title", description: "The title shown on the browser tab and in Google results.", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "seoDescription", title: "Google description", description: "The short description under the title in Google results.", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: "logo", title: "Logo (top left of every page)", type: "image", validation: (Rule) => Rule.custom(validateImageQuality).warning() }),
    defineField({ name: "ogImage", title: "Picture shown when the site is shared", description: "Shows in text messages, Facebook and other places when someone shares the link. Best at 1200 by 630.", type: "image", options: { hotspot: true } }),
    defineField({ name: "defaultCtaTitle", title: "Default CTA Title", description: "Shown at the bottom of most pages, unless a page overrides it.", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "defaultCtaBody", title: "Default CTA Body", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
