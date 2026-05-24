"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Tiff",
    text: "After years of chiropractor, osteopath and massage, I have finally found that Bowen Therapy works best for my body. I no longer do any other therapy.",
  },
  {
    id: 2,
    name: "Lyle",
    text: "Totally satisfied with results from Kathy. My neck had been bothering me for months. After the session the pain went from a 10 to a 3.",
  },
  {
    id: 3,
    name: "Linda Robinson",
    text: "I was able to go to Campbellford shopping by myself for the first time in about 2 years. THANKS Kathy.",
  },
];

function Stars() {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[0,1,2,3,4].map(i => (
        <svg key={i} width="18" height="18" viewBox="0 0 16 16" fill="#f5a623">
          <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsBlock() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setActive(a => (a + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--cream-warm)",
        padding: "clamp(5rem, 9vw, 8rem) clamp(2.5rem, 6vw, 6rem)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          gap: "clamp(3rem, 6vw, 7rem)",
          alignItems: "center",
        }}
        className="testimonials-grid"
      >
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 5.5vw, 5rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            color: "var(--teal-accent)",
            marginBottom: "1.25rem",
          }}>
            Real clients,<br />real changes.
          </h2>

          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "var(--ink-soft)",
            maxWidth: "38ch",
            marginBottom: "2.5rem",
          }}>
            Here's what people and their animals have to say after working with Kathy.
          </p>

          {/* Dot nav */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View testimonial ${i + 1}`}
                style={{
                  height: 10,
                  width: i === active ? 28 : 10,
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  background: i === active ? "var(--teal-accent)" : "oklch(70% 0.02 200 / 0.35)",
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Right — animated card */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{ position: "relative", minHeight: 280 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: "clamp(2rem, 3.5vw, 2.75rem)",
                boxShadow: "0 8px 40px oklch(42% 0.06 200 / 0.1), 0 2px 8px oklch(42% 0.06 200 / 0.06)",
                border: "1px solid oklch(86% 0.018 195 / 0.5)",
              }}
            >
              <Stars />

              <p style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                lineHeight: 1.6,
                color: "var(--ink)",
                margin: "1.5rem 0 2rem",
              }}>
                &ldquo;{testimonials[active].text}&rdquo;
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "var(--teal-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#fff",
                  flexShrink: 0,
                }}>
                  {testimonials[active].name[0]}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", fontWeight: 600, color: "var(--ink)" }}>
                    {testimonials[active].name}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--ink-soft)" }}>
                    Pain &amp; Wellness client
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
