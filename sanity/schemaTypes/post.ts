import { defineField, defineType } from "sanity";
import { validateImageQuality } from "./validateImageQuality";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Publish Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readMin",
      title: "Read Time (minutes)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required().custom(validateImageQuality).warning(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "Shown on the blog listing page.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "SEO / Share Description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: { decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }] },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Publish Date, New First",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "photo", subtitle: "date" },
  },
});
