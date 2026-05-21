"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const row1 = [
  { text: "Kathy is amazing! My body feels so much more aligned and relaxed after every appointment.", name: "Karen Weichenthal" },
  { text: "Kathy has been an integral part of my healing process. I can't thank her enough for making me pain free!", name: "Andrea Veldhuyzen" },
  { text: "I had 2 sessions with Kathy and am amazed at how well I am feeling. She finds the target areas and does her magic. My body is thanking her!", name: "Tracey" },
  { text: "I started Bowen therapy today with Kathy and all I can say is WOW! Looking forward to continuing my healing journey.", name: "Leslie" },
  { text: "Bowen is a quality of life saver for me. So very thankful that I am up and walking, working and playing.", name: "Susan Irwin" },
  { text: "Totally satisfied with results from Kathy. Neck had been bothering me for months. After the session the pain went from a 10 to a 3.", name: "Lyle" },
];

const row2 = [
  { text: "I was able to go to Cambellford shopping by myself for the first time in about 2 years. THANKS Kathy.", name: "Linda Robinson" },
  { text: "After years of chiropractor, osteopath and massage, I have finally found that Bowen Therapy works best for my body. I no longer do any other therapy.", name: "Tiff" },
  { text: "Kathy is very professional with great knowledge of the muscular system. Has even helped with eliminating headaches!", name: "Pam Lafferton" },
  { text: "Kathy has healing fingers. Her knowledge and caring for your well-being is comforting.", name: "Cathy Campbell" },
  { text: "Kathy knows exactly how to make me feel better so I can enjoy barrel racing my horse!", name: "Andrea Veldhuyzen" },
  { text: "Best treatment I have received. Kathy is easy to talk to and always gives me exercises to help with my healing process.", name: "Yvonne Orser" },
];

function Stars() {
  return (
    <div style={{ display: "flex", gap: 4 }} aria-label="5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="var(--teal-accent)" aria-hidden>
          <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ text, name }: { text: string; name: string }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: "1.5rem 1.75rem",
        width: 340,
        flexShrink: 0,
        boxShadow: "0 2px 8px oklch(42% 0.06 200 / 0.08), 0 1px 2px oklch(42% 0.06 200 / 0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        border: "1px solid oklch(86% 0.018 195 / 0.5)",
      }}
    >
      <Stars />
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", lineHeight: 1.65, color: "var(--ink)", flex: 1 }}>
        &ldquo;{text}&rdquo;
      </p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 600, color: "var(--teal-accent)" }}>
        {name}
      </p>
    </div>
  );
}

function MarqueeRow({ reviews, reverse }: { reviews: typeof row1; reverse?: boolean }) {
  const doubled = [...reviews, ...reviews];
  return (
    /* overflow wrapper — holds the edge fade mask */
    <div
      className="marquee-fade"
      style={{ overflow: "hidden", width: "100%" }}
    >
      <div
        className={reverse ? "marquee-track marquee-reverse" : "marquee-track"}
        style={{ display: "flex", gap: "1.25rem", width: "max-content", willChange: "transform" }}
      >
        {doubled.map((r, i) => (
          <ReviewCard key={i} text={r.text} name={r.name} />
        ))}
      </div>
    </div>
  );
}

export default function Results() {
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
      id="results"
      ref={ref}
      style={{
        background: "var(--cream-warm)",
        padding: "clamp(5rem, 10vw, 9rem) 0",
        overflow: "hidden",
      }}
    >
      {/* Heading */}
      <div style={{ padding: "0 clamp(2.5rem, 6vw, 6rem)", maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "clamp(1.5rem, 3vw, 2.5rem)", textAlign: "center" }}
        >
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.75rem, 5vw, 4.25rem)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
            color: "var(--teal-accent)",
            marginBottom: "1rem",
          }}>
            Real clients, real changes.
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
            lineHeight: 1.6,
            color: "var(--ink-soft)",
            maxWidth: 540,
            margin: "0 auto",
          }}>
            Here&apos;s what people and their animals have to say after working together.
          </p>
        </motion.div>
      </div>

      {/* Marquees — Framer only fades this wrapper, never the tracks */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div style={{ padding: "0 clamp(1.5rem, 4vw, 4rem)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", padding: "2rem 0" }}>
            <MarqueeRow reviews={row1} />
            <MarqueeRow reviews={row2} reverse />
          </div>
        </div>
      </motion.div>

      <style>{`
        .marquee-track {
          animation: marquee-left 60s linear infinite;
        }
        .marquee-reverse {
          animation: marquee-right 60s linear infinite;
        }
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-fade {
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        .marquee-track:hover,
        .marquee-reverse:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track, .marquee-reverse { animation: none; }
        }
      `}</style>
    </section>
  );
}
