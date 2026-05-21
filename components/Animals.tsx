"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Animals() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

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
      id="animals"
      ref={ref}
      style={{
        background: "var(--deep-forest)",
        minHeight: 480,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "hidden",
      }}
      className="animals-section"
    >
      {/* Left: photo */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: 480 }}>
        <motion.div style={{ position: "absolute", inset: "-5%", scale: photoScale, y: photoY }}>
          <img
            src="/photos/kathy-horse-barn.png"
            alt="Kathy Morton doing equine Bowen therapy in a barn"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
          />
        </motion.div>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, transparent 50%, oklch(22% 0.055 158) 95%)",
        }} />
      </div>

      {/* Right: content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 5rem)",
        }}
      >
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
          fontWeight: 400,
          color: "oklch(96% 0.012 82)",
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          marginBottom: "1.5rem",
        }}>
          Healing with<br />the Herd
        </h2>

        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9375rem",
          fontWeight: 300,
          lineHeight: 1.8,
          color: "oklch(96% 0.012 82 / 0.62)",
          marginBottom: "2rem",
          maxWidth: "44ch",
        }}>
          One of the only experiences of its kind in Ontario. Horse wisdom, tuning fork
          sound therapy, and fresh air on Kathy's farm. A nervous system reset unlike
          anything else.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2.5rem" }}>
          {[
            ["Private sessions", "Held at Kathy's farm near Stirling"],
            ["Who it helps", "Burnout, anxiety, grief, chronic stress"],
            ["Seasonal availability", "Call to discuss booking"],
          ].map(([label, val]) => (
            <div key={label} style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(72% 0.065 150)", minWidth: 120 }}>
                {label}
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 300, color: "oklch(96% 0.012 82 / 0.55)" }}>
                {val}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap" }}>
          <a
            href="https://app.setmore.com/painandwellnesssolutions"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#ffffff",
              background: "var(--teal)",
              padding: "0.75rem 1.75rem",
              borderRadius: 3,
            }}
          >
            Book a Herd session
          </a>
          <a href="tel:6138851311" style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            fontWeight: 400,
            color: "oklch(96% 0.012 82 / 0.45)",
          }}>
            or call 613-885-1311
          </a>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 860px) {
          .animals-section { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
