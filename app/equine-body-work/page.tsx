import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import { SplitPanel } from "@/components/JourneySections";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function EquineBodyWorkPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          eyebrow="Equine Body Work"
          title="Bodywork for the horse you know best."
          image="/photos/kathy-horse.jpg"
          imageAlt="Kathy with a horse"
          imagePosition="center"
          note="Farm visits arranged directly with Kathy"
        >
          Gentle, observant care for horses showing stiffness, soreness,
          uneven movement, reluctance, or changes in performance.
        </PageHeader>
        <SplitPanel
          eyebrow="For horse owners"
          title="When something looks off, even if you cannot name it yet."
          image="/photos/placeholders/equine-bodywork-barn.png"
          imageAlt="Gentle equine bodywork in a rural barn"
        >
          <p>
            Horse owners often notice small changes first: a shorter stride,
            reluctance to bend, unevenness, tension under saddle, or behaviour
            that does not feel like their horse.
          </p>
          <p style={{ marginTop: "1rem" }}>
            Kathy works on the farm so your horse can stay in a familiar place.
            Her job is to read the body, move slowly, and help release patterns
            that may be affecting comfort and performance.
          </p>
        </SplitPanel>
        <CTA
          title="Talk with Kathy about your horse."
          body="Farm visits are arranged directly so Kathy can understand your horse, your location, and what you have been noticing."
        />
      </main>
      <Footer />
    </>
  );
}
