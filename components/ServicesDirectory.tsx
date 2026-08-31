"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { SanityService } from "@/sanity/lib/queries";
import { bookHref } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

function ServiceRow({ service, index }: { service: SanityService; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const flip = index % 2 === 1;

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
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: 520,
        overflow: "hidden",
      }}
      className="service-row"
    >
      {/* Photo */}
      <motion.div
        initial={{ opacity: 0, x: flip ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ order: flip ? 2 : 1, position: "relative", overflow: "hidden", minHeight: 420 }}
      >
        <motion.div
          initial={{ scale: 1.08 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={urlForImage(service.photo).width(1200).height(1000).fit("crop").url()}
            alt={service.name}
            fill
            sizes="50vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
        {/* Subtle gradient toward text side */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: flip
            ? "linear-gradient(to left, var(--cream) 0%, transparent 30%)"
            : "linear-gradient(to right, var(--cream) 0%, transparent 30%)",
          pointerEvents: "none",
        }} />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: flip ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{
          order: flip ? 1 : 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(3rem, 6vw, 5rem) clamp(2.5rem, 5vw, 5rem)",
          background: "var(--cream)",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            color: "var(--teal-deep)",
            marginBottom: "1.25rem",
          }}
        >
          {service.name}
        </motion.h2>

        {service.price ? (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.8125rem",
              fontWeight: 700,
              color: "var(--teal-deep)",
              background: "oklch(78% 0.03 195 / 0.18)",
              borderRadius: 999,
              padding: "0.4rem 0.9rem",
              marginBottom: "1.25rem",
              width: "fit-content",
            }}
          >
            {service.price}
          </motion.p>
        ) : (
          <motion.a
            href="tel:6138851311"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.8125rem",
              fontWeight: 700,
              color: "var(--earth-soft)",
              background: "transparent",
              border: "1.5px solid var(--cream-edge)",
              borderRadius: 999,
              padding: "0.4rem 0.9rem",
              marginBottom: "1.25rem",
              width: "fit-content",
              textDecoration: "none",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 10.83a19.79 19.79 0 01-3.07-8.67A2 2 0 012.4 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.5 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" fill="var(--teal-deep)" />
            </svg>
            Call for pricing
          </motion.a>
        )}

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "var(--ink-soft)",
            maxWidth: "44ch",
            marginBottom: "1.75rem",
          }}
        >
          {service.fullDescription}
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.36 }}
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "2.25rem",
          }}
        >
          {service.details.map(d => (
            <li key={d} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <span style={{ width: 16, height: 2, background: "var(--teal-accent)", display: "inline-block", borderRadius: 1, flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--ink-soft)" }}>{d}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.44 }}
        >
          <a
            href={bookHref(service)}
            target={service.bookingMethod === "online" ? "_blank" : undefined}
            rel={service.bookingMethod === "online" ? "noopener noreferrer" : undefined}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.625rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "#fff",
              background: "var(--teal)",
              padding: "0.875rem 1.75rem",
              borderRadius: 999,
              transition: "background 0.25s ease",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--teal-deep)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--teal)"}
          >
            {service.bookingMethod === "online" ? "Book an appointment" : "Call to arrange a visit"}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
              <path d="M1 5h11M12 5L8 1M12 5L8 9" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ServicesDirectory({ services }: { services: SanityService[] }) {
  return (
    <section style={{ background: "var(--cream)" }}>
      {/* Thin divider between rows */}
      {services.map((service, i) => (
        <div key={service._id}>
          <ServiceRow service={service} index={i} />
          {i < services.length - 1 && (
            <div style={{ height: 1, background: "var(--cream-edge)", margin: "0 clamp(2.5rem, 6vw, 6rem)" }} />
          )}
        </div>
      ))}

      <style>{`
        @media (max-width: 760px) {
          .service-row { grid-template-columns: 1fr !important; }
          .service-row > *:first-child { order: 1 !important; }
          .service-row > *:last-child { order: 2 !important; }
        }
      `}</style>
    </section>
  );
}
