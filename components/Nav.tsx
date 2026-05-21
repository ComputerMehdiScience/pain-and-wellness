"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const links = [
  { label: "About Kathy", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Equine & Canine", href: "#animals" },
  { label: "Results", href: "#results" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 76,
          display: "flex",
          alignItems: "center",
          padding: "0 clamp(1.5rem, 4vw, 3.5rem)",
          background: scrolled
            ? "oklch(97% 0.008 90 / 0.88)"
            : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled
            ? "1px solid oklch(86% 0.018 195 / 0.6)"
            : "1px solid transparent",
          transition:
            "background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease",
        }}
      >
        {/* Logo — PNG at top, slides up into compact wordmark when scrolled */}
        <a
          href="/"
          aria-label="Pain & Wellness Solutions — home"
          style={{
            position: "relative",
            display: "block",
            width: 220,
            height: 60,
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {/* Full PNG logo — visible at top, slides up & fades when scrolled */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              transform: scrolled ? "translateY(-72px)" : "translateY(0)",
              opacity: scrolled ? 0 : 1,
              transition:
                "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
              willChange: "transform, opacity",
            }}
          >
            <Image
              src="/logotransparent.png"
              alt="Pain & Wellness Solutions"
              width={220}
              height={60}
              priority
              style={{
                width: "auto",
                height: "100%",
                objectFit: "contain",
                objectPosition: "left center",
              }}
            />
          </div>

          {/* Compact text wordmark — slides up from below when scrolled */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontSize: "1.125rem",
              fontWeight: 500,
              color: "var(--teal-accent)",
              letterSpacing: "0.005em",
              lineHeight: 1.15,
              transform: scrolled ? "translateY(0)" : "translateY(72px)",
              opacity: scrolled ? 1 : 0,
              transition:
                "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.08s, opacity 0.4s ease 0.12s",
              willChange: "transform, opacity",
            }}
          >
            <span>Pain &amp; Wellness</span>
            <span
              style={{
                fontSize: "0.625rem",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--ink-soft)",
                marginTop: "0.15rem",
              }}
            >
              Solutions
            </span>
          </div>
        </a>

        <div style={{ flex: 1 }} />

        {/* Desktop links */}
        <div
          className="nav-links"
          style={{
            display: "flex",
            gap: "2.25rem",
            alignItems: "center",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                fontWeight: 500,
                letterSpacing: "0.005em",
                color: "var(--ink)",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--teal)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--ink)")
              }
            >
              {l.label}
            </a>
          ))}

          <a
            href="https://app.setmore.com/painandwellnesssolutions"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              letterSpacing: "0.005em",
              color: "#ffffff",
              background: "var(--teal)",
              padding: "0.75rem 1.5rem",
              borderRadius: 999,
              transition: "background 0.25s ease, transform 0.25s ease",
              marginLeft: "0.5rem",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--teal-deep)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--teal)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Book now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            padding: "0.5rem",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 24,
                height: 1.75,
                background: "var(--ink)",
                borderRadius: 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 68,
            left: 0,
            right: 0,
            zIndex: 99,
            background: "var(--warm-cream)",
            borderBottom: "1px solid var(--warm-mid)",
            padding: "1.5rem clamp(1.25rem, 4vw, 3rem)",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                fontWeight: 400,
                color: "var(--earth-soft)",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://app.setmore.com/painandwellnesssolutions"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#ffffff",
              background: "var(--teal)",
              padding: "0.75rem 1.5rem",
              borderRadius: 3,
              textAlign: "center",
              marginTop: "0.5rem",
            }}
          >
            Book an appointment
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
