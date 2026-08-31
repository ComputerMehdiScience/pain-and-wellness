import { defineField, defineType } from "sanity";
import { validateImageQuality } from "./validateImageQuality";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero (top banner)", default: true },
    { name: "about", title: "Meet Kathy section" },
    { name: "whatToExpect", title: "What to Expect section" },
    { name: "herd", title: "Healing with the Herd section" },
  ],
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Headline (3 lines)",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().length(3),
      group: "hero",
    }),
    defineField({ name: "heroSubheading", title: "Subheading", type: "text", rows: 3, validation: (Rule) => Rule.required(), group: "hero" }),
    defineField({ name: "heroPhoto", title: "Photo", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required().custom(validateImageQuality).warning(), group: "hero" }),
    defineField({
      name: "heroCards",
      title: "Floating Cards (3)",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "eyebrow", title: "Eyebrow", type: "string" },
          { name: "title", title: "Title", type: "string" },
        ],
      }],
      validation: (Rule) => Rule.required().length(3),
      group: "hero",
    }),
    defineField({ name: "aboutHeading", title: "Heading", type: "string", validation: (Rule) => Rule.required(), group: "about" }),
    defineField({ name: "aboutParagraph", title: "Paragraph", type: "text", rows: 3, validation: (Rule) => Rule.required(), group: "about" }),
    defineField({ name: "aboutQuote", title: "Quote", type: "text", rows: 3, validation: (Rule) => Rule.required(), group: "about" }),
    defineField({ name: "aboutPhoto", title: "Photo", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required().custom(validateImageQuality).warning(), group: "about" }),
    defineField({
      name: "whatToExpectBlocks",
      title: "Blocks (2)",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "heading", title: "Heading", type: "string" },
          { name: "paragraph", title: "Paragraph", type: "text", rows: 3 },
          { name: "photo", title: "Photo", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.custom(validateImageQuality).warning() },
          {
            name: "imageSide",
            title: "Image Side",
            type: "string",
            options: { list: [{ title: "Left", value: "left" }, { title: "Right", value: "right" }] },
          },
        ],
      }],
      validation: (Rule) => Rule.required().length(2),
      group: "whatToExpect",
    }),
    defineField({ name: "herdHeading", title: "Heading", type: "string", validation: (Rule) => Rule.required(), group: "herd" }),
    defineField({ name: "herdParagraph", title: "Paragraph", type: "text", rows: 3, validation: (Rule) => Rule.required(), group: "herd" }),
    defineField({ name: "herdPhoto", title: "Photo", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required().custom(validateImageQuality).warning(), group: "herd" }),
    defineField({
      name: "herdDetails",
      title: "Detail Rows (3)",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "label", title: "Label", type: "string" },
          { name: "value", title: "Value", type: "string" },
        ],
      }],
      validation: (Rule) => Rule.required().length(3),
      group: "herd",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
