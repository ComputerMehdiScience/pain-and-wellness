import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          eyebrow="Contact"
          title="The right next step should be obvious."
          image="/photos/kathy-horse-barn.png"
          imageAlt="Kathy working with a horse"
          imagePosition="center 30%"
          note="Book online for clinic care. Call for animals and farm visits."
        >
          Clinic appointments can be booked online. For equine bodywork, canine
          Bowen, Healing with the Herd, or farm visits, call Kathy directly.
        </PageHeader>
        <section
          style={{
            background: "var(--warm-stone)",
            padding: "clamp(3.5rem, 7vw, 5.5rem) clamp(1.5rem, 4vw, 3rem)",
          }}
        >
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(2rem, 5vw, 4rem)",
            }}
            className="contact-grid"
          >
            {[
              ["Phone", "613-885-1311", "tel:6138851311"],
              ["Clinic", "89 Salem Road, Stirling, ON", "https://maps.google.com/?q=89+Salem+Road+Stirling+ON"],
              ["Instagram", "@painandwellnesssolutions", "https://instagram.com/painandwellnesssolutions"],
              ["Facebook", "@painandwellnesssolutions", "https://facebook.com/painandwellnesssolutions"],
            ].map(([label, value, href]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  borderTop: "1px solid var(--cream-edge)",
                  padding: "1.25rem 0",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--teal)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.25rem, 2vw, 1.6rem)",
                    lineHeight: 1.25,
                    color: "var(--deep-forest)",
                  }}
                >
                  {value}
                </p>
              </a>
            ))}
          </div>
          <style>{`
            @media (max-width: 720px) {
              .contact-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
