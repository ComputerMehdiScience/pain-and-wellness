export default function Footer() {
  return (
    <footer
      style={{
        background: "oklch(18% 0.045 158)",
        borderTop: "1px solid oklch(35% 0.075 155 / 0.2)",
        padding: "clamp(3rem, 6vw, 5rem) 0 2rem",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 4vw, 3rem)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "clamp(2rem, 4vw, 4rem)",
            marginBottom: "3rem",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.125rem",
                fontWeight: 500,
                color: "oklch(96% 0.012 82)",
                marginBottom: "0.5rem",
              }}
            >
              Pain & Wellness Solutions
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                fontWeight: 300,
                lineHeight: 1.7,
                color: "oklch(96% 0.012 82 / 0.45)",
                marginBottom: "1.5rem",
                maxWidth: "36ch",
              }}
            >
              Certified Bowen and myoskeletal therapy for people, horses, and dogs.
              Serving Hastings County from Stirling, Ontario since 2017.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { label: "Instagram", href: "https://instagram.com/painandwellnesssolutions" },
                { label: "Facebook", href: "https://facebook.com/painandwellnesssolutions" },
                { label: "YouTube", href: "https://youtube.com/@painandwellnesssolutions5355" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "oklch(96% 0.012 82 / 0.4)",
                    border: "1px solid oklch(96% 0.012 82 / 0.12)",
                    padding: "0.3rem 0.625rem",
                    borderRadius: 2,
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "oklch(72% 0.065 150)",
                marginBottom: "1rem",
              }}
            >
              Services
            </p>
            {[
              "Bowen & myoskeletal therapy",
              "Healing with the herd",
              "Equine bodywork",
              "Scar tissue release",
              "Reiki",
              "Canine Bowen",
            ].map((s) => (
              <p
                key={s}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8125rem",
                  fontWeight: 300,
                  color: "oklch(96% 0.012 82 / 0.45)",
                  marginBottom: "0.5rem",
                  lineHeight: 1.4,
                }}
              >
                {s}
              </p>
            ))}
          </div>

          {/* Quick links */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "oklch(72% 0.065 150)",
                marginBottom: "1rem",
              }}
            >
              Quick links
            </p>
            {[
              { label: "About Kathy", href: "#about" },
              { label: "Results & testimonials", href: "#results" },
              { label: "FAQ", href: "#faq" },
              { label: "Privacy policy", href: "/privacy" },
              { label: "Terms & conditions", href: "/terms" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  display: "block",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8125rem",
                  fontWeight: 300,
                  color: "oklch(96% 0.012 82 / 0.45)",
                  marginBottom: "0.5rem",
                  transition: "color 0.2s",
                }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "oklch(72% 0.065 150)",
                marginBottom: "1rem",
              }}
            >
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 300, color: "oklch(96% 0.012 82 / 0.55)", lineHeight: 1.5 }}>
                89 Salem Road<br />Stirling, ON
              </p>
              <a href="tel:6138851311" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 400, color: "oklch(96% 0.012 82 / 0.55)" }}>
                613-885-1311
              </a>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 300, color: "oklch(96% 0.012 82 / 0.45)" }}>
                Mon-Fri 9am-5pm
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 500, color: "oklch(72% 0.065 150)" }}>
                New patients welcome
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid oklch(96% 0.012 82 / 0.08)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: 300,
              color: "oklch(96% 0.012 82 / 0.3)",
            }}
          >
            © 2025 Pain & Wellness Solutions · Stirling, Ontario
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy policy", "Terms"].map((l) => (
              <a
                key={l}
                href={`/${l.toLowerCase().replace(" ", "-")}`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: 300,
                  color: "oklch(96% 0.012 82 / 0.3)",
                }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
