"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Homepage } from "@/sanity/lib/types";
import { stegaClean } from "next-sanity";
import { useSiteSettings } from "@/sanity/lib/SiteSettingsProvider";
import { urlForImage } from "@/sanity/lib/image";

export default function WhatToExpect({ blocks }: { blocks: Homepage["whatToExpectBlocks"] }) {
  const settings = useSiteSettings();
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
            const photoFirst = stegaClean(b.imageSide) === "left";
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
                    <Image
                      src={urlForImage(b.photo).width(1100).height(825).fit("crop").url()}
                      alt={b.heading}
                      fill
                      sizes="(max-width: 760px) 90vw, 55vw"
                      style={{ objectFit: "cover" }}
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

                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    fontWeight: 300,
                    lineHeight: 1.8,
                    color: "var(--earth-soft)",
                    marginBottom: "2rem",
                    maxWidth: "52ch",
                  }}>
                    {b.paragraph}
                  </p>

                  <a
                    href={settings.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    Book an appointment
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
