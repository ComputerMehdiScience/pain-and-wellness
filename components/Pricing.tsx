"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { PricingRow } from "@/sanity/lib/queries";
import { useSiteSettings } from "@/sanity/lib/SiteSettingsProvider";

export default function Pricing({ rows }: { rows: PricingRow[] }) {
  const settings = useSiteSettings();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

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
      id="pricing"
      ref={ref}
      style={{
        background: "var(--cream)",
        padding: "clamp(3.5rem, 7vw, 6rem) 0",
      }}
    >
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 3rem)" }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 4vw, 3.5rem)" }}
        >
          <h2 className="section-heading" style={{ marginBottom: "1.25rem" }}>
            Simple, honest pricing.
          </h2>
          <p className="section-subhead" style={{ maxWidth: 480, margin: "0 auto" }}>
            No packages to decode. Just what a visit costs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{
            background: "var(--cream-warm)",
            border: "1px solid var(--cream-edge)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {rows.map((r, i) => (
            <div
              key={r._id}
              style={{
                borderTop: i === 0 ? "none" : "1px solid var(--cream-edge)",
                padding: "1.625rem clamp(1.25rem, 4vw, 2.25rem)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1.5rem",
              }}
              className="pricing-row"
            >
              <div style={{ minWidth: 0 }}>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.0625rem, 1.6vw, 1.25rem)",
                  fontWeight: 500,
                  color: "var(--ink)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.005em",
                  marginBottom: "0.3rem",
                }}>
                  {r.label}
                </p>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  color: "var(--ink-faint)",
                  lineHeight: 1.5,
                }}>
                  {r.note}
                </p>
              </div>

              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 2.6vw, 1.875rem)",
                  fontWeight: 400,
                  color: "var(--teal-deep)",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}>
                  {r.price}
                </p>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--ink-faint)",
                  marginTop: "0.25rem",
                  whiteSpace: "nowrap",
                }}>
                  {r.unit}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            color: "var(--ink-faint)",
            textAlign: "center",
            marginTop: "1.75rem",
          }}
        >
          Reiki, Scar Tissue Release, and Ionized Foot Detox are priced individually.{" "}
          <a href={`tel:${settings.phoneTel}`} style={{ color: "var(--teal-deep)", fontWeight: 600, borderBottom: "1px solid var(--teal-light)", paddingBottom: 1 }}>
            Call Kathy
          </a>{" "}
          to ask.
        </motion.p>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .pricing-row { flex-direction: column !important; align-items: flex-start !important; gap: 0.75rem !important; }
          .pricing-row > div:last-child { text-align: left !important; }
        }
      `}</style>
    </section>
  );
}
