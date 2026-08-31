import type { StructureResolver } from "sanity/structure";

const PAGE_LABELS: Record<string, string> = {
  services: "Services Page",
  blog: "Blog Page",
  about: "About Page",
  contact: "Contact Page",
  "personal-pain-management": "Personal Pain Management Page",
  results: "Results Page",
  "equine-body-work": "Equine Body Work Page",
};

export const structure: StructureResolver = (S) =>
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
      S.listItem().title("Services").child(S.documentTypeList("service").title("Services")),
      S.listItem().title("Blog Posts").child(S.documentTypeList("post").title("Blog Posts")),
      S.listItem().title("Testimonials").child(S.documentTypeList("testimonial").title("Testimonials")),
      S.listItem().title("FAQ").child(S.documentTypeList("faqItem").title("FAQ")),
      S.listItem().title("Pricing").child(S.documentTypeList("pricingRow").title("Pricing")),
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
