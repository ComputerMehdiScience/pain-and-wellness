"use client";

import { useRef, useEffect } from "react";

interface Testimonial {
  text: string;
  name: string;
  detail: string;
  initials: string;
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      style={{
        background: "var(--warm-cream)",
        border: "1px solid var(--warm-mid)",
        borderRadius: 6,
        padding: "1.375rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginBottom: "1rem",
        flexShrink: 0,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "0.9375rem",
          fontWeight: 400,
          lineHeight: 1.65,
          color: "var(--earth-text)",
        }}
      >
        &ldquo;{t.text}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "oklch(35% 0.075 155 / 0.12)",
            border: "1px solid oklch(35% 0.075 155 / 0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--forest)",
            flexShrink: 0,
            letterSpacing: "0.04em",
          }}
        >
          {t.initials}
        </div>
        <div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--earth-text)",
              lineHeight: 1.2,
            }}
          >
            {t.name}
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6875rem",
              fontWeight: 400,
              color: "var(--sage)",
              marginTop: "0.15rem",
              letterSpacing: "0.03em",
            }}
          >
            {t.detail}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsColumn({
  testimonials,
  duration = 15,
  visible = true,
}: {
  testimonials: Testimonial[];
  duration?: number;
  visible?: boolean;
}) {
  if (!visible) return null;

  const doubled = [...testimonials, ...testimonials];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflow: "hidden",
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          animation: `scrollUp ${duration}s linear infinite`,
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>

      <style>{`
        @keyframes scrollUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
}
