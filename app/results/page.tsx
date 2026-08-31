import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import TestimonialsBlock from "@/components/TestimonialsBlock";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getPageContent, getTestimonials } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60;

export default async function ResultsPage() {
  const [content, testimonials] = await Promise.all([
    getPageContent("results"),
    getTestimonials(),
  ]);
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
        <TestimonialsBlock testimonials={testimonials} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
