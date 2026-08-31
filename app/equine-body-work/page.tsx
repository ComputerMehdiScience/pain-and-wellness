import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import { SplitPanel } from "@/components/JourneySections";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getPageContent } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60;

export default async function EquineBodyWorkPage() {
  const content = await getPageContent("equine-body-work");
  const { header, sections, ctaOverride } = content;
  const panel = sections[0];

  return (
    <>
      <Nav />
      <main>
        <PageHeader
          eyebrow={header.eyebrow}
          title={header.title}
          image={header.image ? urlForImage(header.image).width(860).height(1075).fit("crop").url() : undefined}
          imageAlt={header.title}
          note={header.note}
        >
          {header.body}
        </PageHeader>
        {panel && (
          <SplitPanel
            eyebrow={panel.eyebrow}
            title={panel.heading}
            image={panel.image ? urlForImage(panel.image).width(1120).height(840).fit("crop").url() : ""}
            imageAlt={panel.heading}
          >
            {panel.paragraphs.map((p) => (
              <p key={p} style={{ marginTop: p === panel.paragraphs[0] ? 0 : "1rem" }}>{p}</p>
            ))}
          </SplitPanel>
        )}
        <CTA title={ctaOverride?.title} body={ctaOverride?.body} />
      </main>
      <Footer />
    </>
  );
}
