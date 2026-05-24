import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const services: Record<string, {
  name: string;
  tagline: string;
  description: string;
  details: string[];
  photo: string;
  objectPosition: string;
  zoom: number;
  bookHref: string;
}> = {
  "bowen-myoskeletal-therapy": {
    name: "Bowen & Myoskeletal Therapy",
    tagline: "Gets to the root of it, not just where it hurts.",
    description: "Bowen therapy uses small, precise moves on your muscles and connective tissue, with rests in between that give your body time to respond. No cracking. No heavy pressure. No pain. Most people are surprised by how much better they feel, even after the first session.",
    details: [
      "Addresses chronic back pain, sciatica, migraines, jaw tension, and sports injuries",
      "First sessions are 60–75 minutes",
      "Wear comfortable, loose clothing",
      "No referral needed",
    ],
    photo: "/photos/Bowenmyoskeletal.png",
    objectPosition: "60% 85%",
    zoom: 1.3,
    bookHref: "https://app.setmore.com/painandwellnesssolutions",
  },
  "healing-with-the-herd": {
    name: "Healing with the Herd",
    tagline: "One of the only things like it in Ontario.",
    description: "Time with Kathy's horses and tuning fork sound therapy on the farm. Horses pick up on how you are feeling and respond to it. There is nothing quite like it for people who are burned out, grieving, or just running on empty.",
    details: [
      "Private sessions held at Kathy's farm near Stirling",
      "Ideal for burnout, anxiety, grief, and chronic stress",
      "Combines equine-assisted work with sound therapy",
      "Seasonal availability. Call to discuss booking.",
      "No horse experience required",
    ],
    photo: "/photos/Family-is-Everything-1-819x1024.png",
    objectPosition: "25% center",
    zoom: 1,
    bookHref: "tel:6138851311",
  },
  "scar-tissue-release": {
    name: "Scar Tissue Release",
    tagline: "McLoughlin Scar Tissue Release Method.",
    description: "Old scars can quietly cause problems far from where they are. This gentle technique works on the scar tissue itself, not just the surface. It reduces tenderness, helps the tissue move freely again, and often brings back movement people had written off years ago.",
    details: [
      "Effective on surgical, traumatic, and burn scars",
      "Works on scars of any age, even decades old",
      "Painless and non-invasive",
      "Often produces immediate change in tissue feel and mobility",
      "Can be combined with Bowen therapy in the same session",
    ],
    photo: "/photos/scartissueservice.png",
    objectPosition: "65% 85%",
    zoom: 1.2,
    bookHref: "https://app.setmore.com/painandwellnesssolutions",
  },
  "reiki": {
    name: "Reiki",
    tagline: "Quiet. Gentle. Does more than it looks like.",
    description: "Reiki is a hands-off or very light touch practice that a lot of people have not tried before. Good for stress, anxiety, trouble sleeping, and recovery from hard times. Fully clothed, no pressure, nothing uncomfortable. Most people walk out feeling noticeably calmer.",
    details: [
      "Ideal for stress, anxiety, trauma recovery, and burnout",
      "Fully clothed, gentle touch or no-touch technique",
      "Sessions typically 45–60 minutes",
      "Can be combined with other therapies",
      "Safe for all ages including children and seniors",
    ],
    photo: "/photos/Reiki.png",
    objectPosition: "55% 90%",
    zoom: 1.15,
    bookHref: "https://app.setmore.com/painandwellnesssolutions",
  },
  "ionized-foot-detox": {
    name: "Ionized Foot Detox",
    tagline: "A warm soak that does a little more than relax your feet.",
    description: "A warm foot bath with ionized water. Comfortable, simple, and a good add-on to any session. The water changes colour as it works. A lot of people just book it because it feels good.",
    details: [
      "30-minute session",
      "Warm, comfortable foot bath",
      "Often combined with other treatments",
      "Supports detoxification and energy flow",
      "Visible results in the water. Your session is unique to you.",
    ],
    photo: "/photos/ionized footbath.png",
    objectPosition: "25% 75%",
    zoom: 1.2,
    bookHref: "https://app.setmore.com/painandwellnesssolutions",
  },
  "equine-bodywork": {
    name: "Equine Bodywork",
    tagline: "Your horse deserves the same care you do.",
    description: "Kathy has been around horses her whole life. She addresses stiffness, uneven movement, reluctance under saddle, and behaviour changes that showed up after an injury. Horses settle quickly with her. She comes to you.",
    details: [
      "Farm visits across Hastings County. No trailering required.",
      "Addresses reluctance, stiffness, head-shying, and gait irregularities",
      "Post-surgical recovery and rehabilitation",
      "Call to arrange a farm visit",
      "Kathy has been working with horses since childhood",
    ],
    photo: "/photos/kathy-horse-barn.png",
    objectPosition: "30% center",
    zoom: 1.1,
    bookHref: "tel:6138851311",
  },
  "canine-bowen": {
    name: "Canine Bowen",
    tagline: "The same gentle approach, adapted for dogs.",
    description: "The same gentle moves Kathy uses on people, adapted for dogs. Small, precise touches with rest in between. Dogs often show a real change after just one session.",
    details: [
      "In-clinic or home visits available",
      "Addresses hip dysplasia, joint issues, and mobility",
      "Post-surgical recovery and rehabilitation",
      "Helps with anxiety and nervous system dysregulation",
      "Safe for dogs of all ages and sizes",
    ],
    photo: "/photos/kathy dog.png",
    objectPosition: "center 85%",
    zoom: 1.4,
    bookHref: "https://app.setmore.com/painandwellnesssolutions",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(services).map(slug => ({ slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = services[slug];
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
            {svc.description}
          </p>

          <a
            href={svc.bookHref}
            target={svc.bookHref.startsWith("http") ? "_blank" : undefined}
            rel={svc.bookHref.startsWith("http") ? "noopener noreferrer" : undefined}
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
            {svc.bookHref.startsWith("tel") ? "Call to book" : "Book this service"}
          </a>
        </div>

        <div className="photo-pop" style={{ aspectRatio: "4/5", position: "relative" }}>
          <Image
            src={svc.photo}
            alt={svc.name}
            fill
            priority
            sizes="(max-width: 860px) 90vw, 45vw"
            style={{
              objectFit: "cover",
              objectPosition: svc.objectPosition,
              transform: `scale(${svc.zoom})`,
              transformOrigin: svc.objectPosition,
            }}
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
