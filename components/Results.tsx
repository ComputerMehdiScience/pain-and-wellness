"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";

const testimonials = [
  {
    text: "Bowen therapy healed my Bell's Palsy in just three sessions. My sleep improved, jaw tension disappeared. I had tried everything else first.",
    name: "Sarah M.",
    detail: "Bell's Palsy · Belleville",
    initials: "SM",
  },
  {
    text: "I came in with sore knees and didn't realize how crooked I was. After treatment, my shoulders are square and my knee doesn't hurt anymore.",
    name: "Dave R.",
    detail: "Chronic knee pain · Stirling",
    initials: "DR",
  },
  {
    text: "The jaw exercises Kathy gave me have helped so much with my grinding at night. I notice the difference immediately after each session.",
    name: "Linda T.",
    detail: "TMJ & jaw tension · Trenton",
    initials: "LT",
  },
  {
    text: "My mare was reluctant to pick up her left lead for months. After one session with Kathy she moved completely differently. The farrier noticed too.",
    name: "Rachel B.",
    detail: "Equine bodywork · Hastings",
    initials: "RB",
  },
  {
    text: "I was skeptical about Bowen therapy but my chiropractor suggested it for my sciatica. Three sessions later and I'm pain-free for the first time in two years.",
    name: "Mark H.",
    detail: "Sciatica · Bancroft",
    initials: "MH",
  },
  {
    text: "Kathy came out to see my gelding after his surgery. He was head-shy and stiff. She worked with him twice and he's a different horse.",
    name: "Diane P.",
    detail: "Post-surgical horse · Stirling",
    initials: "DP",
  },
  {
    text: "My 12-year-old lab has hip dysplasia. After canine Bowen she gets up from the floor so much easier. We both leave Kathy's feeling lighter.",
    name: "Carol W.",
    detail: "Canine Bowen · Belleville",
    initials: "CW",
  },
  {
    text: "The Healing with the Herd session was unlike anything I've experienced. I cried. The horses just knew exactly where to stand.",
    name: "Jennifer A.",
    detail: "Healing with the Herd · Quinte",
    initials: "JA",
  },
  {
    text: "I drive 45 minutes to see Kathy. She's honest, thorough, and the results actually hold between sessions. Worth every kilometre.",
    name: "Tom F.",
    detail: "Postural imbalance · Campbellford",
    initials: "TF",
  },
];

const col1 = testimonials.slice(0, 3);
const col2 = testimonials.slice(3, 6);
const col3 = testimonials.slice(6, 9);


export default function Results() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [col2Visible, setCol2Visible] = useState(false);
  const [col3Visible, setCol3Visible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => {
      setCol2Visible(window.innerWidth >= 768);
      setCol3Visible(window.innerWidth >= 1100);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section
      id="results"
      ref={ref}
      style={{
        background: "var(--warm-stone)",
        padding: "clamp(5rem, 10vw, 9rem) 0",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 3rem)" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)", textAlign: "center" }}
        >
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
            fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.1,
            color: "var(--deep-forest)",
          }}>
            Real clients, real changes.
          </h2>
        </motion.div>

        {/* Scrolling columns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: "flex",
            gap: "1rem",
            maxHeight: 580,
            overflow: "hidden",
            maskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          }}
        >
          <TestimonialsColumn testimonials={col1} duration={18} visible={true} />
          <TestimonialsColumn testimonials={col2} duration={22} visible={col2Visible} />
          <TestimonialsColumn testimonials={col3} duration={16} visible={col3Visible} />
        </motion.div>

      </div>
    </section>
  );
}
