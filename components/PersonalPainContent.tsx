"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
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
  return { ref, inView };
}

export default function PersonalPainContent() {
  const a$ = useInView();
  const b$ = useInView();

  return (
    <>
      {/* ── What people come in for ── */}
      <section style={{ background: "var(--cream)", padding: "clamp(4rem, 7vw, 6rem) 0" }}>
        <div
          ref={a$.ref}
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 clamp(1.5rem, 4vw, 4rem)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(3rem, 6vw, 6rem)",
            alignItems: "center",
          }}
          className="ppc-grid"
        >
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={a$.inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="photo-pop" style={{ width: "100%", aspectRatio: "4/3", position: "relative" }}>
              <Image
                src="/photos/scartissueservice.png"
                alt="Scar tissue and pain treatment"
                fill
                sizes="(max-width: 760px) 90vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "65% 85%", transform: "scale(1.2)", transformOrigin: "65% 85%" }}
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={a$.inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 3.8vw, 3.25rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "var(--deep-forest)",
              marginBottom: "1.75rem",
              maxWidth: "18ch",
            }}>
              What people come in for.
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.5rem 1.5rem",
              marginBottom: "2rem",
            }}>
              {conditions.map((c) => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <span style={{ width: 16, height: 2, background: "var(--teal-accent)", display: "inline-block", borderRadius: 1, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--ink-soft)", lineHeight: 1.5 }}>{c}</span>
                </div>
              ))}
            </div>

            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "var(--ink-faint)",
              lineHeight: 1.7,
            }}>
              If yours isn't on the list, call anyway.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── At your first visit ── */}
      <section style={{ background: "var(--cream-warm)", padding: "clamp(4rem, 7vw, 6rem) 0" }}>
        <div
          ref={b$.ref}
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 clamp(1.5rem, 4vw, 4rem)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(3rem, 6vw, 6rem)",
            alignItems: "center",
          }}
          className="ppc-grid"
        >
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={b$.inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 3.8vw, 3.25rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "var(--deep-forest)",
              marginBottom: "1.75rem",
              maxWidth: "18ch",
            }}>
              At your first visit.
            </h2>

            {[
              "You'll talk through what's going on — history, current pain patterns, what you've already tried. Kathy listens for the whole picture, not just the symptom.",
              "She'll look at how your body is holding itself. Posture, movement, old injuries, the ways your body has been compensating. Most people are surprised by what she finds.",
              "Then treatment begins. Small, precise moves with deliberate pauses between them. No cracking, no sustained pressure. Most people feel calmer and looser before they leave.",
            ].map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={b$.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.1 }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: "var(--earth-soft)",
                  marginBottom: i < 2 ? "1.125rem" : "2rem",
                  maxWidth: "52ch",
                }}
              >
                {p}
              </motion.p>
            ))}

            <motion.a
              href="https://app.setmore.com/painandwellnesssolutions"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={b$.inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                fontWeight: 700,
                color: "var(--cream)",
                background: "var(--teal)",
                padding: "0.875rem 1.75rem",
                borderRadius: 8,
                display: "inline-block",
                letterSpacing: "0.01em",
                boxShadow: "0 6px 16px oklch(20% 0.01 240 / 0.2)",
                transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
              }}
              onMouseEnter={e => {
                const a = e.currentTarget as HTMLAnchorElement;
                a.style.transform = "translateY(-2px)";
                a.style.background = "var(--teal-deep)";
              }}
              onMouseLeave={e => {
                const a = e.currentTarget as HTMLAnchorElement;
                a.style.transform = "translateY(0)";
                a.style.background = "var(--teal)";
              }}
            >
              Book your first visit
            </motion.a>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={b$.inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="photo-pop" style={{ width: "100%", aspectRatio: "4/3", position: "relative" }}>
              <Image
                src="/photos/Bowenmyoskeletal.png"
                alt="Bowen therapy session"
                fill
                sizes="(max-width: 760px) 90vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "60% 85%", transform: "scale(1.3)", transformOrigin: "60% 85%" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 760px) {
          .ppc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
