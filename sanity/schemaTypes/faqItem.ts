import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: "order", title: "Display Order", type: "number", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "question" },
  },
});
