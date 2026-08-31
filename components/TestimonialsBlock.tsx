"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CircularTestimonials } from "@/components/circular-testimonials";
import type { Testimonial } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

export default function TestimonialsBlock({ testimonials }: { testimonials: Testimonial[] }) {
  const slides = testimonials.map((t) => ({
    name: t.name,
    quote: t.quote,
    src: urlForImage(t.photo).width(900).height(900).fit("crop").url(),
  }));
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--cream-warm)",
        padding: "clamp(5rem, 9vw, 8rem) clamp(2.5rem, 6vw, 6rem)",
      }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: "center", marginBottom: "clamp(3rem, 5vw, 5rem)" }}
      >
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.75rem, 5vw, 4.25rem)",
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          color: "var(--teal-accent)",
        }}>
          Real clients, real changes.
        </h2>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          color: "var(--ink-soft)",
          marginTop: "0.875rem",
          lineHeight: 1.65,
        }}>
          Here's what people have to say after working with Kathy.
        </p>
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <CircularTestimonials
          testimonials={slides}
          autoplay={true}
          colors={{
            testimony: "var(--ink)",
            arrowBackground: "#141414",
            arrowForeground: "#f1f1f7",
            arrowHoverBackground: "var(--teal-accent)",
          }}
          fontSizes={{
            quote: "clamp(1rem, 1.5vw, 1.2rem)",
          }}
        />
      </motion.div>
    </section>
  );
}
