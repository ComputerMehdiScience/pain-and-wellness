import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";
import { validateImageQuality } from "./validateImageQuality";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    orderRankField({ type: "service" }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required().custom(validateImageQuality).warning(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "Short line shown at the top of this service's own page.",
      type: "string",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      description: "The compact blurb shown on the homepage carousel card.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      description: "The longer paragraph shown on the services list page and this service's own page.",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "details",
      title: "Detail Bullet Points",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "price",
      title: "Price",
      description: "Leave blank to show \"Call for pricing\" instead.",
      type: "string",
    }),
    defineField({
      name: "bookingMethod",
      title: "Booking Method",
      type: "string",
      options: {
        list: [
          { title: "Book online (Setmore)", value: "online" },
          { title: "Call to book", value: "call" },
        ],
        layout: "radio",
      },
      initialValue: "call",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "name", media: "photo", subtitle: "price" },
  },
});
