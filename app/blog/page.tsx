import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getPosts, getPageContent } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { stegaClean } from "next-sanity";

export const metadata = {
  title: "Blog | Pain & Wellness Solutions · Bowen Therapy in Stirling, Ontario",
  description:
    "Gentle, practical guidance on Bowen therapy, equine bodywork, and drug-free pain relief for people and animals in Stirling and Hastings County, Ontario.",
};

export const revalidate = 60;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const [sortedPosts, content] = await Promise.all([getPosts(), getPageContent("blog")]);
  const { header } = content;
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          eyebrow={header.eyebrow}
          title={header.title}
          image={header.image ? urlForImage(header.image).width(860).height(1075).fit("crop").url() : undefined}
          imageAlt={header.title}
          note={header.note}
        >
          {header.body}
        </PageHeader>

        <section
          style={{
            background: "var(--warm-stone)",
            padding: "clamp(3.5rem, 7vw, 6rem) 0",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 clamp(1.5rem, 4vw, 3rem)",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.75rem",
            }}
            className="blog-grid"
          >
            {sortedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${stegaClean(post.slug)}`}
                className="blog-card"
                style={{
                  background: "var(--cream)",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid var(--cream-edge)",
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  boxShadow: "0 8px 22px -10px oklch(20% 0.01 240 / 0.18)",
                  transition: "transform 0.25s, box-shadow 0.25s",
                }}
              >
                <div style={{ position: "relative", aspectRatio: "16 / 10" }}>
                  <Image
                    src={urlForImage(post.photo).width(760).height(475).fit("crop").url()}
                    alt={post.title}
                    fill
                    sizes="(max-width: 760px) 90vw, 380px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  style={{
                    padding: "1.5rem 1.5rem 1.75rem",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--teal)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {formatDate(post.date)} · {post.readMin} min read
                  </p>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.25rem, 1.6vw, 1.45rem)",
                      fontWeight: 500,
                      lineHeight: 1.22,
                      color: "var(--deep-forest)",
                      marginBottom: "0.75rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.65,
                      color: "var(--ink-soft)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <span
                    style={{
                      marginTop: "auto",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      color: "var(--teal-accent)",
                    }}
                  >
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />

      <style>{`
        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 34px -12px oklch(20% 0.01 240 / 0.26);
        }
        @media (max-width: 920px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
