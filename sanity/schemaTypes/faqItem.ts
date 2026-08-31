import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
    orderRankField({ type: "faqItem" }),
  ],
  preview: {
    select: { title: "question" },
  },
});
