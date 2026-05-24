"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    name: "Bowen & Myoskeletal Therapy",
    description: "Kathy looks at the whole body — posture, old injuries, compensation patterns, and where the tension actually originates. Most people feel a shift within the first session.",
    details: ["Drug-free and non-invasive", "Works on pain, stiffness, and restricted movement", "60–75 minute sessions"],
    photo: "/photos/Bowenmyoskeletal.png",
    objectPosition: "60% 85%",
    href: "/services/bowen-myoskeletal-therapy",
    cta: "Book an appointment",
    ctaHref: "https://app.setmore.com/painandwellnesssolutions",
  },
  {
    name: "Scar Tissue Release",
    description: "Scars that feel tight, numb, or seem to pull on surrounding areas can affect movement far from the original site. McLoughlin Method work addresses the tissue directly.",
    details: ["Surgical and injury scars", "Reduces tightness and sensitivity", "Can improve nearby mobility"],
    photo: "/photos/scartissueservice.png",
    objectPosition: "65% 85%",
    href: "/services/scar-tissue-release",
    cta: "Book an appointment",
    ctaHref: "https://app.setmore.com/painandwellnesssolutions",
  },
  {
    name: "Reiki",
    description: "A quiet, hands-off session for people whose nervous system won't settle. Stress, anxiety, grief, burnout — Reiki gives the body a chance to slow down and reset.",
    details: ["Fully clothed, no pressure applied", "Good for stress and emotional exhaustion", "Can be combined with Bowen"],
    photo: "/photos/Reiki.png",
    objectPosition: "55% 90%",
    href: "/services/reiki",
    cta: "Book an appointment",
    ctaHref: "https://app.setmore.com/painandwellnesssolutions",
  },
  {
    name: "Healing with the Herd",
    description: "One of the only experiences of its kind in Ontario. Horse wisdom, tuning fork sound therapy, and fresh air on Kathy's farm. A nervous system reset unlike anything else.",
    details: ["Held at Kathy's farm near Stirling", "Seasonal availability", "Call to arrange booking"],
    photo: "/photos/kathy-horse-barn.png",
    objectPosition: "30% center",
    href: "/services/healing-with-the-herd",
    cta: "Call to arrange a visit",
    ctaHref: "tel:6138851311",
  },
  {
    name: "Equine Bodywork",
    description: "Farm visits for horses showing stiffness, uneven movement, soreness after work, or performance changes under saddle. No trailering. Kathy comes to you.",
    details: ["Mobile visits across Hastings County", "Post-injury and maintenance sessions", "Works alongside your vet"],
    photo: "/photos/Family-is-Everything-1-819x1024.png",
    objectPosition: "25% center",
    href: "/services/equine-bodywork",
    cta: "Call to arrange a visit",
    ctaHref: "tel:6138851311",
  },
  {
    name: "Canine Bowen",
    description: "The same gentle nervous-system approach, adapted for dogs. Hip dysplasia, post-surgical recovery, age-related stiffness, anxiety. In-clinic or home visits available.",
    details: ["Dogs of any size or age", "Hip, joint, and mobility issues", "Post-surgical recovery"],
    photo: "/photos/kathy dog.png",
    objectPosition: "center 85%",
    href: "/services/canine-bowen",
    cta: "Book a session",
    ctaHref: "https://app.setmore.com/painandwellnesssolutions",
  },
  {
    name: "Ionized Foot Detox",
    description: "A warm, relaxing foot soak offered as an add-on at the end of a session. Simple, restorative, and a nice way to finish a longer appointment.",
    details: ["Add-on to any session", "Roughly 30 minutes", "Ask about it when booking"],
    photo: "/photos/ionized footbath.png",
    objectPosition: "25% 75%",
    href: "/services/ionized-foot-detox",
    cta: "Book an appointment",
    ctaHref: "https://app.setmore.com/painandwellnesssolutions",
  },
];

function ServiceRow({ service, index }: { service: typeof services[0]; index: number }) {
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
            src={service.photo}
            alt={service.name}
            fill
            sizes="50vw"
            style={{ objectFit: "cover", objectPosition: service.objectPosition }}
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
          {service.description}
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
            href={service.ctaHref}
            target={service.ctaHref.startsWith("http") ? "_blank" : undefined}
            rel={service.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
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
            {service.cta}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
              <path d="M1 5h11M12 5L8 1M12 5L8 9" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ServicesDirectory() {
  return (
    <section style={{ background: "var(--cream)" }}>
      {/* Thin divider between rows */}
      {services.map((service, i) => (
        <div key={service.slug ?? service.name}>
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
