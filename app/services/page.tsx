import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import ServicesDirectory from "@/components/ServicesDirectory";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getServices } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await getServices();
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
        <ServicesDirectory services={services} />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
