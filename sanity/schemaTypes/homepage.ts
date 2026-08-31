import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero Headline (3 lines)",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().length(3),
    }),
    defineField({ name: "heroSubheading", title: "Hero Subheading", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: "heroPhoto", title: "Hero Photo", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({
      name: "heroCards",
      title: "Hero Floating Cards (3)",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "eyebrow", title: "Eyebrow", type: "string" },
          { name: "title", title: "Title", type: "string" },
        ],
      }],
      validation: (Rule) => Rule.required().length(3),
    }),
    defineField({ name: "aboutHeading", title: "About Heading", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "aboutParagraph", title: "About Paragraph", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: "aboutQuote", title: "About Quote", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: "aboutPhoto", title: "About Photo", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({
      name: "whatToExpectBlocks",
      title: "What to Expect Blocks (2)",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "heading", title: "Heading", type: "string" },
          { name: "paragraph", title: "Paragraph", type: "text", rows: 3 },
          { name: "photo", title: "Photo", type: "image", options: { hotspot: true } },
          {
            name: "imageSide",
            title: "Image Side",
            type: "string",
            options: { list: [{ title: "Left", value: "left" }, { title: "Right", value: "right" }] },
          },
        ],
      }],
      validation: (Rule) => Rule.required().length(2),
    }),
    defineField({ name: "herdHeading", title: "Healing with the Herd Heading", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "herdParagraph", title: "Healing with the Herd Paragraph", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: "herdPhoto", title: "Healing with the Herd Photo", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({
      name: "herdDetails",
      title: "Healing with the Herd Detail Rows (3)",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "label", title: "Label", type: "string" },
          { name: "value", title: "Value", type: "string" },
        ],
      }],
      validation: (Rule) => Rule.required().length(3),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
