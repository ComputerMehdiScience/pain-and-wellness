"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const CanineSVG = () => (
  <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%", opacity: 0.22 }} aria-hidden>
    <path d="M360 280c8-30 4-62-18-86-24-26-62-40-100-38-38 4-72 24-92 54-10 15-16 32-16 50 0 14 6 24 20 28l186 8c14 0 24-8 20-16z"
      stroke="#ffffff" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M192 228c-18-4-34 4-44 18-8 10-12 24-8 38 2 6 6 12 14 14l66 6"
      stroke="#ffffff" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M156 242c-8 0-12 2-16 6" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
    <path d="M224 218c-4-20 4-38 18-48 6-4 14-4 20 2 6 4 10 14 6 26-2 8-8 12-14 14"
      stroke="#ffffff" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M168 270c6-4 14-4 20 0" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="152" cy="276" r="6" fill="#ffffff" />
    <path d="M200 308c18-6 38-6 54 0M218 316c-4 6-4 14 0 20M254 316c-4 6-4 14 0 20"
      stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
    <path d="M360 280c16 6 28 20 32 38 4 15-4 30-18 38-10 4-20 0-26-8-4-6-2-16 4-20"
      stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const cards = [
  {
    tag: "Human Therapy",
    heading: "When the body has been carrying pain for too long.",
    body: "Bowen therapy works where other treatments haven't. It addresses root cause rather than masking symptoms. Drug-free, gentle, and lasting.",
    facts: [
      "Bowen therapy",
      "Myoskeletal alignment technique",
      "Scar tissue release",
      "Reiki & energy work",
      "Ionized foot detox",
      "Tuning fork sound therapy",
    ],
    cta: "Book an appointment",
    href: "https://app.setmore.com/painandwellnesssolutions",
    photo: {
      src: "/photos/Untitled-design-5-e1749224624391-768x841.png",
      alt: "Kathy performing Bowen therapy on a patient",
    },
  },
  {
    tag: "Equine Bodywork",
    heading: "When your horse isn't moving the way they used to.",
    body: "Reluctance on the lead, post-injury stiffness, behavioural changes under saddle. Kathy comes to your farm with no trailering and no stress.",
    facts: [
      "Bowen therapy (equine)",
      "Myofascial kinetic lines",
      "Musculoskeletal unwinding",
      "Tensegrity work",
      "Mobile farm visits, Hastings County",
    ],
    cta: "Call to arrange a visit",
    href: "tel:6138851311",
    photo: {
      src: "/photos/Family-is-Everything-1-819x1024.png",
      alt: "Kathy doing equine Bowen therapy in a barn",
    },
  },
  {
    tag: "Canine Bowen",
    heading: "When your dog is slowing down before their time.",
    body: "The same gentle nervous-system approach, adapted for dogs. Hip dysplasia, post-surgical recovery, anxiety, age-related mobility.",
    facts: [
      "Bowen therapy (canine)",
      "Hip dysplasia & joint issues",
      "Post-surgical recovery",
      "Anxiety & nervous system regulation",
      "In-clinic or home visits",
    ],
    cta: "Book a canine session",
    href: "https://app.setmore.com/painandwellnesssolutions",
    photo: null,
  },
];

function ServiceCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      style={{
        background: "#ffffff",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 2px 12px oklch(42% 0.06 200 / 0.08), 0 1px 3px oklch(42% 0.06 200 / 0.06)",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        ...(hovered ? {
          boxShadow: "0 8px 32px oklch(42% 0.06 200 / 0.14), 0 2px 8px oklch(42% 0.06 200 / 0.08)",
          transform: "translateY(-4px)",
        } : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo / art area */}
      <div style={{ position: "relative", height: 260, flexShrink: 0, overflow: "hidden" }}>
        {card.photo ? (
          <Image
            src={card.photo.src}
            alt={card.photo.alt}
            fill
            sizes="(max-width: 900px) 100vw, 33vw"
            priority={index === 0}
            style={{
              objectFit: "cover",
              objectPosition: "center top",
              transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(145deg, oklch(52% 0.055 200), oklch(38% 0.07 200))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(60% 60% at 40% 45%, oklch(78% 0.03 195 / 0.4), transparent 70%)",
              }}
            />
            <div style={{ width: "75%", aspectRatio: "4/3", position: "relative", zIndex: 1 }}>
              <CanineSVG />
            </div>
          </div>
        )}

        {/* Tag pill over photo */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            background: "oklch(97% 0.008 90 / 0.92)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: 999,
            padding: "0.3rem 0.9rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--teal-deep)",
          }}
        >
          {card.tag}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "1.75rem 1.875rem 2rem",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.2rem, 1.6vw, 1.4rem)",
            fontWeight: 400,
            color: "var(--teal-deep)",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            marginBottom: "0.75rem",
          }}
        >
          {card.heading}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            lineHeight: 1.7,
            color: "var(--ink-soft)",
            marginBottom: "1.25rem",
          }}
        >
          {card.body}
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--cream-edge)", marginBottom: "1.25rem" }} />

        {/* Skills */}
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.45rem",
            marginBottom: "1.75rem",
            flex: 1,
          }}
        >
          {card.facts.map((f) => (
            <li
              key={f}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.8375rem",
                color: "var(--ink-soft)",
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 1.5,
                  background: "var(--teal-accent)",
                  display: "inline-block",
                  flexShrink: 0,
                  borderRadius: 1,
                }}
              />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={card.href}
          target={card.href.startsWith("http") ? "_blank" : undefined}
          rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.625rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "#ffffff",
            background: "var(--teal)",
            padding: "0.8rem 1.5rem",
            borderRadius: 999,
            transition: "background 0.25s ease",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--teal-deep)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--teal)")}
        >
          {card.cta}
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
            <path d="M1 5h11M12 5L8 1M12 5L8 9" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="services"
      style={{
        background: "var(--cream)",
        padding: "clamp(5rem, 9vw, 8rem) clamp(2.5rem, 6vw, 6rem)",
      }}
    >
      {/* Section header */}
      <div ref={ref} style={{ textAlign: "center", marginBottom: "clamp(3rem, 5vw, 4.5rem)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.75rem, 5.5vw, 4.75rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: "1.125rem",
            }}
          >
            <span style={{ fontWeight: 600, color: "var(--teal-deep)" }}>Bowen therapy</span>
            {" "}for people, horses, and dogs.
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
              lineHeight: 1.7,
              color: "var(--ink-soft)",
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            People come carrying pain. Horses come carrying tension. Dogs come carrying age.
            The body knows what to do. Bowen therapy gives it the room.
          </p>
        </motion.div>
      </div>

      {/* Card grid */}
      <div
        className="services-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(1.25rem, 2.5vw, 2rem)",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {cards.map((card, i) => (
          <ServiceCard key={card.tag} card={card} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            max-width: 520px !important;
          }
        }
        @media (min-width: 600px) and (max-width: 900px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            max-width: 860px !important;
          }
        }
      `}</style>
    </section>
  );
}
