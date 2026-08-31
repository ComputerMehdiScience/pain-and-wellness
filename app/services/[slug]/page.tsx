import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getService, getServiceSlugsForBuild, getSiteSettings, bookHref } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await getServiceSlugsForBuild();
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [svc, settings] = await Promise.all([getService(slug), getSiteSettings()]);
  if (!svc) notFound();

  return (
    <>
      <Nav />
      <main style={{ minHeight: "100vh", background: "var(--warm-cream)", paddingTop: 76 }}>

      {/* Back nav */}
      <div style={{ padding: "1.5rem clamp(1.5rem, 4vw, 3rem)", maxWidth: 1200, margin: "0 auto" }}>
        <Link href="/services" style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          fontWeight: 500,
          color: "var(--earth-soft)",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          textDecoration: "none",
        }}>
          ← Back
        </Link>
      </div>

      {/* Hero */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 clamp(1.5rem, 4vw, 3rem)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(3rem, 6vw, 7rem)",
        alignItems: "center",
        paddingBottom: "clamp(4rem, 8vw, 7rem)",
      }}>
        <div>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--sage)",
            marginBottom: "1rem",
          }}>
            Service
          </p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--deep-forest)",
            marginBottom: "1.25rem",
          }}>
            {svc.name}
          </h1>
          <p style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "clamp(1.1rem, 1.8vw, 1.375rem)",
            color: "var(--forest)",
            marginBottom: "2rem",
            lineHeight: 1.4,
          }}>
            {svc.tagline}
          </p>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            fontWeight: 300,
            lineHeight: 1.85,
            color: "var(--earth-soft)",
            marginBottom: "2.5rem",
            maxWidth: "52ch",
          }}>
            {svc.fullDescription}
          </p>

          {svc.price ? (
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "var(--teal-deep)",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--teal-deep)", display: "inline-block" }} />
              {svc.price}
            </p>
          ) : (
            <a
              href={`tel:${settings.phoneTel}`}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: "var(--earth-soft)",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 10.83a19.79 19.79 0 01-3.07-8.67A2 2 0 012.4 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.5 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" fill="var(--teal-deep)" />
              </svg>
              Priced individually. Call for pricing.
            </a>
          )}

          <a
            href={bookHref(svc, settings)}
            target={svc.bookingMethod === "online" ? "_blank" : undefined}
            rel={svc.bookingMethod === "online" ? "noopener noreferrer" : undefined}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              fontWeight: 700,
              color: "var(--cream)",
              background: "var(--teal)",
              padding: "0.875rem 2.25rem",
              borderRadius: 6,
              display: "inline-block",
              letterSpacing: "0.01em",
              boxShadow: "0 4px 16px oklch(42% 0.06 200 / 0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            {svc.bookingMethod === "call" ? "Call to book" : "Book this service"}
          </a>
        </div>

        <div className="photo-pop" style={{ aspectRatio: "4/5", position: "relative" }}>
          <Image
            src={urlForImage(svc.photo).width(960).height(1200).fit("crop").url()}
            alt={svc.name}
            fill
            priority
            sizes="(max-width: 860px) 90vw, 45vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Details */}
      <div style={{
        background: "var(--warm-stone)",
        padding: "clamp(4rem, 7vw, 6rem) 0",
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 3rem)" }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 400,
            color: "var(--deep-forest)",
            marginBottom: "2rem",
            letterSpacing: "-0.01em",
          }}>
            What to know
          </h2>
          <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none" }}>
            {svc.details.map(d => (
              <li key={d} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "var(--sage)", flexShrink: 0, marginTop: "0.5rem",
                }} />
                <span style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: "var(--earth-soft)",
                }}>
                  {d}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      </main>
      <Footer />
    </>
  );
}
