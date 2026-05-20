"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const audiences = [
  {
    num: "01",
    heading: "I'm dealing with pain.",
    subhead: "Human therapy",
    body: "Chronic back pain, sciatica, migraines, jaw tension, sports injuries — Bowen therapy works where other treatments haven't. Gentle, drug-free, and it addresses the root cause.",
    services: ["Bowen & Myoskeletal Therapy", "Scar Tissue Release", "Reiki", "Ionized Foot Detox"],
    cta: "Book an appointment",
    href: "https://app.setmore.com/painandwellnesssolutions",
    bg: "var(--warm-cream)",
    numColor: "oklch(35% 0.075 155 / 0.12)",
    accentColor: "var(--forest)",
    borderColor: "var(--warm-mid)",
  },
  {
    num: "02",
    heading: "My horse isn't moving right.",
    subhead: "Equine bodywork",
    body: "Reluctance on the lead, behavioural changes under saddle, post-injury stiffness. Kathy visits your farm — no trailering, no stress. Her cattle-sorting background means horses trust her fast.",
    services: ["Farm visits across Hastings County", "Myofascial kinetic lines", "Musculoskeletal unwinding", "Tensegrity work"],
    cta: "Call to arrange a visit",
    href: "tel:6138851311",
    bg: "oklch(92% 0.018 150)",
    numColor: "oklch(35% 0.075 155 / 0.15)",
    accentColor: "var(--forest)",
    borderColor: "oklch(78% 0.035 150)",
  },
  {
    num: "03",
    heading: "My dog is slowing down.",
    subhead: "Canine Bowen",
    body: "The same gentle nervous system approach — adapted for dogs. Hip dysplasia, post-surgical recovery, anxiety, age-related mobility. In-clinic or at your home. Dogs often respond within a single session.",
    services: ["In-clinic or home visits", "Hip dysplasia & joint issues", "Post-surgical recovery", "Anxiety & nervous system regulation"],
    cta: "Book a canine session",
    href: "https://app.setmore.com/painandwellnesssolutions",
    bg: "oklch(95% 0.018 75)",
    numColor: "oklch(68% 0.13 68 / 0.15)",
    accentColor: "oklch(55% 0.11 68)",
    borderColor: "oklch(85% 0.025 75)",
  },
];

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
      ref={ref}
      style={{ background: "var(--warm-stone)", padding: "clamp(5rem, 10vw, 9rem) 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 3rem)" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "clamp(3rem, 5vw, 4.5rem)" }}
        >
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
            fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.1,
            color: "var(--deep-forest)",
          }}>
            What brings you here?
          </h2>
        </motion.div>

        {/* Audience rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {audiences.map((a, i) => (
            <motion.div
              key={a.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 + 0.1 }}
              style={{
                background: a.bg,
                border: `1px solid ${a.borderColor}`,
                borderRadius: 8,
                padding: "clamp(1.75rem, 3.5vw, 2.75rem)",
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "clamp(1.5rem, 3vw, 3rem)",
                alignItems: "center",
              }}
              className="audience-row"
            >
              {/* Number */}
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 10,
                background: a.numColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: a.accentColor,
                  letterSpacing: "0.02em",
                }}>
                  {a.num}
                </span>
              </div>

              {/* Main content */}
              <div style={{ minWidth: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(1.5rem, 3vw, 3rem)", alignItems: "start" }} className="audience-inner">
                <div>
                  <p style={{
                    fontFamily: "var(--font-body)", fontSize: "0.6875rem", fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: a.accentColor, marginBottom: "0.5rem", opacity: 0.75,
                  }}>
                    {a.subhead}
                  </p>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.25rem, 2vw, 1.625rem)",
                    fontWeight: 500, color: "var(--deep-forest)",
                    lineHeight: 1.2, letterSpacing: "-0.01em",
                    marginBottom: "0.875rem",
                  }}>
                    {a.heading}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-body)", fontSize: "0.875rem",
                    fontWeight: 400, lineHeight: 1.75, color: "var(--earth-soft)",
                  }}>
                    {a.body}
                  </p>
                </div>

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {a.services.map(s => (
                    <li key={s} style={{
                      fontFamily: "var(--font-body)", fontSize: "0.875rem",
                      fontWeight: 400, color: "var(--earth-text)",
                      display: "flex", gap: "0.625rem", alignItems: "center",
                    }}>
                      <span style={{
                        width: 5, height: 5, borderRadius: "50%",
                        background: a.accentColor, flexShrink: 0, opacity: 0.7,
                      }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href={a.href}
                target={a.href.startsWith("http") ? "_blank" : undefined}
                rel={a.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 600,
                  color: "var(--deep-forest)",
                  background: "var(--amber)",
                  padding: "0.625rem 1.25rem",
                  borderRadius: 4,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "background 0.2s",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--amber-hover)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--amber)")}
              >
                {a.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .audience-row { grid-template-columns: 1fr !important; }
          .audience-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
