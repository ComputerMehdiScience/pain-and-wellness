import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Client Name / Result Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({ name: "order", title: "Display Order", type: "number", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "name", media: "photo" },
  },
});
