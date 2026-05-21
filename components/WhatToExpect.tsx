"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

type Block = {
  heading: string;
  body: string[];
  ctaText: string;
  ctaHref: string;
  photo: string;
  objectPosition: string;
  zoom: number;
  imageSide: "left" | "right";
};

const blocks: Block[] = [
  {
    heading: "Helping you overcome pain at its source, not its symptom.",
    body: [
      "Most chronic pain is the loud part of a quiet imbalance further down the chain. Kathy maps the compensation pattern before she touches the place that's complaining.",
    ],
    ctaText: "Book an appointment",
    ctaHref: "https://app.setmore.com/painandwellnesssolutions",
    photo: "/photos/Bowenmyoskeletal.png",
    objectPosition: "60% 85%",
    zoom: 1.3,
    imageSide: "left",
  },
  {
    heading: "One practitioner. Three species. Eight years.",
    body: [
      "Whether you're walking in with sciatica, leading your horse off a trailer, or carrying in an aging dog: Kathy reads the same body language. Most therapists pick one species and stop.",
    ],
    ctaText: "Book an appointment",
    ctaHref: "https://app.setmore.com/painandwellnesssolutions",
    photo: "/photos/kathy-horse-barn.png",
    objectPosition: "30% center",
    zoom: 1.1,
    imageSide: "right",
  },
];

export default function WhatToExpect() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="for-you"
      style={{
        background: "var(--cream)",
        padding: "clamp(3.5rem, 7vw, 6rem) 0",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 4rem)" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(4rem, 7vw, 6rem)" }}>
          {blocks.map((b, i) => {
            const photoFirst = b.imageSide === "left";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: photoFirst ? "1.15fr 1fr" : "1fr 1.15fr",
                  gap: "clamp(2rem, 4vw, 4rem)",
                  alignItems: "center",
                }}
                className="wte-block"
              >
                {/* Photo */}
                <div style={{
                  order: photoFirst ? 1 : 2,
                  position: "relative" as const,
                }} className="wte-photo">
                  <div className="photo-pop" style={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                    background: "var(--warm-stone)",
                  }}>
                    <img
                      src={b.photo}
                      alt={b.heading}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: b.objectPosition,
                        transform: `scale(${b.zoom})`,
                        transformOrigin: b.objectPosition,
                        display: "block",
                      }}
                    />
                  </div>
                </div>

                {/* Text */}
                <div style={{
                  order: photoFirst ? 2 : 1,
                }} className="wte-text">
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
                    {b.heading}
                  </h2>

                  {b.body.map((p, j) => (
                    <p key={j} style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "1rem",
                      fontWeight: 300,
                      lineHeight: 1.8,
                      color: "var(--earth-soft)",
                      marginBottom: j < b.body.length - 1 ? "1.125rem" : "2rem",
                      maxWidth: "52ch",
                    }}>
                      {p}
                    </p>
                  ))}

                  <a
                    href={b.ctaHref}
                    target={b.ctaHref.startsWith("http") ? "_blank" : undefined}
                    rel={b.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
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
                      a.style.boxShadow = "0 10px 22px oklch(20% 0.01 240 / 0.28)";
                      a.style.background = "var(--teal-deep)";
                    }}
                    onMouseLeave={e => {
                      const a = e.currentTarget as HTMLAnchorElement;
                      a.style.transform = "translateY(0)";
                      a.style.boxShadow = "0 6px 16px oklch(20% 0.01 240 / 0.2)";
                      a.style.background = "var(--teal)";
                    }}
                  >
                    {b.ctaText}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      <style>{`
        @media (max-width: 760px) {
          .wte-block { grid-template-columns: 1fr !important; }
          .wte-photo { order: 1 !important; }
          .wte-text { order: 2 !important; }
        }
      `}</style>
    </section>
  );
}
