import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Animals from "@/components/Animals";
import WhatToExpect from "@/components/WhatToExpect";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import StickySection from "@/components/StickySection";
import { getServices, getHomepage, getFaqItems } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const [services, homepage, faqs] = await Promise.all([
    getServices(),
    getHomepage(),
    getFaqItems(),
  ]);
  return (
    <>
      <Nav />
      <main style={{ isolation: "isolate" }}>
        <StickySection zIndex={1}>
          <Hero
            headline={homepage.heroHeadline as [string, string, string]}
            subheading={homepage.heroSubheading}
            photo={homepage.heroPhoto}
            cards={homepage.heroCards}
          />
        </StickySection>
        <StickySection zIndex={2}><Services services={services} /></StickySection>
        <WhatToExpect blocks={homepage.whatToExpectBlocks} />
        <StickySection zIndex={3}>
          <About
            heading={homepage.aboutHeading}
            paragraph={homepage.aboutParagraph}
            quote={homepage.aboutQuote}
            photo={homepage.aboutPhoto}
          />
        </StickySection>
        <StickySection zIndex={4}>
          <Animals
            heading={homepage.herdHeading}
            paragraph={homepage.herdParagraph}
            photo={homepage.herdPhoto}
            details={homepage.herdDetails}
          />
        </StickySection>
        <StickySection zIndex={5}><FAQ faqs={faqs} /></StickySection>
        <StickySection zIndex={6}><CTA /></StickySection>
      </main>
      <Footer />
    </>
  );
}
