import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import ServicesDirectory from "@/components/ServicesDirectory";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getServices, getPricingRows, getFaqItems, getPageContent } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60;

export default async function ServicesPage() {
  const [services, pricing, faqs, content] = await Promise.all([
    getServices(),
    getPricingRows(),
    getFaqItems(),
    getPageContent("services"),
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
        <ServicesDirectory services={services} />
        <Pricing rows={pricing} />
        <FAQ faqs={faqs} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
