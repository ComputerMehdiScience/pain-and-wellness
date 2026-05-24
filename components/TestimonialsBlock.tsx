"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Crooked posture & sore knees",
    quote: "I came to Kathy because I had sore knees. I didn't realize I was so crooked and that my shoulders were out. After her treatments, my shoulders are square and my knee doesn't hurt anymore. Thank you Kathy!",
    photo: "/photos/crooked result.webp",
    objectPosition: "center center",
  },
  {
    id: 2,
    name: "Bell's Palsy recovery",
    quote: "Bowen Therapy healed my Bell's Palsy in just three sessions. Just look at the difference in my feet! My sleep improved, jaw tension disappeared, and my stress levels dropped. Truly life-changing! Huge thanks to Kathy for this incredible healing experience. I didn't realize the effects of what proper balance can do for my body!",
    photo: "/photos/bells palsy result.webp",
    objectPosition: "center center",
  },
  {
    id: 3,
    name: "Jaw grinding & tension",
    quote: "The work Kathy does on my jaw bones and the exercises she gave me have helped me a lot from grinding my teeth at night. Thank you so much Kathy!",
    photo: "/photos/jaw result.webp",
    objectPosition: "center top",
  },
];

function Stars() {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[0, 1, 2, 3, 4].map(i => (
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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[active];

  return (
    <section
      ref={ref}
      style={{
        background: "var(--cream-warm)",
        padding: "clamp(5rem, 9vw, 8rem) clamp(2.5rem, 6vw, 6rem)",
      }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: "center", marginBottom: "clamp(3rem, 5vw, 5rem)" }}
      >
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.75rem, 5vw, 4.25rem)",
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          color: "var(--teal-accent)",
        }}>
          Real clients, real changes.
        </h2>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          color: "var(--ink-soft)",
          marginTop: "0.875rem",
          lineHeight: 1.65,
        }}>
          Here's what people have to say after working with Kathy.
        </p>
      </motion.div>

      {/* Fixed-height track — prevents any layout shift when quotes differ in length */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={{ maxWidth: 1060, margin: "0 auto" }}
      >
        <div className="tblock-track" style={{ position: "relative", height: 460 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                gap: "clamp(2rem, 4vw, 3.5rem)",
                alignItems: "stretch",
              }}
              className="tblock-row"
            >

              {/* 3D floating photo — separate from the quote card */}
              <motion.div
                className="tblock-photo"
                style={{
                  flexShrink: 0,
                  width: 300,
                  borderRadius: 18,
                  overflow: "hidden",
                  position: "relative",
                  transformPerspective: 900,
                  rotateY: -6,
                  rotateX: 3,
                  boxShadow: "22px 44px 88px oklch(30% 0.06 200 / 0.26), 4px 10px 28px oklch(30% 0.06 200 / 0.12)",
                }}
                whileHover={{ rotateY: -13, rotateX: 7, scale: 1.045, y: -10 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
              >
                <Image
                  src={t.photo}
                  alt={t.name}
                  fill
                  sizes="(max-width: 760px) 90vw, 30vw"
                  style={{ objectFit: "cover", objectPosition: t.objectPosition }}
                />
                {/* Condition label pill */}
                <div style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  background: "oklch(97% 0.008 90 / 0.93)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  borderRadius: 999,
                  padding: "0.35rem 0.9rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--teal-deep)",
                  letterSpacing: "0.04em",
                }}>
                  {t.name}
                </div>
              </motion.div>

              {/* Quote card — separate floating card */}
              <div
                className="tblock-quote"
                style={{
                  flex: 1,
                  background: "#fff",
                  borderRadius: 20,
                  padding: "clamp(2rem, 4vw, 3.5rem)",
                  boxShadow: "0 8px 48px oklch(42% 0.06 200 / 0.08), 0 2px 8px oklch(42% 0.06 200 / 0.04)",
                  border: "1px solid oklch(86% 0.018 195 / 0.4)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "1.5rem",
                }}
              >
                <Stars />

                <p style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                  lineHeight: 1.75,
                  color: "var(--ink)",
                }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Dot nav */}
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`View testimonial ${i + 1}`}
                      style={{
                        height: 8,
                        width: i === active ? 24 : 8,
                        borderRadius: 999,
                        border: "none",
                        cursor: "pointer",
                        background: i === active ? "var(--teal-accent)" : "oklch(70% 0.02 200 / 0.3)",
                        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                        padding: 0,
                      }}
                    />
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 700px) {
          .tblock-track { height: auto !important; }
          .tblock-row {
            position: relative !important;
            inset: auto !important;
            flex-direction: column !important;
          }
          .tblock-photo { width: 100% !important; height: 300px !important; flex-shrink: 0 !important; }
        }
      `}</style>
    </section>
  );
}
