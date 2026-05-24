import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Animals from "@/components/Animals";
import WhatToExpect from "@/components/WhatToExpect";
import Results from "@/components/Results";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import StickySection from "@/components/StickySection";

export default function Home() {
  return (
    <>
      <Nav />
      <main style={{ isolation: "isolate" }}>
        <StickySection zIndex={1}><Hero /></StickySection>
        <StickySection zIndex={2}><About /></StickySection>
        <StickySection zIndex={3}><Services /></StickySection>
        <StickySection zIndex={4}><Animals /></StickySection>
        <WhatToExpect />
        <Results />
        <StickySection zIndex={7}><FAQ /></StickySection>
        <StickySection zIndex={8}><CTA /></StickySection>
      </main>
      <Footer />
    </>
  );
}
