import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import TestimonialsBlock from "@/components/TestimonialsBlock";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const testimonials = [
  {
    id: 1,
    name: "Tiff",
    role: "Pain & Wellness client",
    company: "",
    content:
      "After years of chiropractor, osteopath and massage, I have finally found that Bowen Therapy works best for my body. I no longer do any other therapy.",
    rating: 5,
    avatar: "",
  },
  {
    id: 2,
    name: "Lyle",
    role: "Pain & Wellness client",
    company: "",
    content:
      "Totally satisfied with results from Kathy. My neck had been bothering me for months. After the session the pain went from a 10 to a 3.",
    rating: 5,
    avatar: "",
  },
  {
    id: 3,
    name: "Linda Robinson",
    role: "Pain & Wellness client",
    company: "",
    content:
      "I was able to go to Campbellford shopping by myself for the first time in about 2 years. THANKS Kathy.",
    rating: 5,
    avatar: "",
  },
];

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
        <TestimonialsBlock />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
