"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CircularTestimonials } from "@/components/circular-testimonials";

const testimonials = [
  {
    name: "Crooked posture & sore knees",
    quote: "I came to Kathy because I had sore knees. I didn't realize I was so crooked and that my shoulders were out. After her treatments, my shoulders are square and my knee doesn't hurt anymore. Thank you Kathy!",
    src: "/photos/crooked result.webp",
  },
  {
    name: "Bell's Palsy recovery",
    quote: "Bowen Therapy healed my Bell's Palsy in just three sessions. Just look at the difference in my feet! My sleep improved, jaw tension disappeared, and my stress levels dropped. Truly life-changing! Huge thanks to Kathy for this incredible healing experience. I didn't realize the effects of what proper balance can do for my body!",
    src: "/photos/bells palsy result.webp",
  },
  {
    name: "Jaw grinding & tension",
    quote: "The work Kathy does on my jaw bones and the exercises she gave me have helped me a lot from grinding my teeth at night. Thank you so much Kathy!",
    src: "/photos/jaw result.webp",
  },
];

export default function TestimonialsBlock() {
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
          testimonials={testimonials}
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
