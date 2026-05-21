"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--deep-forest)",
        padding: "clamp(5rem, 10vw, 8rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle texture */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "oklch(35% 0.075 155 / 0.4)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -60,
          left: 80,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "oklch(68% 0.13 68 / 0.1)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(2.5rem, 6vw, 6rem)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "3rem",
          flexWrap: "wrap",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: 1, minWidth: 280 }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--amber)",
              background: "oklch(68% 0.13 68 / 0.12)",
              border: "1px solid oklch(68% 0.13 68 / 0.25)",
              padding: "0.3rem 0.75rem",
              borderRadius: 2,
              marginBottom: "1.5rem",
            }}
          >
            New patients welcome
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
              fontWeight: 400,
              color: "oklch(96% 0.012 82)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              marginBottom: "1.25rem",
            }}
          >
            Ready to feel better?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              fontWeight: 300,
              lineHeight: 1.75,
              color: "oklch(96% 0.012 82 / 0.62)",
              maxWidth: "44ch",
            }}
          >
            Book online for Stirling clinic appointments. Call for equine and farm visits.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          <a
            href="https://app.setmore.com/painandwellnesssolutions"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              fontWeight: 500,
              color: "#ffffff",
              background: "var(--teal)",
              padding: "1rem 2.5rem",
              borderRadius: 3,
              display: "inline-block",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "var(--amber-hover)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "var(--amber)")
            }
          >
            Book your appointment
          </a>

          <a
            href="tel:6138851311"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              fontWeight: 400,
              color: "oklch(96% 0.012 82 / 0.65)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 10.83a19.79 19.79 0 01-3.07-8.67A2 2 0 012.4 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.5 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            613-885-1311
          </a>
        </motion.div>
      </div>
    </section>
  );
}
