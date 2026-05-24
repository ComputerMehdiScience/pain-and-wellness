import Image from "next/image";
import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  note?: string;
  reverse?: boolean;
};

export default function PageHeader({
  title,
  children,
  image,
  imageAlt = "",
  imagePosition = "center",
  note,
  reverse = false,
}: PageHeaderProps) {
  return (
    <section
      style={{
        background:
          "linear-gradient(135deg, var(--cream) 0%, var(--cream) 54%, var(--teal-wash) 100%)",
        padding: "clamp(7rem, 11vw, 9rem) clamp(1.5rem, 4vw, 3rem) clamp(3rem, 6vw, 5rem)",
        overflow: "hidden",
      }}
    >
      <div
        className="page-hero"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: image ? "minmax(0, 1.02fr) minmax(320px, 0.78fr)" : "minmax(0, 860px)",
          gap: "clamp(2rem, 5vw, 5rem)",
          alignItems: "center",
        }}
      >
        <div
          style={{
            order: reverse ? 2 : 1,
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.35rem, 6.7vw, 6.35rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 0.98,
              color: "var(--deep-forest)",
              marginBottom: "1.35rem",
              maxWidth: 760,
            }}
          >
            {title}
          </h1>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.05rem, 1.35vw, 1.18rem)",
              lineHeight: 1.75,
              color: "var(--ink-soft)",
              maxWidth: 640,
            }}
          >
            {children}
          </div>
          {note && (
            <p
              style={{
                marginTop: "1.75rem",
                borderTop: "1px solid var(--cream-edge)",
                paddingTop: "1rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "var(--teal-deep)",
              }}
            >
              {note}
            </p>
          )}
        </div>

        {image && (
          <div
            style={{
              order: reverse ? 1 : 2,
              position: "relative",
              minHeight: 360,
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "9% -8% -9% 12%",
                border: "1px solid var(--teal-light)",
                borderRadius: 18,
              }}
            />
            <div
              className="photo-pop"
              style={{
                position: "relative",
                aspectRatio: "4 / 5",
                borderRadius: 16,
              }}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 860px) 90vw, 430px"
                style={{ objectFit: "cover", objectPosition: imagePosition }}
              />
            </div>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 860px) {
          .page-hero { grid-template-columns: 1fr !important; }
          .page-hero > div { order: initial !important; }
        }
      `}</style>
    </section>
  );
}
