"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import type { Homepage } from "@/sanity/lib/queries";
import { useSiteSettings } from "@/sanity/lib/SiteSettingsProvider";
import { urlForImage } from "@/sanity/lib/image";

export default function Animals({
  heading,
  paragraph,
  photo,
  details,
}: {
  heading: string;
  paragraph: string;
  photo: Homepage["herdPhoto"];
  details: Homepage["herdDetails"];
}) {
  const settings = useSiteSettings();
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
          <Image
            src={urlForImage(photo).width(1200).height(1080).fit("crop").url()}
            alt="Kathy Morton standing with her horses in their presence"
            fill
            sizes="(max-width: 860px) 100vw, 50vw"
            priority
            style={{ objectFit: "cover" }}
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
        <h2 className="section-heading" style={{
          color: "var(--cream)",
          marginBottom: "1.5rem",
          whiteSpace: "pre-line",
        }}>
          {heading}
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
          {paragraph}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2.5rem" }}>
          {details.map(({ label, value }) => (
            <div key={label} style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(72% 0.065 150)", minWidth: 120 }}>
                {label}
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 300, color: "oklch(96% 0.012 82 / 0.55)" }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap" }}>
          <a
            href={settings.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--teal-deep)",
              background: "var(--cream)",
              padding: "0.875rem 2rem",
              borderRadius: 8,
              letterSpacing: "0.01em",
              display: "inline-block",
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
            Book a Herd session
          </a>
          <a href={`tel:${settings.phoneTel}`} style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            fontWeight: 400,
            color: "oklch(96% 0.012 82 / 0.45)",
          }}>
            or call {settings.phoneDisplay}
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
