"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.82]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "100svh",
        minHeight: 600,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* Parallax photo */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-10%",
          y: photoY,
        }}
      >
        <img
          src="/photos/kathy-horse.jpg"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }}
        />
      </motion.div>

      {/* Overlay */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "oklch(22% 0.055 158)",
          opacity: overlayOpacity,
        }}
      />
      {/* Gradient lift at bottom for text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, oklch(22% 0.055 158) 0%, transparent 55%)",
        }}
      />

      {/* Content */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 clamp(1.5rem, 5vw, 5rem) clamp(3.5rem, 7vw, 5.5rem)",
          y: contentY,
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 7.5vw, 6.5rem)",
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: "-0.015em",
            color: "oklch(96% 0.012 82)",
            marginBottom: "clamp(1.5rem, 3vw, 2.25rem)",
            maxWidth: "10ch",
          }}
        >
          Feel better.<br />
          <em style={{ fontStyle: "italic", color: "oklch(96% 0.012 82 / 0.7)" }}>Move freely.</em>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}
        >
          <a
            href="https://app.setmore.com/painandwellnesssolutions"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              color: "var(--deep-forest)",
              background: "var(--amber)",
              padding: "0.875rem 2rem",
              borderRadius: 3,
              letterSpacing: "0.01em",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--amber-hover)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--amber)")}
          >
            Book an appointment
          </a>
          <span style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            fontWeight: 300,
            color: "oklch(96% 0.012 82 / 0.55)",
            letterSpacing: "0.04em",
          }}>
            Stirling, ON · Bowen therapy for people, horses & dogs
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "clamp(1.5rem, 3vw, 2.5rem)",
          right: "clamp(1.5rem, 5vw, 5rem)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.625rem",
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "oklch(96% 0.012 82 / 0.35)",
          writingMode: "vertical-rl",
        }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 40, background: "oklch(96% 0.012 82 / 0.2)" }} />
      </motion.div>
    </section>
  );
}
