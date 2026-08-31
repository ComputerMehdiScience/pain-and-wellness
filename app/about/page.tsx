import Image from "next/image";
import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getPageContent } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { stegaClean } from "next-sanity";

export const revalidate = 60;

export default async function AboutPage() {
  const content = await getPageContent("about");
  const { header, sections } = content;
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

        {sections.map((section, i) => {
          const imageLeft = stegaClean(section.imageSide) === "left";
          return (
            <section
              key={section.heading}
              style={{
                background: i % 2 === 0 ? "var(--warm-stone)" : "var(--cream)",
                padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 3rem)",
              }}
            >
              <div
                className="about-grid"
                style={{
                  maxWidth: 1120,
                  margin: "0 auto",
                  display: "grid",
                  gridTemplateColumns: imageLeft ? "minmax(0, 1fr) minmax(0, 0.92fr)" : "minmax(0, 0.92fr) minmax(0, 1.08fr)",
                  gap: "clamp(2rem, 6vw, 5rem)",
                  alignItems: "center",
                }}
              >
                {imageLeft && section.image && (
                  <div className="photo-pop" style={{ position: "relative", aspectRatio: "4 / 5", borderRadius: 16 }}>
                    <Image
                      src={urlForImage(section.image).width(900).height(1125).fit("crop").url()}
                      alt={section.heading}
                      fill
                      sizes="(max-width: 860px) 90vw, 520px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}

                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
                      lineHeight: 1.05,
                      color: "var(--deep-forest)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {section.heading}
                  </h2>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--ink-soft)",
                      lineHeight: 1.8,
                      display: "grid",
                      gap: "1rem",
                    }}
                  >
                    {section.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </div>

                {!imageLeft && section.image && (
                  <div className="photo-pop" style={{ position: "relative", aspectRatio: "4 / 3", borderRadius: 16 }}>
                    <Image
                      src={urlForImage(section.image).width(1120).height(840).fit("crop").url()}
                      alt={section.heading}
                      fill
                      sizes="(max-width: 860px) 90vw, 560px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>
            </section>
          );
        })}

        <CTA />
      </main>
      <Footer />
      <style>{`
        @media (max-width: 860px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
