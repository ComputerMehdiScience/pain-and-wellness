"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "Is Bowen therapy covered by insurance?", a: "Many extended health care plans include Bowen therapy. Check with your provider. Receipts are provided for all sessions. Cash, e-transfer, and major credit cards accepted." },
  { q: "How many sessions will I need?", a: "Most clients see meaningful results in 3 to 6 sessions. Chronic or complex issues may need more. We discuss this at your first appointment." },
  { q: "What should I expect at my first visit?", a: "First sessions run 60 to 75 minutes. Wear comfortable, loose clothing. Kathy will assess your posture, movement patterns, and pain history before treatment begins. Most people leave deeply relaxed." },
  { q: "Do you treat horses and dogs?", a: "Yes. Horse visits are done at your farm across Hastings County, no trailering required. Dog sessions are in-clinic or at your home. Call to arrange animal appointments." },
  { q: "Can I keep seeing my doctor or chiropractor?", a: "Absolutely. Bowen works alongside conventional care. Kathy actively encourages an integrated approach. Many clients see her in addition to physiotherapy, massage, or chiropractic." },
  { q: "Does Bowen therapy hurt?", a: "No. Very gentle, precise moves with no sustained pressure, no cracking, and no manipulation. Most people describe it as profoundly relaxing. Suitable for all ages and pain levels." },
];

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
    <section
      id="faq"
      ref={ref}
      style={{
        background: "var(--warm-stone)",
        padding: "clamp(3.5rem, 7vw, 6rem) 0",
      }}
    >
      <div style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: "0 clamp(1.5rem, 5vw, 3rem)",
      }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 4vw, 4rem)" }}
        >
          <h2 className="section-heading" style={{ marginBottom: "1.25rem" }}>
            Common questions
          </h2>
          <p className="section-subhead" style={{ whiteSpace: "nowrap", margin: "0 auto" }}>
            Most people ask these before booking. Still curious?{" "}
            <a
              href="tel:6138851311"
              style={{
                color: "var(--teal-deep)",
                fontWeight: 600,
                borderBottom: "1px solid var(--teal-light)",
                paddingBottom: "1px",
              }}
            >
              Call Kathy directly
            </a>
            .
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            background: "var(--cream)",
            border: "1px solid var(--cream-edge)",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 14px 36px -12px oklch(20% 0.01 240 / 0.12), 0 4px 12px -4px oklch(20% 0.01 240 / 0.06)",
          }}
        >
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={f.q}
                style={{
                  borderTop: i === 0 ? "none" : "1px solid var(--cream-edge)",
                  background: isOpen ? "oklch(78% 0.03 195 / 0.08)" : "transparent",
                  transition: "background 0.3s ease",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    textAlign: "left" as const,
                    padding: "1.625rem clamp(1.25rem, 3vw, 2rem)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1.5rem",
                    background: "none",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.0625rem, 1.4vw, 1.1875rem)",
                    fontWeight: 500,
                    color: isOpen ? "var(--teal-deep)" : "var(--ink)",
                    lineHeight: 1.3,
                    letterSpacing: "-0.005em",
                    transition: "color 0.2s",
                  }}>
                    {f.q}
                  </span>
                  <span style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: `1.5px solid ${isOpen ? "var(--teal-deep)" : "var(--cream-edge)"}`,
                    background: isOpen ? "var(--teal-deep)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                  }}>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      style={{
                        transform: isOpen ? "rotate(-180deg)" : "rotate(0)",
                        transition: "transform 0.25s ease",
                      }}
                    >
                      <path
                        d="M6 2v8M2 6h8"
                        stroke={isOpen ? "var(--cream)" : "var(--ink-soft)"}
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        style={{
                          transformOrigin: "center",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                          transition: "transform 0.25s ease, stroke 0.25s ease",
                        }}
                      />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "1rem",
                        fontWeight: 400,
                        lineHeight: 1.75,
                        color: "var(--ink-soft)",
                        padding: "0 clamp(1.25rem, 3vw, 2rem) 1.75rem",
                        maxWidth: "62ch",
                      }}>
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
