"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const CanineSVG = () => (
  <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%", opacity: 0.18 }} aria-hidden>
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
    <g transform="translate(86 130)" opacity="0.7">
      <path d="M0 18l14 0l-14 20l14 0" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M-22 0l8 0l-8 12l8 0" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <g transform="translate(380 120)" opacity="0.5">
      <circle cx="0" cy="4" r="10" stroke="#ffffff" strokeWidth="2" />
      <circle cx="-16" cy="-14" r="6" stroke="#ffffff" strokeWidth="2" />
      <circle cx="16" cy="-14" r="6" stroke="#ffffff" strokeWidth="2" />
      <circle cx="-8" cy="-26" r="5" stroke="#ffffff" strokeWidth="2" />
      <circle cx="10" cy="-26" r="5" stroke="#ffffff" strokeWidth="2" />
    </g>
  </svg>
);

const panels = [
  {
    num: "01",
    tag: "Human Therapy",
    heading: "When the body has been carrying pain for too long.",
    body: "Chronic back pain, sciatica, migraines, jaw tension, sports injuries — Bowen therapy works where other treatments haven't. Gentle, drug-free, and it addresses the root cause rather than masking it.",
    facts: ["Bowen therapy", "Myoskeletal alignment technique", "Scar tissue release", "Reiki & energy work", "Ionized foot detox", "Tuning fork sound therapy"],
    cta: "Book an appointment",
    href: "https://app.setmore.com/painandwellnesssolutions",
    photo: { src: "/photos/Untitled-design-5-e1749224624391-768x841.png", alt: "Kathy performing Bowen therapy on a patient" },
    imageLeft: true,
    dark: false,
    bg: "var(--cream)",
    contentBg: "#ffffff",
    accent: "var(--teal)",
    accentRaw: "oklch(52% 0.055 200)",
  },
  {
    num: "02",
    tag: "Equine Bodywork",
    heading: "When your horse isn't moving the way they used to.",
    body: "Reluctance on the lead, behavioural changes under saddle, post-injury stiffness. Kathy comes to your farm — no trailering, no stress. Her cattle-sorting background means horses trust her fast.",
    facts: ["Bowen therapy (equine)", "Myofascial kinetic lines", "Musculoskeletal unwinding", "Tensegrity work", "Mobile farm visits — Hastings County"],
    cta: "Call to arrange a visit",
    href: "tel:6138851311",
    photo: { src: "/photos/Family-is-Everything-1-819x1024.png", alt: "Kathy doing equine Bowen therapy in a barn" },
    imageLeft: false,
    dark: true,
    bg: "oklch(22% 0.055 195)",
    contentBg: "oklch(22% 0.055 195)",
    accent: "oklch(70% 0.08 150)",
    accentRaw: "oklch(70% 0.08 150)",
  },
  {
    num: "03",
    tag: "Canine Bowen",
    heading: "When your dog is slowing down before their time.",
    body: "The same gentle nervous-system approach — adapted for dogs. Hip dysplasia, post-surgical recovery, anxiety, age-related mobility. In-clinic or home visits. Dogs often respond within a single session.",
    facts: ["Bowen therapy (canine)", "Hip dysplasia & joint issues", "Post-surgical recovery", "Anxiety & nervous system regulation", "In-clinic or home visits"],
    cta: "Book a canine session",
    href: "https://app.setmore.com/painandwellnesssolutions",
    photo: null,
    imageLeft: true,
    dark: false,
    bg: "var(--cream-warm)",
    contentBg: "var(--cream-warm)",
    accent: "var(--teal)",
    accentRaw: "oklch(52% 0.055 200)",
  },
];

function Panel({ p, index }: { p: typeof panels[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const textColor = p.dark ? "oklch(96% 0.012 82)" : "var(--ink)";
  const textSoft = p.dark ? "oklch(96% 0.012 82 / 0.6)" : "var(--ink-soft)";
  const borderColor = p.dark ? "oklch(96% 0.012 82 / 0.12)" : "var(--cream-edge)";

  return (
    <div
      ref={ref}
      style={{
        background: p.bg,
        display: "grid",
        gridTemplateColumns: p.photo
          ? p.imageLeft ? "54fr 46fr" : "46fr 54fr"
          : "42fr 58fr",
        minHeight: 560,
        position: "relative",
        overflow: "hidden",
      }}
      className="services-panel"
    >
      {/* ── Photo column ── */}
      {p.photo ? (
        <div
          style={{
            order: p.imageLeft ? 1 : 2,
            position: "relative",
            overflow: "hidden",
          }}
          className="services-photo"
        >
          {/* Parallax photo */}
          <motion.div style={{ position: "absolute", inset: "-8%", y: photoY }}>
            <Image
              src={p.photo.src}
              alt={p.photo.alt}
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              priority={index === 0}
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </motion.div>

          {/* Inner edge gradient — blends photo into content area */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: p.imageLeft
                ? `linear-gradient(to right, transparent 55%, ${p.contentBg} 100%)`
                : `linear-gradient(to left, transparent 55%, ${p.contentBg} 100%)`,
              pointerEvents: "none",
            }}
          />

        </div>
      ) : (
        /* Canine teal art column */
        <div
          style={{
            order: 1,
            position: "relative",
            overflow: "hidden",
            background: `linear-gradient(145deg, oklch(52% 0.055 200), oklch(38% 0.07 200))`,
            minHeight: 420,
          }}
          className="services-photo"
        >
          {/* Radial glow */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(55% 55% at 35% 40%, oklch(78% 0.03 195 / 0.35), transparent 70%)",
            }}
          />
          {/* Canine SVG watermark */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
            <div style={{ width: "min(90%, 480px)", aspectRatio: "4/3" }}>
              <CanineSVG />
            </div>
          </div>
          {/* Gradient edge blend */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to right, transparent 60%, ${p.contentBg} 100%)`,
              pointerEvents: "none",
            }}
          />
        </div>
      )}

      {/* ── Content column ── */}
      <motion.div
        initial={{ opacity: 0, x: p.imageLeft ? 32 : -32 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{
          order: p.imageLeft ? 2 : 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(3rem, 6vw, 5rem) clamp(2.5rem, 5vw, 4.5rem)",
          position: "relative",
          zIndex: 1,
        }}
        className="services-content"
      >
        {/* Tag */}
        <div style={{ marginBottom: "1.25rem" }}>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: p.accent,
            }}
          >
            {p.tag}
          </span>
        </div>

        {/* Heading */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)",
            fontWeight: 400,
            color: textColor,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
            maxWidth: "26ch",
          }}
        >
          {p.heading}
        </h3>

        {/* Body */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9375rem",
            lineHeight: 1.75,
            color: textSoft,
            maxWidth: "42ch",
            marginBottom: "1.75rem",
          }}
        >
          {p.body}
        </p>

        {/* Fact list — dash style, no chips */}
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "2.25rem",
          }}
        >
          {p.facts.map((f) => (
            <li
              key={f}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: textSoft,
              }}
            >
              <span style={{ width: 18, height: 1.5, background: p.accent, display: "inline-block", flexShrink: 0, borderRadius: 1 }} />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={p.href}
          target={p.href.startsWith("http") ? "_blank" : undefined}
          rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            alignSelf: "flex-start",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.875rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.9375rem",
            fontWeight: 600,
            color: p.dark ? "#ffffff" : "#ffffff",
            background: p.accent,
            padding: "0.875rem 1.75rem",
            borderRadius: 999,
            transition: "transform 0.25s ease, opacity 0.25s ease",
            transform: hovered ? "translateY(-2px)" : "translateY(0)",
            opacity: hovered ? 0.9 : 1,
          }}
        >
          {p.cta}
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
            <path d="M1 6h13M14 6L9 1M14 6L9 11" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </motion.div>
    </div>
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
    <section id="services" style={{ position: "relative", overflow: "hidden" }}>
      {/* Section header */}
      <div
        ref={ref}
        style={{
          background: "var(--cream)",
          padding: "clamp(5rem, 9vw, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 5vw, 4rem)",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--teal-accent)",
              marginBottom: "1rem",
            }}
          >
            What brings you here
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "var(--ink)",
              marginBottom: "1rem",
              maxWidth: "18ch",
            }}
          >
            Three ways the work shows up.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
              lineHeight: 1.65,
              color: "var(--ink-soft)",
              maxWidth: 540,
            }}
          >
            People come carrying pain. Horses come carrying tension. Dogs come carrying age.
            The body knows what to do — Bowen therapy gives it the room.
          </p>
        </motion.div>
      </div>

      {/* Full-bleed panels */}
      <div>
        {panels.map((p, i) => (
          <Panel key={p.num} p={p} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .services-panel {
            grid-template-columns: 1fr !important;
          }
          .services-photo {
            order: 1 !important;
            min-height: 320px !important;
          }
          .services-content {
            order: 2 !important;
          }
        }
      `}</style>
    </section>
  );
}
