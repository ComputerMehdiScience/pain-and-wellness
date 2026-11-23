import { defineField, defineType } from "sanity";
import { TEXT_FIELDS, TEXT_GROUPS } from "../lib/siteTextSpec";

const linkItem = (name: string) => ({
  type: "object",
  name,
  fields: [
    defineField({ name: "label", title: "Words shown", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "href",
      title: "Goes to",
      description: "A page on this site (like /services) or a full web address.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

const linkList = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    description,
    type: "array",
    of: [linkItem(`${name}Item`)],
    group: "menu",
  });

export const siteText = defineType({
  name: "siteText",
  title: "Buttons & Labels",
  type: "document",
  groups: TEXT_GROUPS.map((g, i) => ({ name: g.name, title: g.title, default: i === 0 })),
  fields: [
    linkList("navLinks", "Top menu links", "The links across the top of every page. Drag to reorder."),
    linkList("footerServiceLinks", "Footer: Services column links", "The list under Services at the bottom of every page."),
    linkList("footerExploreLinks", "Footer: Explore column links", "The list under Explore at the bottom of every page."),
    linkList("footerLegalLinks", "Footer: bottom line links", "The small links at the very bottom of every page."),
    defineField({
      name: "aboutStats",
      title: "Meet Kathy: the three facts",
      description: "The three big facts under Kathy's story on the homepage.",
      type: "array",
      group: "home",
      of: [
        {
          type: "object",
          name: "aboutStat",
          fields: [
            defineField({ name: "value", title: "Big word or number", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "label", title: "Small words under it", type: "string", validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),
    ...TEXT_FIELDS.map((f) => {
      const field = f as { key: string; title: string; group: string; long?: boolean; help?: string };
      return defineField({
        name: field.key,
        title: field.title,
        description: field.help,
        type: field.long ? "text" : "string",
        rows: field.long ? 2 : undefined,
        group: field.group,
      });
    }),
  ],
  preview: {
    prepare() {
      return { title: "Buttons & Labels" };
    },
  },
});
