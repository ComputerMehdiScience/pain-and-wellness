import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
  },
  async redirects() {
    return [
      // ----- Old WordPress pages -----
      { source: "/services-2", destination: "/services", permanent: true },
      { source: "/animal-body-work", destination: "/equine-body-work", permanent: true },
      { source: "/customer-cabinet", destination: "/", permanent: true },
      { source: "/appointment", destination: "/contact", permanent: true },

      // ----- Old WordPress blog posts (root-level slugs) -----
      // Two map to the matching new posts; the rest go to the blog index.
      { source: "/what-is-bowen-therapy-a-natural-solution-for-pain-relief", destination: "/blog/what-is-bowen-therapy", permanent: true },
      { source: "/bowen-therapy-for-dogs-a-gentle-effective-treatment-for-canine-wellness", destination: "/blog/bowen-therapy-for-dogs", permanent: true },
      { source: "/healing-with-the-herd-releasing-tension", destination: "/services/healing-with-the-herd", permanent: true },
      { source: "/myoskeletal-alignment-for-horses-restoring-structural-balance", destination: "/blog", permanent: true },
      { source: "/myofascial-lines-in-horses-treating-the-body-as-a-whole", destination: "/blog", permanent: true },
      { source: "/tensegrity-in-horses-the-hidden-science-behind-balance-and-movement", destination: "/blog", permanent: true },
      { source: "/for-young-adults-stay-balanced-and-energized-with-bowen-therapy", destination: "/blog", permanent: true },
      { source: "/for-hockey-players-protect-your-body-and-boost-your-game", destination: "/blog", permanent: true },
      { source: "/reiki-healing-what-it-is-and-how-it-complements-bowen-therapy", destination: "/blog", permanent: true },
      { source: "/holistic-pain-management-why-more-people-in-north-america-are-turning-to-alternative-therapies", destination: "/blog", permanent: true },
      { source: "/bowen-therapy-for-horses-a-game-changer-for-equine-health", destination: "/blog", permanent: true },
      { source: "/how-to-prevent-common-household-injuries-for-seniors-middle-aged-adults", destination: "/blog", permanent: true },
      { source: "/managing-chronic-pain-without-medication-a-natural-approach", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
