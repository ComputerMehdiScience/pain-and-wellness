"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

function CheckShieldIcon({ color = "var(--teal)" }: { color?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2.5l8 3v6.5c0 5-3.4 8.5-8 9.5-4.6-1-8-4.5-8-9.5V5.5l8-3z"
        fill={color}
        fillOpacity="0.16"
        stroke={color}
        strokeWidth="1.6"
      />
      <path
        d="M8.5 12.5l2.5 2.5 4.5-5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon({ color = "var(--teal)" }: { color?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s-7-7.5-7-12a7 7 0 1114 0c0 4.5-7 12-7 12z"
        fill={color}
        fillOpacity="0.16"
        stroke={color}
        strokeWidth="1.6"
      />
      <circle cx="12" cy="9.5" r="2.5" fill={color} />
    </svg>
  );
}

function LeafIcon({ color = "var(--brown)" }: { color?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20c0-9 7-16 16-16 0 9-7 16-16 16z"
        fill={color}
        fillOpacity="0.18"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M4 20l9-9"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FloatingCard({
  icon,
  eyebrow,
  title,
  delay,
  style,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  delay: number;
  style: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        background: "#ffffff",
        borderRadius: 24,
        padding: "1.25rem 1.75rem",
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        boxShadow:
          "0 1px 2px oklch(20% 0.01 240 / 0.04), 0 18px 38px oklch(20% 0.01 240 / 0.12)",
        border: "1px solid oklch(86% 0.018 195 / 0.5)",
        minWidth: 0,
        ...style,
      }}
    >
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "oklch(94% 0.015 195)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-faint)",
            lineHeight: 1,
          }}
        >
          {eyebrow}
        </p>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.1875rem",
            fontWeight: 500,
            color: "var(--ink)",
            lineHeight: 1.2,
            marginTop: "0.4rem",
            letterSpacing: "-0.005em",
          }}
        >
          {title}
        </p>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  /* Mouse parallax for orb layer */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 35, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 35, damping: 28 });
  const orbX = useTransform(springX, [-0.5, 0.5], [-28, 28]);
  const orbY = useTransform(springY, [-0.5, 0.5], [-18, 18]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        background: "var(--cream)",
        overflow: "hidden",
        paddingTop: "clamp(7rem, 11vw, 9.5rem)",
        paddingBottom: "clamp(3rem, 6vw, 5rem)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ── Floating orb layer (parallax-driven) ── */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          x: orbX,
          y: orbY,
        }}
      >
        {/* Primary glow — large, top-center, slowest drift */}
        <div
          className="orb orb-a"
          style={{
            position: "absolute",
            top: "2%",
            left: "28%",
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 40% 40%, oklch(78% 0.042 195 / 0.28), transparent 68%)",
            filter: "blur(72px)",
          }}
        />
        {/* Secondary glow — medium, bottom-right */}
        <div
          className="orb orb-b"
          style={{
            position: "absolute",
            bottom: "8%",
            right: "8%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 60% 55%, oklch(72% 0.05 188 / 0.20), transparent 68%)",
            filter: "blur(58px)",
          }}
        />
        {/* Warm accent — bottom-left, warm cream tone */}
        <div
          className="orb orb-c"
          style={{
            position: "absolute",
            bottom: "22%",
            left: "3%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 50%, oklch(85% 0.028 80 / 0.22), transparent 68%)",
            filter: "blur(52px)",
          }}
        />
        {/* Tiny accent — top-right, deepest teal */}
        <div
          className="orb orb-d"
          style={{
            position: "absolute",
            top: "20%",
            right: "3%",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 45% 45%, oklch(68% 0.062 195 / 0.15), transparent 68%)",
            filter: "blur(42px)",
          }}
        />
        {/* Whisper orb — center-left, barely visible */}
        <div
          className="orb orb-e"
          style={{
            position: "absolute",
            top: "55%",
            left: "18%",
            width: 260,
            height: 260,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 50%, oklch(76% 0.035 200 / 0.14), transparent 68%)",
            filter: "blur(48px)",
          }}
        />
      </motion.div>

      {/* Static ambient washes (no parallax, always present) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(55% 50% at 15% 18%, oklch(78% 0.03 195 / 0.12), transparent 65%), radial-gradient(40% 35% at 92% 75%, oklch(78% 0.03 195 / 0.10), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative outline curves — top-left */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        style={{
          position: "absolute",
          top: "14%",
          left: "-30px",
          width: 160,
          height: 160,
          opacity: 0.4,
        }}
      >
        <path
          d="M20 60c20-40 80-40 120 0"
          stroke="var(--teal-light)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="160" cy="80" r="6" fill="var(--teal-light)" opacity="0.6" />
      </svg>

      {/* Main grid */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1600,
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 3.5vw, 5rem)",
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "clamp(2rem, 4vw, 5rem)",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* LEFT — content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.25rem, 5vw, 5.75rem)",
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: "clamp(1.5rem, 2.5vw, 2rem)",
            }}
          >
            {[
              { text: "Bowen therapy", accent: false, delay: 0.05 },
              { text: "for you and", accent: true, delay: 0.22 },
              { text: "your animals.", accent: false, delay: 0.4 },
            ].map((line, i) => (
              <motion.span
                key={i}
                initial={{ y: 52, opacity: 0 }}
                animate={mounted ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.95,
                  ease: [0.16, 1, 0.3, 1],
                  delay: line.delay,
                }}
                style={{
                  display: "block",
                  color: line.accent ? "var(--teal)" : undefined,
                  fontStyle: line.accent ? "italic" : "normal",
                }}
              >
                {line.text}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)",
              lineHeight: 1.65,
              color: "var(--ink-soft)",
              maxWidth: "46ch",
              marginBottom: "clamp(2rem, 3.5vw, 2.75rem)",
            }}
          >
            Gentle, hands-on care in Stirling and Hastings County for pain,
            stiffness, scar tissue, stress, and animals that are not moving like
            themselves.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://app.setmore.com/painandwellnesssolutions"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.01em",
                color: "#ffffff",
                background: "var(--teal)",
                padding: "1.125rem 2.25rem",
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                transition: "background 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--teal-deep)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--teal)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Book an appointment
              <svg width="18" height="14" viewBox="0 0 16 12" fill="none" aria-hidden>
                <path
                  d="M1 6h13M14 6L9 1M14 6L9 11"
                  stroke="#ffffff"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href="/services"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.01em",
                color: "var(--ink)",
                padding: "1rem 1.5rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                borderBottom: "1.5px solid transparent",
                transition: "border-color 0.25s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderBottomColor = "var(--ink)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderBottomColor = "transparent")
              }
            >
              View services
              <svg width="16" height="12" viewBox="0 0 14 10" fill="none" aria-hidden>
                <path
                  d="M1 5h12M13 5L9 1M13 5L9 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* RIGHT — photo cluster */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          style={{
            position: "relative",
            aspectRatio: "1",
            width: "100%",
            maxWidth: 820,
            justifySelf: "center",
          }}
          className="hero-photo-cluster"
        >
          {/* Soft circular backdrop */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, oklch(94% 0.015 195), oklch(86% 0.025 195))",
            }}
          />

          {/* Outer dashed ring */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "-3%",
              borderRadius: "50%",
              border: "1px dashed oklch(78% 0.03 195 / 0.7)",
            }}
          />

          {/* Photo — perfect circle */}
          <div
            style={{
              position: "absolute",
              inset: "4%",
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow:
                "0 30px 80px oklch(20% 0.01 240 / 0.22), 0 4px 12px oklch(20% 0.01 240 / 0.08)",
            }}
          >
            <Image
              src="/photos/hero-photo.png"
              alt="Kathy Morton smiling while working on a client — Pain & Wellness Solutions"
              fill
              sizes="(max-width: 960px) 90vw, 620px"
              priority
              style={{ objectFit: "cover", objectPosition: "center 22%" }}
            />
          </div>

          {/* Floating cards */}
          <FloatingCard
            icon={<CheckShieldIcon />}
            eyebrow="Certified"
            title="Bowen Therapist"
            delay={0.95}
            style={{ top: "6%", left: "-10%" }}
          />
          <FloatingCard
            icon={<PinIcon />}
            eyebrow="Stirling, ON"
            title="Mobile farm visits"
            delay={1.1}
            style={{ top: "44%", right: "-5%" }}
          />
          <FloatingCard
            icon={<LeafIcon />}
            eyebrow="Drug-free"
            title="Hands-on therapy"
            delay={1.25}
            style={{ bottom: "4%", left: "-4%" }}
          />
        </motion.div>
      </div>

      <style>{`
        .orb { will-change: transform; }

        .orb-a { animation: float-a 20s ease-in-out infinite; }
        .orb-b { animation: float-b 26s ease-in-out infinite; }
        .orb-c { animation: float-c 30s ease-in-out infinite; }
        .orb-d { animation: float-a 17s ease-in-out infinite reverse; }
        .orb-e { animation: float-b 23s ease-in-out infinite reverse; }

        @keyframes float-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(22px, -28px) scale(1.04); }
          66%       { transform: translate(-16px, 18px) scale(0.97); }
        }
        @keyframes float-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(-24px, 16px) scale(1.06); }
          70%       { transform: translate(20px, -20px) scale(0.96); }
        }
        @keyframes float-c {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25%       { transform: translate(28px, 22px) scale(1.04); }
          75%       { transform: translate(-18px, -26px) scale(1.07); }
        }

        @media (prefers-reduced-motion: reduce) {
          .orb { animation: none !important; }
        }

        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .hero-photo-cluster {
            order: -1;
            max-width: 460px !important;
            width: 100%;
          }
        }
        @media (max-width: 560px) {
          .hero-photo-cluster {
            max-width: 360px !important;
          }
        }
      `}</style>
    </section>
  );
}
