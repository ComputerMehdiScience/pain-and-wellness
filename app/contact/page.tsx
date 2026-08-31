import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { getPageContent, getSiteSettings } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60;

export default async function ContactPage() {
  const [content, settings] = await Promise.all([getPageContent("contact"), getSiteSettings()]);
  const { header } = content;

  const contactLinks = [
    ["Phone", settings.phoneDisplay, `tel:${settings.phoneTel}`],
    ["Clinic", settings.address, settings.addressMapUrl],
    ...(settings.instagramUrl ? [["Instagram", "@painandwellnesssolutions", settings.instagramUrl]] : []),
    ...(settings.facebookUrl ? [["Facebook", "@painandwellnesssolutions", settings.facebookUrl]] : []),
  ];

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
            {contactLinks.map(([label, value, href]) => (
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

        {/* Message form */}
        <section
          style={{
            background: "var(--cream)",
            padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 4vw, 3rem)",
          }}
        >
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "clamp(1.75rem, 3vw, 2.5rem)" }}>
              <h2 className="section-heading" style={{ marginBottom: "1rem" }}>
                Send a message.
              </h2>
              <p className="section-subhead" style={{ maxWidth: 460, margin: "0 auto" }}>
                Not sure where to start? Send a note and Kathy will point you in the
                right direction.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
