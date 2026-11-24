import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { HowTo } from "./components/HowTo";

const PAGE_LABELS: Record<string, string> = {
  services: "Services page",
  blog: "Blog page",
  about: "About page",
  contact: "Contact page",
  "personal-pain-management": "Personal Pain Management page",
  results: "Results page",
  "equine-body-work": "Equine Body Work page",
};

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Your website")
    .items([
      S.listItem().title("How to edit your website").child(S.component(HowTo).title("How to edit your website")),
      S.divider(),
      S.listItem().title("Blog posts").child(S.documentTypeList("post").title("Blog posts")),
      orderableDocumentListDeskItem({ type: "service", title: "Services", S, context }),
      orderableDocumentListDeskItem({ type: "testimonial", title: "Testimonials", S, context }),
      orderableDocumentListDeskItem({ type: "faqItem", title: "Questions & answers (FAQ)", S, context }),
      orderableDocumentListDeskItem({ type: "pricingRow", title: "Prices", S, context }),
      S.divider(),
      S.listItem()
        .title("Homepage")
        .child(S.document().schemaType("homepage").documentId("homepage").title("Homepage")),
      S.listItem()
        .title("Other pages")
        .child(
          S.list()
            .title("Other pages")
            .items(
              Object.entries(PAGE_LABELS).map(([slug, label]) =>
                S.listItem()
                  .title(label)
                  .child(S.document().schemaType("pageContent").documentId(`pageContent-${slug}`).title(label))
              )
            )
        ),
      S.divider(),
      S.listItem()
        .title("Buttons & menu words")
        .child(S.document().schemaType("siteText").documentId("siteText").title("Buttons & menu words")),
      S.listItem()
        .title("Phone, address, hours & logo")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Phone, address, hours & logo")),
    ]);
