import { defineField, defineType } from "sanity";
import { validateImageQuality } from "./validateImageQuality";
import { AutoSlugInput } from "../components/AutoSlugInput";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fieldsets: [
    {
      name: "extras",
      title: "Fills in by itself (open only if you want to change it)",
      options: { collapsible: true, collapsed: true },
    },
  ],
  initialValue: () => ({ date: new Date().toISOString().slice(0, 10), readMin: 3 }),
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "The name of your blog post.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Main photo",
      description: "Shown at the top of the post and on the blog page. A wide photo works best.",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required().custom(validateImageQuality).warning(),
    }),
    defineField({
      name: "excerpt",
      title: "Short summary",
      description: "One or two sentences. Shown under the title on the blog page.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Your writing",
      description: "Use Heading for section titles.",
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
    defineField({
      name: "slug",
      title: "Web address",
      description: "Made from the title automatically.",
      type: "slug",
      fieldset: "extras",
      components: { input: AutoSlugInput },
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date shown on the post",
      type: "date",
      fieldset: "extras",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readMin",
      title: "Minutes to read",
      type: "number",
      fieldset: "extras",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "description",
      title: "Google description",
      description: "Optional. If left empty, the short summary is used.",
      type: "text",
      rows: 2,
      fieldset: "extras",
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
