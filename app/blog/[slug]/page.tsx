import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { posts, getPost } from "../posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Blog | Pain & Wellness Solutions" };
  return {
    title: `${post.title} | Pain & Wellness Solutions`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.photo],
      type: "article",
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main style={{ background: "var(--warm-cream)", paddingTop: 76 }}>
        {/* Back */}
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "1.5rem clamp(1.5rem, 4vw, 3rem) 0" }}>
          <Link
            href="/blog"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--earth-soft)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
            }}
          >
            ← All posts
          </Link>
        </div>

        {/* Header */}
        <article style={{ maxWidth: 760, margin: "0 auto", padding: "1.5rem clamp(1.5rem, 4vw, 3rem) clamp(3.5rem, 7vw, 5rem)" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--teal)",
              marginBottom: "1rem",
            }}
          >
            {formatDate(post.date)} · {post.readMin} min read
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4.2vw, 3.1rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--deep-forest)",
              marginBottom: "1.75rem",
            }}
          >
            {post.title}
          </h1>

          <div
            className="photo-pop"
            style={{ position: "relative", aspectRatio: "16 / 9", marginBottom: "2.5rem" }}
          >
            <Image
              src={post.photo}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 800px) 92vw, 760px"
              style={{ objectFit: "cover", objectPosition: post.objectPosition ?? "center" }}
            />
          </div>

          {/* Body */}
          <div>
            {post.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={i}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.4rem, 2.4vw, 1.85rem)",
                      fontWeight: 500,
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                      color: "var(--deep-forest)",
                      margin: "2.25rem 0 0.9rem",
                    }}
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={i} style={{ display: "flex", flexDirection: "column", gap: "0.6rem", listStyle: "none", margin: "0.5rem 0 1.25rem" }}>
                    {block.items.map((item) => (
                      <li key={item} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sage)", flexShrink: 0, marginTop: "0.6rem" }} />
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--earth-soft)" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={i}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1.0625rem",
                    fontWeight: 300,
                    lineHeight: 1.85,
                    color: "var(--earth-soft)",
                    marginBottom: "1.25rem",
                  }}
                >
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* Inline book CTA */}
          <div style={{ marginTop: "2.5rem" }}>
            <a
              href="https://painandwellnesssolutions.setmore.com/katherinemorton"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                fontWeight: 700,
                color: "var(--cream)",
                background: "var(--teal)",
                padding: "0.875rem 2rem",
                borderRadius: 8,
                display: "inline-block",
                letterSpacing: "0.01em",
                boxShadow: "0 6px 16px oklch(20% 0.01 240 / 0.2)",
              }}
            >
              Book an appointment
            </a>
          </div>
        </article>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
