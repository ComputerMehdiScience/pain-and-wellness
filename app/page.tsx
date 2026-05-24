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
import { CustomerPaths } from "@/components/JourneySections";

export default function Home() {
  return (
    <>
      <Nav />
      <main style={{ isolation: "isolate" }}>
        <StickySection zIndex={1}><Hero /></StickySection>
        <CustomerPaths
          cards={[
            {
              title: "I need help with pain or stiffness.",
              body: "Start here if you are dealing with back pain, headaches, scar tissue, stress, or movement that feels limited.",
              href: "/personal-pain-management",
              cta: "Personal pain management",
              image: "/photos/placeholders/therapy-room-hands.png",
            },
            {
              title: "My horse is not moving right.",
              body: "For horse owners noticing soreness, uneven movement, short-striding, aging changes, or recovery needs.",
              href: "/equine-body-work",
              cta: "Equine body work",
              image: "/photos/placeholders/equine-bodywork-barn.png",
            },
            {
              title: "I want to compare the services.",
              body: "See all available therapies in one place and choose the appointment or phone call that makes the most sense.",
              href: "/services",
              cta: "View all services",
              image: "/photos/placeholders/herd-pasture.png",
            },
          ]}
        />
        <StickySection zIndex={2}><About /></StickySection>
        <StickySection zIndex={3}><Services /></StickySection>
        <StickySection zIndex={4}><Animals /></StickySection>
        <WhatToExpect />
        <StickySection zIndex={7}><FAQ /></StickySection>
        <StickySection zIndex={8}><CTA /></StickySection>
      </main>
      <Footer />
    </>
  );
}
