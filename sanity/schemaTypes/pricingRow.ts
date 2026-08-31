import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const pricingRow = defineType({
  name: "pricingRow",
  title: "Pricing Row",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "note", title: "Note", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "price", title: "Price", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "unit", title: "Unit / Suffix", type: "string", validation: (Rule) => Rule.required() }),
    orderRankField({ type: "pricingRow" }),
  ],
  preview: {
    select: { title: "label", subtitle: "price" },
  },
});
