"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Bowen therapy healed my Bell's Palsy in just three sessions. My sleep improved, jaw tension disappeared. I had tried everything else first.",
    name: "Sarah M.",
    detail: "Bell's Palsy · Belleville",
    initials: "SM",
  },
  {
    text: "I came in with sore knees and didn't realize how crooked I was. After treatment, my shoulders are square and my knee doesn't hurt anymore.",
    name: "Dave R.",
    detail: "Chronic knee pain · Stirling",
    initials: "DR",
  },
  {
    text: "My mare was reluctant to pick up her left lead for months. After one session with Kathy she moved completely differently. The farrier noticed too.",
    name: "Rachel B.",
    detail: "Equine bodywork · Hastings",
    initials: "RB",
  },
];

function Stars() {
  return (
    <div style={{ display: "flex", gap: 6 }} aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "var(--brown)",
            display: "inline-block",
          }}
        />
      ))}
    </div>
  );
}

export default function Results() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="results"
      ref={ref}
      style={{
        background: "var(--cream-warm)",
        padding: "clamp(5rem, 10vw, 9rem) 0",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              color: "var(--teal-accent)",
              marginBottom: "1rem",
            }}
          >
            Real clients, real changes.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              lineHeight: 1.6,
              color: "var(--ink-soft)",
              maxWidth: 620,
              margin: "0 auto",
            }}
          >
            Don&apos;t just take my word for it — here&apos;s what people and their
            animals have to say after working together.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(1.25rem, 2vw, 1.75rem)",
            alignItems: "stretch",
          }}
        >
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                background: "#ffffff",
                borderRadius: 20,
                padding: "clamp(1.75rem, 2.5vw, 2.25rem)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                boxShadow:
                  "0 1px 2px oklch(20% 0.01 240 / 0.04), 0 8px 24px oklch(20% 0.01 240 / 0.06)",
              }}
            >
              <Stars />

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  color: "var(--ink)",
                  flex: 1,
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  paddingTop: "0.5rem",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "var(--teal)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "var(--teal-accent)",
                      lineHeight: 1.2,
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8125rem",
                      fontWeight: 400,
                      color: "var(--ink-faint)",
                      marginTop: "0.2rem",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {t.detail}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
