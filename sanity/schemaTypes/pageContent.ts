import { defineField, defineType } from "sanity";
import { validateImageQuality } from "./validateImageQuality";

export const pageContent = defineType({
  name: "pageContent",
  title: "Page Content",
  type: "document",
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "Services", value: "services" },
          { title: "Blog", value: "blog" },
          { title: "About", value: "about" },
          { title: "Contact", value: "contact" },
          { title: "Personal Pain Management", value: "personal-pain-management" },
          { title: "Results", value: "results" },
          { title: "Equine Body Work", value: "equine-body-work" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "header",
      title: "Page Header (top banner)",
      description: "The big banner at the top of this page only — separate from the homepage.",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "image", title: "Image", type: "image", options: { hotspot: true } },
        { name: "note", title: "Note", type: "string" },
        { name: "body", title: "Body Paragraph", type: "text", rows: 2 },
      ],
    }),
    defineField({
      name: "sections",
      title: "Content Sections (below the header)",
      description: "Image + text blocks shown below the page header, in order.",
      type: "array",
      of: [{
        type: "object",
        name: "section",
        fields: [
          { name: "eyebrow", title: "Eyebrow", type: "string" },
          { name: "heading", title: "Heading", type: "string" },
          {
            name: "paragraphs",
            title: "Paragraphs",
            type: "array",
            of: [{ type: "text", rows: 3 }],
          },
          { name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.custom(validateImageQuality).warning() },
          {
            name: "imageSide",
            title: "Image Side",
            type: "string",
            options: { list: [{ title: "Left", value: "left" }, { title: "Right", value: "right" }] },
          },
        ],
        preview: { select: { title: "heading" } },
      }],
    }),
    defineField({
      name: "listSections",
      title: "List Sections",
      description: "For simple bullet-point sections (e.g. \"What people come in for\", \"At your first visit\"). Used only on the Personal Pain Management page.",
      type: "array",
      of: [{
        type: "object",
        name: "listSection",
        fields: [
          { name: "heading", title: "Heading", type: "string" },
          { name: "items", title: "List Items", type: "array", of: [{ type: "string" }] },
          { name: "footnote", title: "Footnote", type: "string" },
          { name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.custom(validateImageQuality).warning() },
          {
            name: "imageSide",
            title: "Image Side",
            type: "string",
            options: { list: [{ title: "Left", value: "left" }, { title: "Right", value: "right" }] },
          },
        ],
        preview: { select: { title: "heading" } },
      }],
    }),
    defineField({
      name: "ctaOverride",
      title: "CTA Override",
      description: "Leave empty to use the site-wide default CTA text.",
      type: "object",
      fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "body", title: "Body", type: "text", rows: 2 },
      ],
    }),
  ],
  preview: {
    select: { title: "page" },
  },
});
