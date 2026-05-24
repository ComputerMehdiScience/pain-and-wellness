import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import Results from "@/components/Results";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function ResultsPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          eyebrow="Results"
          title="Real changes clients can feel."
          image="/photos/placeholders/therapy-room-hands.png"
          imageAlt="Gentle hands-on therapy session"
          imagePosition="center"
          note="Reviews often mention pain relief, mobility, and feeling heard"
        >
          Reviews from people who have booked with Kathy for pain, mobility,
          relaxation, recovery, and support for their animals.
        </PageHeader>
        <Results />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
