"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "You book online",
    body: "Takes two minutes. Pick a time that works, choose your service. New patients are always welcome — no referral needed.",
    detail: "First sessions are 60–75 minutes. Wear comfortable, loose clothing. Kathy will review your history before anything begins.",
    icon: "📅",
  },
  {
    n: "02",
    title: "Kathy takes your full history",
    body: "Not just \"where does it hurt.\" She maps your posture, movement patterns, past injuries, stress load — everything that led to where you are now.",
    detail: "This is what separates Bowen therapy from a standard massage. Root cause, not just the symptom that brought you in.",
    icon: "📋",
  },
  {
    n: "03",
    title: "The treatment itself",
    body: "Gentle, precise moves on specific muscles and connective tissue. Pauses between each sequence. No cracking, no deep pressure, no pain.",
    detail: "Most people feel deeply relaxed within minutes. Some notice shifts immediately — others feel the difference over the next few days as the nervous system responds.",
    icon: "🤲",
  },
  {
    n: "04",
    title: "You leave feeling different",
    body: "Drink water. Rest the day. The body keeps working after you leave — the nervous system is still processing the reset.",
    detail: "Most clients need 3–6 sessions. Many extended health plans cover Bowen therapy. Receipts provided for all sessions.",
    icon: "✨",
  },
];

export default function WhatToExpect() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      const step = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActiveStep(step);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--warm-cream)",
        height: `${steps.length * 100}vh`,
        position: "relative",
      }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            width: "100%",
            margin: "0 auto",
            padding: "0 clamp(1.5rem, 4vw, 3rem)",
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "clamp(3rem, 6vw, 7rem)",
            alignItems: "center",
          }}
          className="wte-grid"
        >
          {/* Left: heading + step nav */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
                color: "var(--deep-forest)",
                marginBottom: "clamp(2.5rem, 5vw, 4rem)",
              }}
            >
              Your first visit, start to finish.
            </h2>

            {/* Step list nav */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  style={{
                    display: "flex",
                    gap: "1.25rem",
                    alignItems: "flex-start",
                    paddingBottom: i < steps.length - 1 ? "1.5rem" : 0,
                    position: "relative",
                  }}
                >
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: 19,
                        top: 40,
                        width: 2,
                        height: "calc(100% - 8px)",
                        background: "var(--warm-mid)",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          background: "var(--sage)",
                          height: activeStep > i ? "100%" : "0%",
                          transition: "height 0.5s cubic-bezier(0.16,1,0.3,1)",
                        }}
                      />
                    </div>
                  )}

                  {/* Circle */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      border: `2px solid ${activeStep >= i ? "var(--sage)" : "var(--warm-mid)"}`,
                      background: activeStep === i ? "var(--sage)" : activeStep > i ? "oklch(55% 0.085 150 / 0.15)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                      zIndex: 1,
                    }}
                  >
                    {activeStep > i ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <span style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        color: activeStep === i ? "oklch(96% 0.012 82)" : "var(--earth-faint)",
                        letterSpacing: "0.04em",
                        transition: "color 0.3s ease",
                      }}>
                        {s.n}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <div style={{ paddingTop: "0.625rem" }}>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      fontWeight: activeStep === i ? 600 : 400,
                      color: activeStep === i ? "var(--deep-forest)" : "var(--earth-faint)",
                      transition: "all 0.3s ease",
                      lineHeight: 1.3,
                    }}>
                      {s.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: animated step content */}
          <div style={{ position: "relative", minHeight: 320 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: "var(--warm-stone)",
                  border: "1px solid var(--warm-mid)",
                  borderRadius: 12,
                  padding: "clamp(2rem, 4vw, 3rem)",
                }}
              >
                {/* Step number + icon */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
                  <span style={{ fontSize: "2.5rem", lineHeight: 1 }}>{steps[activeStep].icon}</span>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "5rem",
                      fontWeight: 400,
                      lineHeight: 1,
                      color: "oklch(35% 0.075 155 / 0.1)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {steps[activeStep].n}
                  </div>
                </div>

                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  fontWeight: 400,
                  color: "var(--deep-forest)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  marginBottom: "1.125rem",
                }}>
                  {steps[activeStep].title}
                </h3>

                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 400,
                  lineHeight: 1.8,
                  color: "var(--earth-text)",
                  marginBottom: "1.25rem",
                }}>
                  {steps[activeStep].body}
                </p>

                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  lineHeight: 1.75,
                  color: "var(--earth-soft)",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid var(--warm-mid)",
                }}>
                  {steps[activeStep].detail}
                </p>

                {/* Progress dots */}
                <div style={{ display: "flex", gap: "0.4rem", marginTop: "2rem" }}>
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        height: 3,
                        borderRadius: 2,
                        background: i === activeStep ? "var(--sage)" : "var(--warm-mid)",
                        width: i === activeStep ? 24 : 8,
                        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .wte-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
