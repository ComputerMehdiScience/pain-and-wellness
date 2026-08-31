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
import { getServices } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const services = await getServices();
  return (
    <>
      <Nav />
      <main style={{ isolation: "isolate" }}>
        <StickySection zIndex={1}><Hero /></StickySection>
        <StickySection zIndex={2}><Services services={services} /></StickySection>
        <WhatToExpect />
        <StickySection zIndex={3}><About /></StickySection>
        <StickySection zIndex={4}><Animals /></StickySection>
        <StickySection zIndex={5}><FAQ /></StickySection>
        <StickySection zIndex={6}><CTA /></StickySection>
      </main>
      <Footer />
    </>
  );
}
