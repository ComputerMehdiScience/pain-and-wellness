"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type PathCard = {
  title: string;
  body: string;
  href: string;
  cta: string;
  image: string;
};

type InfoCard = {
  title: string;
  body: string;
};

const reveal = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const ease = [0.16, 1, 0.3, 1] as const;

export function CustomerPaths({ cards }: { cards: PathCard[] }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
      style={{
        background: "var(--warm-stone)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 3rem)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <motion.div
          variants={reveal}
          transition={{ duration: 0.8, ease }}
          style={{ maxWidth: 680, marginBottom: "clamp(2rem, 4vw, 3rem)" }}
        >
          <h2 className="section-heading" style={{ fontSize: "clamp(2.5rem, 5vw, 4.25rem)" }}>
            Where do you want to start?
          </h2>
        </motion.div>

        <div className="path-list" style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--cream-edge)" }}>
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              variants={reveal}
              transition={{ duration: 0.85, ease, delay: index * 0.12 }}
            >
              <Link
                href={card.href}
                className="path-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(180px, 260px) minmax(0, 1fr) auto",
                  gap: "clamp(1.25rem, 4vw, 3rem)",
                  alignItems: "center",
                  padding: "1.35rem 0",
                  borderBottom: "1px solid var(--cream-edge)",
                }}
              >
                <div
                  className="path-thumb"
                  style={{
                    position: "relative",
                    aspectRatio: "16 / 10",
                    background: "var(--cream-edge)",
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  <Image src={card.image} alt="" fill sizes="(max-width: 900px) 90vw, 260px" style={{ objectFit: "cover" }} />
                </div>
                <div style={{ maxWidth: 660 }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.8rem, 3vw, 2.65rem)",
                      lineHeight: 1.08,
                      color: "var(--deep-forest)",
                      marginBottom: "0.75rem",
                      transition: "color 0.35s ease",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-soft)", lineHeight: 1.65, maxWidth: "58ch" }}>
                    {card.body}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    fontWeight: 800,
                    color: "var(--teal-deep)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {card.cta}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .path-row .path-thumb img {
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .path-row:hover .path-thumb img {
          transform: scale(1.045);
          filter: saturate(1.08) contrast(1.04);
        }

        .path-row:hover h3 {
          color: var(--teal);
        }

        @media (max-width: 900px) {
          .path-row {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </motion.section>
  );
}

export function SplitPanel({
  title,
  image,
  imageAlt,
  reverse = false,
  children,
}: {
  eyebrow?: string;
  title: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-14% 0px" }}
      style={{ background: "var(--cream)", padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 3rem)" }}
    >
      <div
        className="split-panel"
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: reverse ? "1fr 1.05fr" : "1.05fr 1fr",
          gap: "clamp(2rem, 5vw, 5rem)",
          alignItems: "center",
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 34, scale: 0.98, filter: "blur(12px)" },
            show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.95, ease }}
          style={{ order: reverse ? 2 : 1 }}
        >
          <div className="photo-pop" style={{ position: "relative", aspectRatio: "4 / 3" }}>
            <Image src={image} alt={imageAlt} fill sizes="(max-width: 800px) 90vw, 560px" style={{ objectFit: "cover" }} />
          </div>
        </motion.div>
        <motion.div
          variants={reveal}
          transition={{ duration: 0.85, ease, delay: 0.1 }}
          style={{ order: reverse ? 1 : 2 }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.1rem, 4vw, 3.4rem)",
              lineHeight: 1.05,
              color: "var(--deep-forest)",
              marginBottom: "1.25rem",
            }}
          >
            {title}
          </h2>
          <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-soft)", lineHeight: 1.75, fontSize: "1rem" }}>
            {children}
          </div>
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .split-panel { grid-template-columns: 1fr !important; }
          .split-panel > div { order: initial !important; }
        }
      `}</style>
    </motion.section>
  );
}

export function InfoCards({
  title,
  cards,
}: {
  eyebrow?: string;
  title: string;
  cards: InfoCard[];
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
      style={{ background: "var(--warm-stone)", padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 3rem)" }}
    >
      <div
        className="signal-layout"
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
          gap: "clamp(2rem, 6vw, 5rem)",
          alignItems: "start",
        }}
      >
        <motion.div variants={reveal} transition={{ duration: 0.8, ease }} className="signal-heading">
          <h2 className="section-heading" style={{ fontSize: "clamp(2.35rem, 4.8vw, 4rem)" }}>
            {title}
          </h2>
        </motion.div>

        <div className="reveal-stack" style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              variants={reveal}
              transition={{ duration: 0.85, ease, delay: 0.1 + index * 0.11 }}
              className="reveal-row"
              style={{
                position: "relative",
                padding: "1.6rem 0 1.6rem 1.5rem",
                borderTop: "1px solid var(--cream-edge)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.45rem, 2.2vw, 2rem)",
                  color: "var(--deep-forest)",
                  marginBottom: "0.55rem",
                  lineHeight: 1.13,
                }}
              >
                {card.title}
              </h3>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-soft)", lineHeight: 1.68, maxWidth: "62ch" }}>
                {card.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
      <style>{`
        .signal-heading {
          position: sticky;
          top: 110px;
        }

        .reveal-row::before {
          content: "";
          position: absolute;
          left: 0;
          top: 1.8rem;
          bottom: 1.8rem;
          width: 3px;
          border-radius: 999px;
          background: var(--teal-light);
          opacity: 0.75;
        }

        .reveal-row:last-child {
          border-bottom: 1px solid var(--cream-edge);
        }

        @media (max-width: 860px) {
          .signal-layout { grid-template-columns: 1fr !important; }
          .signal-heading { position: static; }
        }
      `}</style>
    </motion.section>
  );
}
