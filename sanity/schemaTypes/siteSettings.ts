import { defineField, defineType } from "sanity";

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
    defineField({ name: "defaultCtaTitle", title: "Default CTA Title", description: "Shown at the bottom of most pages, unless a page overrides it.", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "defaultCtaBody", title: "Default CTA Body", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
