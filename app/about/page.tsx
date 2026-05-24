import Image from "next/image";
import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          eyebrow="Kathy Morton"
          title="About Kathy Morton."
          image="/photos/kathy-portrait.jpg"
          imageAlt="Kathy Morton"
          imagePosition="center top"
          note="Certified Bowen therapist since 2017"
        >
          Kathy&apos;s work is personal, practical, and rooted in years of
          helping people and animals move with less pain and more ease.
        </PageHeader>

        <section
          style={{
            background: "var(--warm-stone)",
            padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 3rem)",
          }}
        >
          <div
            className="about-story-grid"
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.92fr) minmax(0, 1.08fr)",
              gap: "clamp(2rem, 6vw, 5rem)",
              alignItems: "center",
            }}
          >
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
                From animal Bowen to whole-body care.
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
                <p>
                  Kathy began with Animal Bowen certification in 2017, then
                  continued into Bowen therapy, myoskeletal therapy, scar tissue
                  release, and equine-focused bodywork.
                </p>
                <p>
                  That blend matters. Instead of treating one sore spot in
                  isolation, she looks for the way the whole body is adapting:
                  posture, compensation, old injuries, stress, and movement
                  habits.
                </p>
              </div>
            </div>

            <div
              className="photo-pop"
              style={{
                position: "relative",
                aspectRatio: "4 / 3",
                borderRadius: 16,
              }}
            >
              <Image
                src="/photos/placeholders/herd-pasture.png"
                alt="Horses in a quiet rural pasture"
                fill
                sizes="(max-width: 860px) 90vw, 560px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        <section
          style={{
            background: "var(--cream)",
            padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 3rem)",
          }}
        >
          <div
            className="about-personal-grid"
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 0.92fr)",
              gap: "clamp(2rem, 6vw, 5rem)",
              alignItems: "center",
            }}
          >
            <div
              className="photo-pop"
              style={{
                position: "relative",
                aspectRatio: "4 / 5",
                borderRadius: 16,
              }}
            >
              <Image
                src="/photos/kathy-family.png"
                alt="Kathy with her family"
                fill
                sizes="(max-width: 860px) 90vw, 520px"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>

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
                A farm, animals, and a steady way of working.
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
                <p>
                  Kathy lives in Stirling with her husband, Marlo, surrounded by
                  the animals and rural life that shape her work every day.
                </p>
                <p>
                  Her practice is not trying to feel like a spa or a clinic
                  chain. It is local care from someone who understands people,
                  horses, dogs, and the life that happens around them.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
      <style>{`
        @media (max-width: 860px) {
          .about-story-grid,
          .about-personal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
