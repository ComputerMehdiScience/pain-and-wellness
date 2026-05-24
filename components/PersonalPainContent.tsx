"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const conditions = [
  "Back pain & sciatica",
  "Headaches & migraines",
  "Jaw tension (TMJ)",
  "Neck & shoulder tension",
  "Hip & knee pain",
  "Frozen shoulder",
  "Sports injuries",
  "Post-surgical recovery",
  "Scar tissue tightness",
  "Stress & anxiety",
  "Sleep disruption",
  "Nerve pain",
];

const steps = [
  {
    heading: "We talk through what's going on.",
    body: "History, current symptoms, what you've already tried. Kathy listens for patterns, not just the spot that hurts.",
  },
  {
    heading: "Kathy assesses how your body is holding itself.",
    body: "Posture, movement, compensation patterns. Most people are surprised by what she finds — pain is rarely where the problem started.",
  },
  {
    heading: "Treatment begins.",
    body: "Small, precise moves on specific muscles and connective tissue. Pauses between each sequence let the nervous system respond. Most people feel something shift before they leave.",
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function PersonalPainContent() {
  const conditions$ = useInView();
  const steps$ = useInView();

  return (
    <>
      {/* ── What people come in for ── */}
      <section style={{
        background: "var(--cream-warm)",
        padding: "clamp(3.5rem, 6vw, 5.5rem) clamp(2rem, 6vw, 6rem)",
      }}>
        <div ref={conditions$.ref} style={{ maxWidth: 1060, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={conditions$.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: "2rem" }}
          >
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--teal-deep)",
              marginBottom: "0.75rem",
            }}>
              What people come in for.
            </h2>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              color: "var(--ink-soft)",
              lineHeight: 1.7,
            }}>
              If yours isn't on the list, call anyway.
            </p>
          </motion.div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
            {conditions.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 10 }}
                animate={conditions$.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.04 * i }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--teal-deep)",
                  background: "#fff",
                  border: "1px solid oklch(86% 0.018 195 / 0.6)",
                  borderRadius: 999,
                  padding: "0.5rem 1.1rem",
                  lineHeight: 1,
                }}
              >
                {c}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── At your first visit ── */}
      <section style={{
        background: "var(--cream)",
        padding: "clamp(3.5rem, 6vw, 5.5rem) clamp(2rem, 6vw, 6rem)",
      }}>
        <div ref={steps$.ref} style={{ maxWidth: 720, margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={steps$.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--teal-deep)",
              marginBottom: "clamp(2rem, 3.5vw, 3rem)",
            }}
          >
            At your first visit.
          </motion.h2>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {steps.map((s, i) => (
              <motion.div
                key={s.heading}
                initial={{ opacity: 0, x: -16 }}
                animate={steps$.inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 * i }}
                style={{
                  borderLeft: "2px solid var(--teal-accent)",
                  paddingLeft: "1.5rem",
                  paddingTop: "0.25rem",
                  paddingBottom: i < steps.length - 1 ? "2.25rem" : 0,
                }}
              >
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)",
                  fontWeight: 400,
                  lineHeight: 1.3,
                  color: "var(--ink)",
                  marginBottom: "0.5rem",
                }}>
                  {s.heading}
                </h3>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: "var(--ink-soft)",
                }}>
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={steps$.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
            style={{ marginTop: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            <a
              href="https://app.setmore.com/painandwellnesssolutions"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                fontWeight: 700,
                color: "#fff",
                background: "var(--teal)",
                padding: "0.875rem 2rem",
                borderRadius: 8,
                display: "inline-block",
                letterSpacing: "0.01em",
                boxShadow: "0 6px 16px oklch(42% 0.06 200 / 0.25)",
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "var(--teal-deep)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "var(--teal)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Book your first visit
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
