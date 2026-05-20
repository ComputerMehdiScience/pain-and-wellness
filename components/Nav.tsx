"use client";

import { useState, useEffect } from "react";

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
          height: 68,
          display: "flex",
          alignItems: "center",
          padding: "0 clamp(1.25rem, 4vw, 3rem)",
          background: scrolled
            ? "oklch(96% 0.012 82 / 0.96)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid oklch(78% 0.018 75)"
            : "1px solid transparent",
          transition:
            "background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.125rem",
            fontWeight: 500,
            color: scrolled ? "var(--deep-forest)" : "oklch(96% 0.012 82)",
            letterSpacing: "0.01em",
            lineHeight: 1.2,
            transition: "color 0.3s ease",
            flexShrink: 0,
          }}
        >
          Pain & Wellness<br />
          <span
            style={{
              fontSize: "0.6875rem",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            Solutions
          </span>
        </a>

        <div style={{ flex: 1 }} />

        {/* Desktop links */}
        <div
          className="nav-links"
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                fontWeight: 400,
                letterSpacing: "0.02em",
                color: scrolled
                  ? "var(--earth-soft)"
                  : "oklch(96% 0.012 82 / 0.82)",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = scrolled
                  ? "var(--forest)"
                  : "oklch(96% 0.012 82)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = scrolled
                  ? "var(--earth-soft)"
                  : "oklch(96% 0.012 82 / 0.82)")
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
              fontSize: "0.8125rem",
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: "var(--deep-forest)",
              background: "var(--amber)",
              padding: "0.5625rem 1.25rem",
              borderRadius: 3,
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "var(--amber-hover)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "var(--amber)")
            }
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
                width: 22,
                height: 1.5,
                background: scrolled
                  ? "var(--earth-text)"
                  : "oklch(96% 0.012 82)",
                borderRadius: 1,
                transition: "background 0.3s ease",
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
              color: "var(--deep-forest)",
              background: "var(--amber)",
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
