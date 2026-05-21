"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: "var(--warm-cream)",
        padding: "clamp(5rem, 10vw, 9rem) 0",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(2.5rem, 6vw, 6rem)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(3rem, 6vw, 7rem)",
          alignItems: "center",
        }}
        className="about-grid"
      >
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", perspective: 1000 }}
        >
          {/* Offset teal frame behind — creates stacked depth */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: 8,
            border: "2px solid var(--teal-accent)",
            transform: "translate(14px, 14px)",
            opacity: 0.35,
            pointerEvents: "none",
          }} />

          {/* Photo card with 3D hover tilt */}
          <motion.div
            whileHover={{ rotateY: 5, rotateX: -3, y: -8 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            style={{
              borderRadius: 6,
              overflow: "hidden",
              aspectRatio: "3/4",
              position: "relative",
              zIndex: 1,
              boxShadow: "12px 28px 64px oklch(30% 0.05 200 / 0.2), 0 4px 16px oklch(0% 0 0 / 0.08)",
              transformOrigin: "center bottom",
            }}
          >
            <Image
              src="/photos/kathy-portrait.jpg"
              alt="Kathy Morton"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              sizes="(max-width: 860px) 80vw, 40vw"
            />
          </motion.div>

          <div style={{
            position: "absolute",
            bottom: "1.5rem",
            left: "1.5rem",
            background: "oklch(96% 0.012 82 / 0.92)",
            backdropFilter: "blur(8px)",
            padding: "0.875rem 1.25rem",
            borderRadius: 3,
            zIndex: 2,
          }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 500, color: "var(--deep-forest)", lineHeight: 1.2 }}>
              Kathy Morton
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.6875rem", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--earth-soft)", marginTop: "0.2rem" }}>
              Certified Bowen Therapist · Since 2017
            </p>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.75rem, 5vw, 4.25rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "var(--deep-forest)",
              marginBottom: "1.75rem",
            }}
          >
            A neighbour who happens to be very good at this.
          </h2>

          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            fontWeight: 300,
            lineHeight: 1.85,
            color: "var(--earth-soft)",
            marginBottom: "2.5rem",
            maxWidth: "52ch",
          }}>
            Kathy grew up with horses in rural Ontario. Cattle sorting wasn't a hobby. It was how she learned to read an animal's body, movement, and pain. That same instinct shapes every treatment today, whether the patient has two legs or four.
          </p>

          <blockquote style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
            fontWeight: 400,
            lineHeight: 1.55,
            color: "var(--forest)",
            borderLeft: "2px solid var(--sage-light)",
            paddingLeft: "1.25rem",
            marginBottom: "2.5rem",
          }}>
            &ldquo;The body wants to heal. Sometimes it just needs the right conversation.&rdquo;
          </blockquote>

          <div style={{ display: "flex", gap: "2.5rem" }}>
            {[
              { v: "8+", l: "Years in practice" },
              { v: "3", l: "Species treated" },
              { v: "6+", l: "Certifications" },
            ].map(s => (
              <div key={s.l}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 400, color: "var(--deep-forest)", lineHeight: 1 }}>{s.v}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 400, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--earth-faint)", marginTop: "0.3rem" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) { .about-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
