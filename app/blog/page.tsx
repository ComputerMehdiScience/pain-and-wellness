import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          eyebrow="Blog"
          title="A place for guidance, not filler."
          image="/photos/placeholders/herd-pasture.png"
          imageAlt="Quiet rural pasture with horses"
          imagePosition="center"
          note="Education section planned for a later content pass"
        >
          Educational posts can be added here when Kathy is ready to move the
          original blog material into the rebuild.
        </PageHeader>
        <section
          style={{
            background: "var(--warm-stone)",
            padding: "clamp(3.5rem, 7vw, 5.5rem) clamp(1.5rem, 4vw, 3rem)",
          }}
        >
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.7rem, 3vw, 2.5rem)",
                color: "var(--deep-forest)",
                lineHeight: 1.18,
              }}
            >
              Blog posts are coming later.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--ink-soft)",
                lineHeight: 1.75,
                marginTop: "1rem",
                maxWidth: "58ch",
              }}
            >
              For now, this page keeps the navigation consistent without adding
              filler content that does not help someone book or understand the
              services.
            </p>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
