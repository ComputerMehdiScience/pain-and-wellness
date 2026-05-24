import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import WhatToExpect from "@/components/WhatToExpect";
import { SplitPanel } from "@/components/JourneySections";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function PersonalPainManagementPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          eyebrow="Personal Pain Management"
          title="Relief that does not force the body."
          image="/photos/Bowenmyoskeletal.png"
          imageAlt="Gentle hands-on therapy in a calm treatment room"
          imagePosition="center"
          note="Bowen, myoskeletal therapy, scar tissue release, Reiki, and foot detox"
        >
          Bowen and myoskeletal therapy for people dealing with chronic pain,
          headaches, sciatica, jaw tension, scar tissue, stress, or movement
          that no longer feels right.
        </PageHeader>
        <SplitPanel
          eyebrow="What it feels like"
          title="Quiet work, clear intention."
          image="/photos/placeholders/therapy-room-hands.png"
          imageAlt="Gentle hands-on therapy in a calm treatment room"
        >
          <p>
            A session is not deep-tissue massage and it is not chiropractic
            adjustment. Kathy uses small, precise moves with pauses between
            them, giving the nervous system time to respond.
          </p>
          <p style={{ marginTop: "1rem" }}>
            Most people stay clothed, wear something comfortable, and leave
            feeling calmer or looser. The goal is not to overpower the body. It
            is to help it stop bracing.
          </p>
        </SplitPanel>
        <WhatToExpect />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
