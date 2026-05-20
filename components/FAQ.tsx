"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "Is Bowen therapy covered by insurance?", a: "Many extended health care plans include Bowen therapy. Check with your provider — receipts are provided for all sessions. Cash, e-transfer, and major credit cards accepted." },
  { q: "How many sessions will I need?", a: "Most clients see meaningful results in 3–6 sessions. Chronic or complex issues may need more. We discuss this at your first appointment — no one-size-fits-all answer." },
  { q: "What should I expect at my first visit?", a: "First sessions run 60–75 minutes. Wear comfortable, loose clothing. Kathy will assess your posture, movement patterns, and pain history before treatment begins. Most people leave deeply relaxed." },
  { q: "Do you treat horses and dogs?", a: "Yes. Horse visits are done at your farm across Hastings County — no trailering required. Dog sessions are in-clinic or at your home. Call to arrange animal appointments." },
  { q: "Can I keep seeing my doctor or chiropractor?", a: "Absolutely. Bowen works alongside conventional care. Kathy actively encourages an integrated approach. Many clients see her in addition to physiotherapy, massage, or chiropractic." },
  { q: "Does Bowen therapy hurt?", a: "No. Very gentle, precise moves — no sustained pressure, no cracking, no manipulation. Most people describe it as profoundly relaxing. Suitable for all ages and pain levels." },
];

function FaqItem({ q, a, i, inView }: { q: string; a: string; i: number; inView: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
      style={{ borderBottom: "1px solid var(--warm-mid)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", textAlign: "left", padding: "1.375rem 0",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem",
          background: "none", cursor: "pointer",
        }}
      >
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "1rem",
          fontWeight: 500,
          color: open ? "var(--forest)" : "var(--earth-text)",
          lineHeight: 1.3,
          transition: "color 0.2s",
        }}>{q}</span>
        <span style={{
          width: 26, height: 26, borderRadius: "50%",
          border: "1px solid var(--warm-mid)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          background: open ? "oklch(35% 0.075 155 / 0.07)" : "transparent",
          transition: "background 0.2s",
        }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}>
            <path d="M6 1v10M1 6h10" stroke={open ? "var(--sage)" : "var(--earth-soft)"} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem", fontWeight: 300, lineHeight: 1.8,
              color: "var(--earth-soft)", paddingBottom: "1.5rem", maxWidth: "62ch",
            }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
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
    <section id="faq" ref={ref} style={{ background: "var(--warm-stone)", padding: "clamp(5rem, 10vw, 9rem) 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 3rem)", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "clamp(3rem, 6vw, 7rem)", alignItems: "start" }} className="faq-grid">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "sticky", top: "5.5rem" }}
        >
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--deep-forest)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Common questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            <a href="tel:6138851311" style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500, color: "var(--forest)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.875rem" }}>📞</span> 613-885-1311
            </a>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 300, color: "var(--earth-soft)" }}>
              89 Salem Road, Stirling ON<br />Mon–Fri 9am–5pm
            </p>
          </div>
        </motion.div>

        <div style={{ borderTop: "1px solid var(--warm-mid)" }}>
          {faqs.map((f, i) => <FaqItem key={f.q} q={f.q} a={f.a} i={i} inView={inView} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) { .faq-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
