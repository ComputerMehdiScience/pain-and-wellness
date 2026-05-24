import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          eyebrow="Services"
          title="Choose the care that fits the moment."
          image="/photos/placeholders/herd-pasture.png"
          imageAlt="Horses in a quiet rural pasture"
          imagePosition="center"
          note="Clinic appointments, farm visits, and animal sessions"
        >
          Clinic appointments, farm visits, and gentle hands-on care for the
          different reasons people come to Pain & Wellness Solutions.
        </PageHeader>
        <Services showHeader={false} />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
