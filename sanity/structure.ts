import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

const PAGE_LABELS: Record<string, string> = {
  services: "Services Page",
  blog: "Blog Page",
  about: "About Page",
  contact: "Contact Page",
  "personal-pain-management": "Personal Pain Management Page",
  results: "Results Page",
  "equine-body-work": "Equine Body Work Page",
};

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Homepage (Hero, About, Herd sections)")
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.divider(),
      orderableDocumentListDeskItem({ type: "service", title: "Services (drag to reorder)", S, context }),
      S.listItem().title("Blog Posts").child(S.documentTypeList("post").title("Blog Posts")),
      orderableDocumentListDeskItem({ type: "testimonial", title: "Testimonials (drag to reorder)", S, context }),
      orderableDocumentListDeskItem({ type: "faqItem", title: "FAQ (drag to reorder)", S, context }),
      orderableDocumentListDeskItem({ type: "pricingRow", title: "Pricing (drag to reorder)", S, context }),
      S.divider(),
      S.listItem()
        .title("Other Pages (header banner + sections)")
        .child(
          S.list()
            .title("Other Pages (header banner + sections)")
            .items(
              Object.entries(PAGE_LABELS).map(([slug, label]) =>
                S.listItem()
                  .title(label)
                  .child(S.document().schemaType("pageContent").documentId(`pageContent-${slug}`))
              )
            )
        ),
    ]);
