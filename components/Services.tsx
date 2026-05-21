"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";

type ServiceCard = {
  num: string;
  tag: string;
  heading: string;
  body: string;
  chips: string[];
  cta: string;
  href: string;
  art:
    | { kind: "photo"; src: string; alt: string }
    | { kind: "svg"; render: () => React.ReactNode };
  wash: { from: string; to: string; accent: string };
};

const HumanIllustration = () => (
  <svg
    viewBox="0 0 320 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}
    aria-hidden
  >
    <defs>
      <linearGradient id="humanStroke" x1="80" y1="40" x2="240" y2="300" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="oklch(52% 0.055 200)" />
        <stop offset="1" stopColor="oklch(38% 0.07 200)" />
      </linearGradient>
      <radialGradient id="humanGlow" cx="160" cy="160" r="120">
        <stop offset="0" stopColor="oklch(52% 0.055 200)" stopOpacity="0.10" />
        <stop offset="1" stopColor="oklch(52% 0.055 200)" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Soft halo */}
    <circle cx="160" cy="170" r="135" fill="url(#humanGlow)" />

    {/* Two cupped hands cradling a small body / energy form — universal healing motif */}

    {/* Left hand — palm up, fingers curled inward to cradle */}
    <path
      d="
        M70 200
        c0-10 4-20 12-28
        c8-8 18-12 30-12
        l16 0
      "
      stroke="url(#humanStroke)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Left hand — wrist + forearm */}
    <path
      d="
        M70 200
        c-6 2-14 6-22 14
        c-6 6-10 14-12 22
      "
      stroke="url(#humanStroke)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    {/* Left hand — fingers curled */}
    <g stroke="url(#humanStroke)" strokeWidth="3" strokeLinecap="round" fill="none">
      <path d="M128 160c-2-6-6-10-12-12" />
      <path d="M134 168c0-7-2-13-6-18" />
      <path d="M138 178c2-7 2-14 0-20" />
      <path d="M138 188c6-5 8-12 6-20" />
    </g>

    {/* Right hand — palm up, mirror */}
    <path
      d="
        M250 200
        c0-10-4-20-12-28
        c-8-8-18-12-30-12
        l-16 0
      "
      stroke="url(#humanStroke)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="
        M250 200
        c6 2 14 6 22 14
        c6 6 10 14 12 22
      "
      stroke="url(#humanStroke)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <g stroke="url(#humanStroke)" strokeWidth="3" strokeLinecap="round" fill="none">
      <path d="M192 160c2-6 6-10 12-12" />
      <path d="M186 168c0-7 2-13 6-18" />
      <path d="M182 178c-2-7-2-14 0-20" />
      <path d="M182 188c-6-5-8-12-6-20" />
    </g>

    {/* Hands meeting at the bottom — cradle base */}
    <path
      d="M128 188c12 8 24 12 32 12c8 0 20-4 32-12"
      stroke="url(#humanStroke)"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="oklch(94% 0.015 195)"
      fillOpacity="0.4"
    />

    {/* Glowing energy held within the hands — concentric circles like ripples */}
    <g>
      <circle cx="160" cy="162" r="20" fill="oklch(52% 0.055 200)" fillOpacity="0.08" />
      <circle cx="160" cy="162" r="14" fill="oklch(52% 0.055 200)" fillOpacity="0.14" />
      <circle cx="160" cy="162" r="8" fill="oklch(52% 0.055 200)" fillOpacity="0.32" />
      <circle cx="160" cy="162" r="4" fill="oklch(35% 0.045 55)" />
    </g>

    {/* Energy radiating outward — Bowen pressure-point ripples */}
    <g stroke="url(#humanStroke)" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" fill="none">
      <path d="M120 100c8-8 22-12 40-12c18 0 32 4 40 12" strokeDasharray="2 7" />
      <path d="M100 76c14-12 36-18 60-18c24 0 46 6 60 18" strokeDasharray="2 9" opacity="0.65" />
      <path d="M80 56c20-16 50-24 80-24c30 0 60 8 80 24" strokeDasharray="2 11" opacity="0.4" />
    </g>

    {/* Small accent dots — pressure points */}
    <g fill="oklch(35% 0.045 55)" opacity="0.6">
      <circle cx="106" cy="148" r="2.5" />
      <circle cx="214" cy="148" r="2.5" />
      <circle cx="160" cy="110" r="3" />
    </g>
  </svg>
);

const CanineIllustration = () => (
  <svg
    viewBox="0 0 320 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}
    aria-hidden
  >
    <defs>
      <linearGradient id="dogStroke" x1="40" y1="80" x2="280" y2="260" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="oklch(52% 0.055 200)" />
        <stop offset="1" stopColor="oklch(38% 0.07 200)" />
      </linearGradient>
      <radialGradient id="dogGlow" cx="160" cy="180" r="130">
        <stop offset="0" stopColor="oklch(52% 0.055 200)" stopOpacity="0.10" />
        <stop offset="1" stopColor="oklch(52% 0.055 200)" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Soft halo */}
    <circle cx="160" cy="180" r="120" fill="url(#dogGlow)" />

    {/* Sleeping dog — side profile, curled body, head resting on paws */}

    {/* Body — gentle arching back from rump to shoulder */}
    <path
      d="
        M252 196
        c4-18 0-36-12-50
        c-14-16-36-24-58-22
        c-22 2-42 14-54 32
        c-6 9-10 19-10 30
        c0 8 4 14 12 16
        l108 4
        c8 0 14-4 14-10
      "
      stroke="url(#dogStroke)"
      strokeWidth="3"
      strokeLinejoin="round"
      strokeLinecap="round"
    />

    {/* Head — resting low, snout extending forward */}
    <path
      d="
        M132 158
        c-10-2-20 2-26 10
        c-5 6-7 14-5 22
        c1 4 4 7 8 8
        l38 4
      "
      stroke="url(#dogStroke)"
      strokeWidth="3"
      strokeLinejoin="round"
      strokeLinecap="round"
    />

    {/* Snout tip */}
    <path
      d="M106 168c-4 0-7 1-10 3"
      stroke="url(#dogStroke)"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* Folded ear — flopping naturally */}
    <path
      d="
        M148 152
        c-2-12 2-22 10-28
        c4-2 8-2 12 1
        c4 3 6 9 4 16
        c-1 4-4 7-8 8
      "
      stroke="url(#dogStroke)"
      strokeWidth="2.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    />

    {/* Eye — peacefully closed */}
    <path
      d="M120 174c4-2 8-2 12 0"
      stroke="oklch(35% 0.045 55)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />

    {/* Nose */}
    <circle cx="102" cy="172" r="3.5" fill="oklch(35% 0.045 55)" />

    {/* Front paws crossed under chin */}
    <path
      d="M138 198c10-4 22-4 32 0M148 202c-2 4-2 8 0 12M170 202c-2 4-2 8 0 12"
      stroke="url(#dogStroke)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Curled tail */}
    <path
      d="
        M252 196
        c10 4 18 12 20 22
        c2 9-2 18-10 22
        c-6 3-13 1-16-4
        c-2-4-1-9 3-11
      "
      stroke="url(#dogStroke)"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />

    {/* Paw print accent — bottom right, like a little signature */}
    <g transform="translate(240 248)" opacity="0.65">
      <ellipse cx="0" cy="2" rx="6" ry="5" fill="oklch(35% 0.045 55)" />
      <circle cx="-10" cy="-8" r="3" fill="oklch(35% 0.045 55)" />
      <circle cx="10" cy="-8" r="3" fill="oklch(35% 0.045 55)" />
      <circle cx="-5" cy="-15" r="2.5" fill="oklch(35% 0.045 55)" />
      <circle cx="7" cy="-15" r="2.5" fill="oklch(35% 0.045 55)" />
    </g>

    {/* Sleep "z" marks above head — subtle */}
    <g stroke="url(#dogStroke)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" fill="none">
      <path d="M88 110l8 0l-8 12l8 0" />
      <path d="M64 88l5 0l-5 7l5 0" />
    </g>
  </svg>
);

const services: ServiceCard[] = [
  {
    num: "01",
    tag: "Human therapy",
    heading: "When the body has been carrying pain for too long.",
    body:
      "Chronic back pain, sciatica, migraines, jaw tension, sports injuries — Bowen therapy works where other treatments haven't. Gentle, drug-free, and it addresses the root cause rather than masking it.",
    chips: ["Bowen & Myoskeletal", "Scar Tissue Release", "Reiki", "Ionized Foot Detox"],
    cta: "Book an appointment",
    href: "https://app.setmore.com/painandwellnesssolutions",
    art: { kind: "svg", render: () => <HumanIllustration /> },
    wash: {
      from: "oklch(94% 0.015 195)",
      to: "oklch(86% 0.025 195)",
      accent: "oklch(52% 0.055 200)",
    },
  },
  {
    num: "02",
    tag: "Equine bodywork",
    heading: "When your horse isn't moving the way they used to.",
    body:
      "Reluctance on the lead, behavioural changes under saddle, post-injury stiffness. Kathy comes to your farm — no trailering, no stress. Her cattle-sorting background means horses trust her fast.",
    chips: ["Farm visits — Hastings County", "Myofascial kinetic lines", "Musculoskeletal unwinding", "Tensegrity work"],
    cta: "Call to arrange a visit",
    href: "tel:6138851311",
    art: { kind: "photo", src: "/photos/kathy-horse.jpg", alt: "Kathy with a horse" },
    wash: {
      from: "oklch(93% 0.02 80)",
      to: "oklch(86% 0.03 75)",
      accent: "oklch(35% 0.045 55)",
    },
  },
  {
    num: "03",
    tag: "Canine Bowen",
    heading: "When your dog is slowing down before their time.",
    body:
      "The same gentle nervous-system approach — adapted for dogs. Hip dysplasia, post-surgical recovery, anxiety, age-related mobility. In-clinic or at your home. Dogs often respond within a single session.",
    chips: ["Hip dysplasia & joint issues", "Post-surgical recovery", "Anxiety regulation", "In-clinic or home visits"],
    cta: "Book a canine session",
    href: "https://app.setmore.com/painandwellnesssolutions",
    art: { kind: "svg", render: () => <CanineIllustration /> },
    wash: {
      from: "oklch(94% 0.015 195)",
      to: "oklch(82% 0.035 200)",
      accent: "oklch(42% 0.06 200)",
    },
  },
];

function ArrowRight({ color }: { color: string }) {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
      aria-hidden
    >
      <path
        d="M1 7H18M18 7L12 1M18 7L12 13"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceCardRow({
  s,
  index,
  inView,
}: {
  s: ServiceCard;
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [canTilt, setCanTilt] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3.5, 3.5]), {
    stiffness: 180,
    damping: 22,
  });

  const artX = useTransform(mouseX, [-0.5, 0.5], [-14, 14]);
  const artY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);
  const washX = useTransform(mouseX, [-0.5, 0.5], [8, -8]);
  const washY = useTransform(mouseY, [-0.5, 0.5], [6, -6]);

  useEffect(() => {
    const check = () => setCanTilt(window.innerWidth >= 960 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canTilt || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [canTilt, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  }, [mouseX, mouseY]);

  const imageOnRight = index % 2 === 1;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.12 + index * 0.14 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        borderRadius: 28,
        overflow: "hidden",
        background: "#ffffff",
        border: "1px solid oklch(86% 0.018 195 / 0.7)",
        boxShadow: hovered
          ? "0 24px 60px oklch(20% 0.01 240 / 0.10), 0 2px 6px oklch(20% 0.01 240 / 0.05)"
          : "0 8px 24px oklch(20% 0.01 240 / 0.05), 0 1px 2px oklch(20% 0.01 240 / 0.03)",
        transition: "box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        transformStyle: "preserve-3d",
        perspective: 1400,
        rotateX: canTilt ? (rotateX as unknown as MotionValue<number>) : 0,
        rotateY: canTilt ? (rotateY as unknown as MotionValue<number>) : 0,
      }}
    >
      <div
        className="service-grid"
        style={{
          display: "grid",
          gridTemplateColumns: imageOnRight ? "1.05fr 0.95fr" : "0.95fr 1.05fr",
          minHeight: 460,
        }}
      >
        {/* Art panel */}
        <motion.div
          style={{
            order: imageOnRight ? 2 : 1,
            position: "relative",
            overflow: "hidden",
            background: `linear-gradient(135deg, ${s.wash.from}, ${s.wash.to})`,
            minHeight: 360,
          }}
          className="service-art"
        >
          {/* Soft animated wash */}
          <motion.div
            aria-hidden
            style={{
              position: "absolute",
              inset: -40,
              background: `radial-gradient(60% 60% at 30% 30%, ${s.wash.accent}22, transparent 70%), radial-gradient(50% 50% at 75% 70%, ${s.wash.accent}18, transparent 65%)`,
              x: washX,
              y: washY,
              filter: "blur(2px)",
            }}
          />

          {/* Subtle grid hairlines */}
          <svg
            aria-hidden
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08 }}
          >
            <defs>
              <pattern id={`grid-${s.num}`} width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M32 0H0V32" fill="none" stroke={s.wash.accent} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${s.num})`} />
          </svg>

          {/* Floating illustration / photo */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(2rem, 4vw, 3.5rem)",
              x: artX,
              y: artY,
            }}
          >
            {s.art.kind === "photo" ? (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: 18,
                  overflow: "hidden",
                  boxShadow: "0 18px 48px oklch(20% 0.01 240 / 0.20)",
                }}
              >
                <Image
                  src={s.art.src}
                  alt={s.art.alt}
                  fill
                  sizes="(max-width: 960px) 100vw, 600px"
                  style={{ objectFit: "cover" }}
                  priority={index === 0}
                />
              </div>
            ) : (
              <div style={{ width: "min(92%, 420px)", aspectRatio: "1", filter: "drop-shadow(0 8px 20px oklch(20% 0.01 240 / 0.12))" }}>
                {s.art.render()}
              </div>
            )}
          </motion.div>

          {/* Numeral — large ghosted */}
          <motion.span
            aria-hidden
            style={{
              position: "absolute",
              bottom: "1.25rem",
              left: imageOnRight ? "auto" : "1.5rem",
              right: imageOnRight ? "1.5rem" : "auto",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(5rem, 9vw, 8rem)",
              fontWeight: 400,
              color: s.wash.accent,
              opacity: 0.10,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              pointerEvents: "none",
            }}
          >
            {s.num}
          </motion.span>
        </motion.div>

        {/* Content panel */}
        <div
          style={{
            order: imageOnRight ? 1 : 2,
            padding: "clamp(2rem, 4vw, 3.5rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.25rem",
            position: "relative",
          }}
          className="service-content"
        >
          {/* Tag chip */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: s.wash.accent,
                background: `${s.wash.accent}14`,
                padding: "0.4rem 0.75rem",
                borderRadius: 999,
              }}
            >
              {s.tag}
            </span>
            <span
              aria-hidden
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.75rem",
                color: "var(--ink-faint)",
                letterSpacing: "0.04em",
              }}
            >
              — {s.num}
            </span>
          </div>

          {/* Heading */}
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 2.4vw, 2.125rem)",
              fontWeight: 400,
              color: "var(--ink)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              maxWidth: "32ch",
            }}
          >
            {s.heading}
          </h3>

          {/* Body */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              lineHeight: 1.7,
              color: "var(--ink-soft)",
              maxWidth: "44ch",
            }}
          >
            {s.body}
          </p>

          {/* Chips */}
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "0.25rem",
            }}
          >
            {s.chips.map((c) => (
              <li
                key={c}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  color: "var(--ink-soft)",
                  background: "oklch(96% 0.005 200)",
                  border: "1px solid oklch(88% 0.012 200)",
                  padding: "0.4rem 0.7rem",
                  borderRadius: 999,
                  letterSpacing: "0.01em",
                }}
              >
                {c}
              </li>
            ))}
          </ul>

          {/* CTA arrow link */}
          <a
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
            style={{
              marginTop: "0.875rem",
              alignSelf: "flex-start",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "var(--teal)",
              letterSpacing: "0.005em",
              padding: "0.625rem 0",
              borderBottom: `1.5px solid ${hovered ? "var(--teal)" : "transparent"}`,
              transition: "border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <span>{s.cta}</span>
            <motion.span
              animate={{ x: hovered ? 6 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "inline-flex" }}
            >
              <ArrowRight color="var(--teal)" />
            </motion.span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={ref}
      style={{
        background: "var(--cream-warm)",
        padding: "clamp(5rem, 10vw, 9rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section ambient wash */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(60% 50% at 10% 10%, oklch(78% 0.03 195 / 0.18), transparent 60%), radial-gradient(40% 35% at 90% 80%, oklch(35% 0.045 55 / 0.08), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginBottom: "clamp(3rem, 5vw, 4.5rem)",
            maxWidth: 720,
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--teal-accent)",
              marginBottom: "1rem",
            }}
          >
            What brings you here
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "var(--ink)",
              marginBottom: "1rem",
            }}
          >
            Three ways the work shows up.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
              lineHeight: 1.65,
              color: "var(--ink-soft)",
              maxWidth: 580,
            }}
          >
            People come carrying pain. Horses come carrying tension. Dogs come carrying age.
            The body knows what to do — Bowen therapy gives it the room.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.5rem, 2.5vw, 2.25rem)" }}>
          {services.map((s, i) => (
            <ServiceCardRow key={s.num} s={s} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .service-grid {
            grid-template-columns: 1fr !important;
          }
          .service-art {
            order: 1 !important;
            min-height: 280px !important;
          }
          .service-content {
            order: 2 !important;
          }
        }
      `}</style>
    </section>
  );
}
