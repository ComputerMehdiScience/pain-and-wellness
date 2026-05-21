"use client";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--cream-warm)",
        color: "var(--ink)",
        padding: "clamp(3.5rem, 6vw, 5rem) 0 1.5rem",
        borderTop: "1px solid var(--cream-edge)",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(2rem, 7vw, 8rem)",
        }}
      >
        {/* Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.8fr 1fr 1fr 1.1fr",
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
                fontSize: "1.5rem",
                fontWeight: 500,
                letterSpacing: "-0.015em",
                color: "var(--teal-deep)",
                marginBottom: "0.75rem",
                lineHeight: 1.1,
              }}
            >
              Pain & Wellness Solutions
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                fontWeight: 400,
                lineHeight: 1.75,
                color: "var(--ink-soft)",
                marginBottom: "1.75rem",
                maxWidth: "36ch",
              }}
            >
              Certified Bowen and myoskeletal therapy for people, horses, and dogs. Serving Hastings County from Stirling, Ontario since 2017.
            </p>

            <div style={{ display: "flex", gap: "0.5rem" }}>
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
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--teal-deep)",
                    background: "transparent",
                    border: "1.5px solid var(--cream-edge)",
                    padding: "0.45rem 0.875rem",
                    borderRadius: 999,
                    transition: "background 0.2s, border-color 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const a = e.currentTarget as HTMLElement;
                    a.style.background = "var(--teal-deep)";
                    a.style.borderColor = "var(--teal-deep)";
                    a.style.color = "var(--cream)";
                    a.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const a = e.currentTarget as HTMLElement;
                    a.style.background = "transparent";
                    a.style.borderColor = "var(--cream-edge)";
                    a.style.color = "var(--teal-deep)";
                    a.style.transform = "translateY(0)";
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
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--teal)",
                marginBottom: "1.25rem",
              }}
            >
              Services
            </p>
            {[
              { label: "Bowen & myoskeletal", href: "/services/bowen-myoskeletal-therapy" },
              { label: "Healing with the Herd", href: "/services/healing-with-the-herd" },
              { label: "Scar Tissue Release", href: "/services/scar-tissue-release" },
              { label: "Reiki", href: "/services/reiki" },
              { label: "Ionized Foot Detox", href: "/services/ionized-foot-detox" },
              { label: "Equine Bodywork", href: "/services/equine-bodywork" },
              { label: "Canine Bowen", href: "/services/canine-bowen" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                style={{
                  display: "block",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  fontWeight: 400,
                  color: "var(--ink-soft)",
                  marginBottom: "0.625rem",
                  lineHeight: 1.4,
                  transition: "color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => { const a = e.currentTarget as HTMLElement; a.style.color = "var(--teal-deep)"; a.style.transform = "translateX(3px)"; }}
                onMouseLeave={(e) => { const a = e.currentTarget as HTMLElement; a.style.color = "var(--ink-soft)"; a.style.transform = "translateX(0)"; }}
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Explore */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--teal)",
                marginBottom: "1.25rem",
              }}
            >
              Explore
            </p>
            {[
              { label: "About Kathy", href: "/#about" },
              { label: "Results & reviews", href: "/#results" },
              { label: "FAQ", href: "/#faq" },
              { label: "Privacy policy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  display: "block",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  fontWeight: 400,
                  color: "var(--ink-soft)",
                  marginBottom: "0.625rem",
                  transition: "color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => { const a = e.currentTarget as HTMLElement; a.style.color = "var(--teal-deep)"; a.style.transform = "translateX(3px)"; }}
                onMouseLeave={(e) => { const a = e.currentTarget as HTMLElement; a.style.color = "var(--ink-soft)"; a.style.transform = "translateX(0)"; }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Visit */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--teal)",
                marginBottom: "1.25rem",
              }}
            >
              Visit
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <a
                href="https://maps.google.com/?q=89+Salem+Road+Stirling+ON"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  fontWeight: 400,
                  color: "var(--ink)",
                  lineHeight: 1.55,
                  textDecoration: "none",
                }}
              >
                89 Salem Road<br />Stirling, ON
              </a>
              <a
                href="tel:6138851311"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  color: "var(--teal-deep)",
                  letterSpacing: "-0.005em",
                  width: "fit-content",
                  borderBottom: "1.5px solid var(--cream-edge)",
                  paddingBottom: "2px",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--teal-deep)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--cream-edge)"; }}
              >
                613-885-1311
              </a>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 400, color: "var(--ink-faint)" }}>
                Mon–Fri · 9am–5pm
              </p>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "oklch(78% 0.03 195 / 0.25)",
                border: "1px solid oklch(53% 0.055 195 / 0.3)",
                padding: "0.4rem 0.75rem",
                borderRadius: 999,
                width: "fit-content",
                marginTop: "0.25rem",
              }}>
                <span style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--teal)",
                  boxShadow: "0 0 8px var(--teal)",
                }} />
                <span style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: "var(--teal-deep)",
                }}>
                  New patients welcome
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            borderTop: "1px solid var(--cream-edge)",
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
              fontWeight: 400,
              color: "var(--ink-faint)",
            }}
          >
            © 2025 Pain & Wellness Solutions · Stirling, Ontario
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { label: "Privacy policy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                  color: "var(--ink-faint)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--teal-deep)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ink-faint)"; }}
              >
                {l.label}
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
