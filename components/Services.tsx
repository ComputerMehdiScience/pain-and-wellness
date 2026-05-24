"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    name: "Bowen & Myoskeletal Therapy",
    description: "Gentle hands-on work for pain, stiffness, tension, and movement that feels restricted or off.",
    photo: "/photos/Bowenmyoskeletal.png",
    objectPosition: "60% 85%",
    zoom: 1.3,
    slug: "bowen-myoskeletal-therapy",
  },
  {
    name: "Healing with the Herd",
    description: "A quiet outdoor session with horses and tuning fork sound therapy for stress, grief, and reconnection.",
    photo: "/photos/Family-is-Everything-1-819x1024.png",
    objectPosition: "25% center",
    zoom: 1,
    slug: "healing-with-the-herd",
  },
  {
    name: "Scar Tissue Release",
    description: "McLoughlin Method work for scars that feel tight, sensitive, numb, or seem to affect nearby movement.",
    photo: "/photos/scartissueservice.png",
    objectPosition: "65% 85%",
    zoom: 1.2,
    slug: "scar-tissue-release",
  },
  {
    name: "Reiki",
    description: "A calm, gentle session for people carrying stress, anxiety, grief, or a nervous system that will not settle.",
    photo: "/photos/Reiki.png",
    objectPosition: "55% 90%",
    zoom: 1.15,
    slug: "reiki",
  },
  {
    name: "Ionized Foot Detox",
    description: "A warm foot soak offered as a simple add-on for clients who want a slower, restorative appointment.",
    photo: "/photos/ionized footbath.png",
    objectPosition: "25% 75%",
    zoom: 1.2,
    slug: "ionized-foot-detox",
  },
  {
    name: "Equine Bodywork",
    description: "Farm-visit bodywork for horses showing stiffness, uneven movement, soreness, or performance changes.",
    photo: "/photos/kathy-horse-barn.png",
    objectPosition: "30% center",
    zoom: 1.1,
    slug: "equine-bodywork",
  },
  {
    name: "Canine Bowen",
    description: "Gentle Bowen work for dogs dealing with aging, stiffness, recovery, anxiety, or mobility concerns.",
    photo: "/photos/kathy dog.png",
    objectPosition: "center 85%",
    zoom: 1.4,
    slug: "canine-bowen",
  },
];

const GAP_PX = 16;
const N = services.length;

function getVisible(w: number) {
  if (w < 640) return 1;
  if (w < 900) return 2;
  if (w < 1200) return 3;
  return 4;
}

export default function Services({ showHeader = true }: { showHeader?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [position, setPosition] = useState(0); // visual position 0..N + PAD
  const [paused, setPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [visible, setVisible] = useState(3);
  const [transitioning, setTransitioning] = useState(true);

  const PAD = visible;
  // Track: [last PAD services][all services][first PAD services]
  const track = useMemo(() => [
    ...services.slice(N - PAD),
    ...services,
    ...services.slice(0, PAD),
  ], [PAD]);

  const cardWidth = containerWidth > 0 ? (containerWidth - (visible - 1) * GAP_PX) / visible : 0;
  const active = ((position % N) + N) % N;

  // Boundary reset
  useEffect(() => {
    if (position >= N) {
      const t = setTimeout(() => {
        setTransitioning(false);
        setPosition(position - N);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setTransitioning(true));
        });
      }, 600);
      return () => clearTimeout(t);
    }
    if (position < 0) {
      const t = setTimeout(() => {
        setTransitioning(false);
        setPosition(position + N);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setTransitioning(true));
        });
      }, 600);
      return () => clearTimeout(t);
    }
  }, [position]);

  const next = useCallback(() => setPosition(p => p + 1), []);
  const prev = useCallback(() => setPosition(p => p - 1), []);
  const goTo = useCallback((realIdx: number) => {
    setPosition(realIdx);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused || containerWidth === 0) return;
    const id = setInterval(() => {
      setPosition(p => p + 1);
    }, 3800);
    return () => clearInterval(id);
  }, [paused, containerWidth]);

  // Measure
  useEffect(() => {
    const update = () => {
      if (viewportRef.current) {
        setContainerWidth(viewportRef.current.offsetWidth);
      }
      setVisible(getVisible(window.innerWidth));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // In view
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

  // Translate offset accounts for the leading PAD duplicates
  const translateX = -(position + PAD) * (cardWidth + GAP_PX);

  return (
    <section
      id="services"
      ref={ref}
      style={{
        background: "var(--warm-stone)",
        padding: "clamp(3.5rem, 7vw, 6rem) 0",
        overflow: "hidden",
      }}
    >
      {showHeader && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 3rem)" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: "clamp(2.5rem, 4vw, 4rem)", textAlign: "center" }}
          >
            <h2 className="section-heading" style={{ marginBottom: "1.25rem" }}>
              Bowen therapy, three ways.
            </h2>
            <p className="section-subhead">
              Choose the kind of support you need, from clinic appointments to farm visits.
            </p>
          </motion.div>
        </div>
      )}

      {/* Carousel */}
      <div style={{ maxWidth: 1560, margin: "0 auto", padding: "0 clamp(1.5rem, 3vw, 3rem)" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div ref={viewportRef} style={{ overflow: "visible", paddingBottom: "16px" }}>
            <div style={{ overflow: "hidden", paddingTop: "20px", paddingBottom: "8px" }}>
              <div
                style={{
                  display: "flex",
                  gap: `${GAP_PX}px`,
                  transform: `translateX(${translateX}px)`,
                  transition: transitioning
                    ? "transform 0.58s cubic-bezier(0.4, 0, 0.2, 1)"
                    : "none",
                  width: "max-content",
                  alignItems: "center",
                }}
              >
                {track.map((svc, i) => {
                  // Real position relative to "position" state
                  const trackPos = i - PAD;
                  const isFeatured = trackPos === position;
                  return (
                    <div
                      key={i}
                      style={{
                        width: cardWidth > 0 ? `${cardWidth}px` : "0px",
                        flexShrink: 0,
                      }}
                    >
                      <Link href={`/services/${svc.slug}`} style={{ textDecoration: "none", display: "block" }}>
                        <div
                          style={{
                            borderRadius: 16,
                            overflow: "hidden",
                            height: "clamp(440px, 50vw, 540px)",
                            position: "relative",
                            cursor: "pointer",
                            boxShadow: isFeatured
                              ? "0 28px 60px -12px oklch(20% 0.01 240 / 0.35), 0 12px 24px -6px oklch(20% 0.01 240 / 0.2)"
                              : "0 8px 22px -6px oklch(20% 0.01 240 / 0.14)",
                            transform: isFeatured ? "scale(1.06)" : "scale(0.94)",
                            transformOrigin: "center",
                            transition: "transform 0.58s cubic-bezier(0.4,0,0.2,1), box-shadow 0.58s cubic-bezier(0.4,0,0.2,1)",
                            zIndex: isFeatured ? 2 : 1,
                          }}
                        >
                          <Image
                            src={svc.photo}
                            alt={svc.name}
                            fill
                            sizes="(max-width: 640px) 90vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 390px"
                            style={{
                              objectFit: "cover",
                              objectPosition: svc.objectPosition,
                              transform: `scale(${svc.zoom})`,
                              transformOrigin: svc.objectPosition,
                              filter: "contrast(1.05) saturate(1.1)",
                            }}
                          />

                          <div style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, oklch(14% 0.04 200 / 0.96) 0%, oklch(14% 0.04 200 / 0.5) 42%, oklch(14% 0.04 200 / 0.05) 72%, transparent 100%)",
                          }} />

                          {isFeatured && (
                            <div style={{
                              position: "absolute",
                              top: 0, left: 0, right: 0,
                              height: 4,
                              background: "var(--teal-light)",
                            }} />
                          )}

                          {isFeatured && (
                            <div style={{
                              position: "absolute",
                              top: "1.25rem",
                              right: "1.25rem",
                              background: "oklch(18% 0.04 200 / 0.55)",
                              backdropFilter: "blur(10px)",
                              border: "1px solid oklch(96% 0.012 82 / 0.18)",
                              borderRadius: 20,
                              padding: "0.35rem 0.9rem",
                              fontFamily: "var(--font-body)",
                              fontSize: "0.6875rem",
                              fontWeight: 600,
                              letterSpacing: "0.06em",
                              textTransform: "uppercase" as const,
                              color: "oklch(96% 0.012 82 / 0.92)",
                            }}>
                              Learn more →
                            </div>
                          )}

                          <div style={{
                            position: "absolute",
                            bottom: 0, left: 0, right: 0,
                            padding: "1.5rem 1.625rem 1.75rem",
                          }}>
                            <p style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)",
                              fontWeight: 500,
                              color: "oklch(98% 0.008 82)",
                              lineHeight: 1.2,
                              textShadow: "0 1px 6px oklch(8% 0.02 200 / 0.65)",
                            }}>
                              {svc.name}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Nav */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "1.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    height: 4,
                    borderRadius: 2,
                    background: i === active ? "var(--deep-forest)" : "var(--warm-mid)",
                    width: i === active ? 28 : 10,
                    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={prev}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  color: "var(--deep-forest)",
                  background: "transparent",
                  border: "2px solid var(--deep-forest)",
                  padding: "0.625rem 1.5rem",
                  borderRadius: 6,
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { const b = e.currentTarget; b.style.background = "var(--deep-forest)"; b.style.color = "var(--cream)"; }}
                onMouseLeave={e => { const b = e.currentTarget; b.style.background = "transparent"; b.style.color = "var(--deep-forest)"; }}
              >
                ← Prev
              </button>
              <button
                onClick={next}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  color: "var(--cream)",
                  background: "var(--teal)",
                  border: "2px solid var(--teal)",
                  padding: "0.625rem 1.5rem",
                  borderRadius: 6,
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                  boxShadow: "0 4px 12px oklch(20% 0.01 240 / 0.18)",
                  transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
                }}
                onMouseEnter={e => { const b = e.currentTarget; b.style.transform = "translateY(-2px)"; b.style.boxShadow = "0 8px 18px oklch(20% 0.01 240 / 0.25)"; b.style.background = "var(--teal-deep)"; }}
                onMouseLeave={e => { const b = e.currentTarget; b.style.transform = "translateY(0)"; b.style.boxShadow = "0 4px 12px oklch(20% 0.01 240 / 0.18)"; b.style.background = "var(--teal)"; }}
              >
                Next →
              </button>
            </div>
          </div>
        </motion.div>

        {/* Book CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          style={{ textAlign: "center", marginTop: "clamp(1.5rem, 2.5vw, 2rem)" }}
        >
          <a
            href="https://app.setmore.com/painandwellnesssolutions"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--cream)",
              background: "var(--teal)",
              padding: "1rem 2.5rem",
              borderRadius: 8,
              letterSpacing: "0.01em",
              display: "inline-block",
              boxShadow: "0 6px 18px oklch(20% 0.01 240 / 0.2)",
              transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
            }}
            onMouseEnter={e => { const a = e.currentTarget; a.style.transform = "translateY(-3px)"; a.style.boxShadow = "0 10px 26px oklch(20% 0.01 240 / 0.28)"; a.style.background = "var(--teal-deep)"; }}
            onMouseLeave={e => { const a = e.currentTarget; a.style.transform = "translateY(0)"; a.style.boxShadow = "0 6px 18px oklch(20% 0.01 240 / 0.2)"; a.style.background = "var(--teal)"; }}
          >
            Book an appointment
          </a>
        </motion.div>
      </div>
    </section>
  );
}
