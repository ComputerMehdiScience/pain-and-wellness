"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CTA({
  title = "Book a session with Kathy.",
  body = "Book online for clinic appointments in Stirling. Call for horse, dog, and farm-visit bookings.",
}: {
  title?: string;
  body?: string;
}) {
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
        padding: "clamp(3.5rem, 7vw, 6rem) 0",
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
          padding: "0 clamp(2rem, 7vw, 8rem)",
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
          <h2
            className="section-heading"
            style={{ color: "var(--cream)", marginBottom: "1.25rem" }}
          >
            {title}
          </h2>
          <p
            className="section-subhead"
            style={{
              color: "oklch(96% 0.012 82 / 0.7)",
              maxWidth: "44ch",
            }}
          >
            {body}
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
              fontWeight: 700,
              color: "var(--teal-deep)",
              background: "var(--cream)",
              padding: "1rem 2.5rem",
              borderRadius: 8,
              display: "inline-block",
              letterSpacing: "0.01em",
              boxShadow: "0 6px 18px oklch(0% 0 0 / 0.25)",
              transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              const a = e.currentTarget as HTMLElement;
              a.style.transform = "translateY(-3px)";
              a.style.boxShadow = "0 10px 26px oklch(0% 0 0 / 0.35)";
              a.style.background = "var(--teal-light)";
            }}
            onMouseLeave={(e) => {
              const a = e.currentTarget as HTMLElement;
              a.style.transform = "translateY(0)";
              a.style.boxShadow = "0 6px 18px oklch(0% 0 0 / 0.25)";
              a.style.background = "var(--cream)";
            }}
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
