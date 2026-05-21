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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    let sectionTop = 0;
    let sectionHeight = 0;

    const measure = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      sectionTop = window.scrollY + rect.top;
      sectionHeight = sectionRef.current.offsetHeight;
    };

    const onScroll = () => {
      if (!sectionRef.current) return;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const start = sectionTop;
      const end = sectionTop + sectionHeight - vh;

      // Is the sticky panel in its pinned zone?
      const inZone = y >= start && y <= sectionTop + sectionHeight;
      setPinned(inZone);

      if (y < start) { setActiveStep(0); return; }
      if (y > end) { setActiveStep(steps.length - 1); return; }

      const progress = (y - start) / (end - start);
      const step = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActiveStep(step);
    };

    measure();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { measure(); onScroll(); });

    // Re-measure after a tick for hydration offset
    setTimeout(() => { measure(); onScroll(); }, 200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", () => { measure(); onScroll(); });
    };
  }, []);

  return (
    <section
      id="process"
      style={{
        background: "var(--cream)",
        height: `${steps.length * 100}vh`,
        position: "relative",
        zIndex: 6,
      }}
    >
      {/*
        We can't use position:sticky — Lenis sets overflow:hidden on <html>.
        Instead: fixed positioning while inside the section, normal flow otherwise.
        The outer section reserves the 400vh scroll distance.
      */}
      <div ref={sectionRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      <div
        style={{
          position: pinned ? "fixed" : "absolute",
          top: pinned ? 0 : undefined,
          bottom: !pinned ? 0 : undefined,
          left: 0,
          right: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          pointerEvents: "all",
          zIndex: 6,
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
                color: "var(--teal-deep)",
                marginBottom: "clamp(2.5rem, 5vw, 4rem)",
              }}
            >
              Your first visit,<br />start to finish.
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  onClick={() => setActiveStep(i)}
                  style={{
                    display: "flex",
                    gap: "1.25rem",
                    alignItems: "flex-start",
                    paddingBottom: i < steps.length - 1 ? "1.5rem" : 0,
                    position: "relative",
                    cursor: "pointer",
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
                        background: "var(--cream-edge)",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          background: "var(--teal-accent)",
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
                      border: `2px solid ${activeStep >= i ? "var(--teal-accent)" : "var(--cream-edge)"}`,
                      background: activeStep === i ? "var(--teal-accent)" : activeStep > i ? "oklch(53% 0.055 195 / 0.15)" : "transparent",
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
                        <path d="M2.5 7l3 3 6-6" stroke="var(--teal-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <span style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        color: activeStep === i ? "#ffffff" : "var(--ink-faint)",
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
                      color: activeStep === i ? "var(--teal-deep)" : "var(--ink-faint)",
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
                  background: "var(--cream-warm)",
                  border: "1px solid var(--cream-edge)",
                  borderRadius: 12,
                  padding: "clamp(2rem, 4vw, 3rem)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
                  <span style={{ fontSize: "2.5rem", lineHeight: 1 }}>{steps[activeStep].icon}</span>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "5rem",
                      fontWeight: 400,
                      lineHeight: 1,
                      color: "oklch(53% 0.055 195 / 0.1)",
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
                  color: "var(--teal-deep)",
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
                  color: "var(--ink)",
                  marginBottom: "1.25rem",
                }}>
                  {steps[activeStep].body}
                </p>

                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  lineHeight: 1.75,
                  color: "var(--ink-soft)",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid var(--cream-edge)",
                }}>
                  {steps[activeStep].detail}
                </p>

                <div style={{ display: "flex", gap: "0.4rem", marginTop: "2rem" }}>
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        height: 3,
                        borderRadius: 2,
                        background: i === activeStep ? "var(--teal-accent)" : "var(--cream-edge)",
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
