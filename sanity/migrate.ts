import fs from "fs";
import path from "path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2024-01-01" });

const PHOTOS_DIR = path.join(__dirname, "..", "public", "photos");

async function uploadPhoto(filename: string) {
  const filePath = path.join(PHOTOS_DIR, filename);
  const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
    filename,
  });
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: asset._id },
  };
}

type ServiceInput = {
  name: string;
  slug: string;
  order: number;
  photoFile: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  details: string[];
  price?: string;
  bookingMethod: "online" | "call";
};

const services: ServiceInput[] = [
  {
    name: "Bowen & Myoskeletal Therapy",
    slug: "bowen-myoskeletal-therapy",
    order: 1,
    photoFile: "Bowenmyoskeletal.png",
    tagline: "Gets to the root of it, not just where it hurts.",
    shortDescription: "Gentle hands-on work for pain, stiffness, tension, and movement that feels restricted or off.",
    fullDescription: "Bowen therapy uses small, precise moves on your muscles and connective tissue, with rests in between that give your body time to respond. No cracking. No heavy pressure. No pain. Most people are surprised by how much better they feel, even after the first session.",
    details: [
      "Addresses chronic back pain, sciatica, migraines, jaw tension, and sports injuries",
      "First sessions are 60–75 minutes",
      "Wear comfortable, loose clothing",
      "No referral needed",
    ],
    price: "$110 per session · $100 per session on the 6-month bundle",
    bookingMethod: "online",
  },
  {
    name: "Healing with the Herd",
    slug: "healing-with-the-herd",
    order: 2,
    photoFile: "healing-with-the-herd-services.png",
    tagline: "One of the only things like it in Ontario.",
    shortDescription: "Time with Kathy's horses and tuning forks on the farm. Good for people carrying stress, grief, or just needing a break.",
    fullDescription: "Time with Kathy's horses and tuning fork sound therapy on the farm. Horses pick up on how you are feeling and respond to it. There is nothing quite like it for people who are burned out, grieving, or just running on empty.",
    details: [
      "Private sessions held at Kathy's farm near Stirling",
      "Ideal for burnout, anxiety, grief, and chronic stress",
      "Combines equine-assisted work with sound therapy",
      "Seasonal availability. Call to discuss booking.",
      "No horse experience required",
    ],
    bookingMethod: "call",
  },
  {
    name: "Scar Tissue Release",
    slug: "scar-tissue-release",
    order: 3,
    photoFile: "scartissueservice.png",
    tagline: "McLoughlin Scar Tissue Release Method.",
    shortDescription: "McLoughlin Method work for scars that feel tight, sensitive, numb, or seem to affect nearby movement.",
    fullDescription: "Old scars can quietly cause problems far from where they are. This gentle technique works on the scar tissue itself, not just the surface. It reduces tenderness, helps the tissue move freely again, and often brings back movement people had written off years ago.",
    details: [
      "Effective on surgical, traumatic, and burn scars",
      "Works on scars of any age, even decades old",
      "Painless and non-invasive",
      "Often produces immediate change in tissue feel and mobility",
      "Can be combined with Bowen therapy in the same session",
    ],
    bookingMethod: "online",
  },
  {
    name: "Reiki",
    slug: "reiki",
    order: 4,
    photoFile: "Reiki.png",
    tagline: "Quiet. Gentle. Does more than it looks like.",
    shortDescription: "A hands-off session for people dealing with stress, anxiety, grief, or trouble sleeping.",
    fullDescription: "Reiki is a hands-off or very light touch practice that a lot of people have not tried before. Good for stress, anxiety, trouble sleeping, and recovery from hard times. Fully clothed, no pressure, nothing uncomfortable. Most people walk out feeling noticeably calmer.",
    details: [
      "Ideal for stress, anxiety, trauma recovery, and burnout",
      "Fully clothed, gentle touch or no-touch technique",
      "Sessions typically 45–60 minutes",
      "Can be combined with other therapies",
      "Safe for all ages including children and seniors",
    ],
    bookingMethod: "online",
  },
  {
    name: "Ionized Foot Detox",
    slug: "ionized-foot-detox",
    order: 5,
    photoFile: "ionized footbath.png",
    tagline: "A warm soak that does a little more than relax your feet.",
    shortDescription: "A warm foot soak offered as a simple add-on for clients who want a slower, restorative appointment.",
    fullDescription: "A warm foot bath with ionized water. Comfortable, simple, and a good add-on to any session. The water changes colour as it works. A lot of people just book it because it feels good.",
    details: [
      "30-minute session",
      "Warm, comfortable foot bath",
      "Often combined with other treatments",
      "Supports detoxification and energy flow",
      "Visible results in the water. Your session is unique to you.",
    ],
    bookingMethod: "online",
  },
  {
    name: "Equine Bodywork",
    slug: "equine-bodywork",
    order: 6,
    photoFile: "kathy-working-on-reya.png",
    tagline: "Your horse deserves the same care you do.",
    shortDescription: "Farm-visit bodywork for horses showing stiffness, uneven movement, soreness, or performance changes.",
    fullDescription: "Kathy has been around horses her whole life. She addresses stiffness, uneven movement, reluctance under saddle, and behaviour changes that showed up after an injury. Horses settle quickly with her. She comes to you.",
    details: [
      "Farm visits across Hastings County. No trailering required.",
      "Addresses reluctance, stiffness, head-shying, and gait irregularities",
      "Post-surgical recovery and rehabilitation",
      "Call to arrange a farm visit",
      "Kathy has been working with horses since childhood",
    ],
    price: "$140 per visit, plus travel may apply",
    bookingMethod: "call",
  },
  {
    name: "Canine Bowen",
    slug: "canine-bowen",
    order: 7,
    photoFile: "kathy dog.png",
    tagline: "The same gentle approach, adapted for dogs.",
    shortDescription: "Gentle Bowen work for dogs dealing with aging, stiffness, recovery, anxiety, or mobility concerns.",
    fullDescription: "The same gentle moves Kathy uses on people, adapted for dogs. Small, precise touches with rest in between. Dogs often show a real change after just one session.",
    details: [
      "In-clinic or home visits available",
      "Addresses hip dysplasia, joint issues, and mobility",
      "Post-surgical recovery and rehabilitation",
      "Helps with anxiety and nervous system dysregulation",
      "Safe for dogs of all ages and sizes",
    ],
    price: "$80 per visit, plus travel may apply",
    bookingMethod: "online",
  },
];

type Block = { type: "p"; text: string } | { type: "h2"; text: string } | { type: "list"; items: string[] };

type PostInput = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMin: number;
  photoFile: string;
  excerpt: string;
  body: Block[];
};

const posts: PostInput[] = [
  {
    slug: "what-is-bowen-therapy",
    title: "What Is Bowen Therapy? A Gentle Approach to Lasting Relief",
    description: "Bowen therapy is a gentle, hands-on treatment for pain and stiffness. Learn how it works and who it helps, from a certified Bowen therapist in Stirling, Ontario.",
    date: "2026-05-02",
    readMin: 4,
    photoFile: "blog-bowen-therapy.png",
    excerpt: "A simple look at what Bowen therapy is, how the gentle moves work, and the kinds of pain it can help with.",
    body: [
      { type: "p", text: "Bowen therapy is a gentle, hands-on treatment that works with the body instead of forcing it. There is no cracking, no hard pressure, and no pain. For a lot of people it is the first thing that has actually helped after years of trying everything else." },
      { type: "h2", text: "How it works" },
      { type: "p", text: "A Bowen session uses small, precise moves over specific muscles and soft tissue. Between each set of moves, the therapist pauses and steps back. Those pauses are part of the work. They give your nervous system a moment to respond and settle, which is why most people feel deeply relaxed within the first few minutes." },
      { type: "p", text: "Because the moves are so gentle, Bowen is suitable for almost everyone, from people in acute pain to seniors and children. You stay fully clothed and the whole session is calm and quiet." },
      { type: "h2", text: "What it helps with" },
      { type: "p", text: "People come to Bowen therapy for a wide range of issues. Some of the most common are:" },
      { type: "list", items: [
        "Back pain, neck pain, and stiffness",
        "Sciatica and hip discomfort",
        "Headaches and jaw tension",
        "Old injuries that never fully settled",
        "Stress and trouble winding down",
      ] },
      { type: "p", text: "Pain is not always where the problem started. A sore shoulder might trace back to how you have been protecting an old ankle injury for years. Bowen looks at the whole picture, not just the spot that hurts today." },
      { type: "h2", text: "What to expect" },
      { type: "p", text: "Most people notice a real difference within three to six sessions. First appointments run a little longer so there is time to talk through your history and how your body moves. Wear comfortable, loose clothing and plan to take it easy afterward." },
      { type: "p", text: "If you are in the Stirling and Hastings County area and have been dealing with pain that will not quit, Bowen therapy is a gentle place to start." },
    ],
  },
  {
    slug: "signs-your-horse-needs-bodywork",
    title: "5 Signs Your Horse Might Need Bodywork",
    description: "Stiffness, uneven movement, and behaviour changes under saddle can point to a body that needs help. Five signs your horse could benefit from equine bodywork in Hastings County.",
    date: "2026-05-12",
    readMin: 4,
    photoFile: "blog-horse.png",
    excerpt: "Horses cannot tell us when something hurts, but their body and behaviour often will. Here are five signs to watch for.",
    body: [
      { type: "p", text: "Horses cannot tell us in words when something hurts, but their bodies and behaviour usually will, if we know what to look for. Here are five signs your horse could benefit from bodywork." },
      { type: "list", items: [
        "A shorter or uneven stride",
        "Reluctance to bend one direction",
        "Tension or bracing under saddle",
        "Head-shying or unusual sensitivity",
        "Behaviour that just does not feel like your horse",
      ] },
      { type: "p", text: "Any one of these on its own could be nothing. Together, or persisting over time, they are worth a closer look." },
    ],
  },
  {
    slug: "bowen-therapy-for-dogs",
    title: "Bowen Therapy for Dogs: Gentle Help for Aging and Sore Pets",
    description: "Older dogs slowing down on the stairs or stiff after rest may benefit from Bowen therapy. Learn how this gentle technique helps dogs in Stirling and Hastings County.",
    date: "2026-05-22",
    readMin: 3,
    photoFile: "blog-dog.png",
    excerpt: "The same gentle approach that helps people works beautifully for dogs. Here is how it can help your pet.",
    body: [
      { type: "p", text: "If your dog is slowing down on the stairs, stiff after a nap, or just not as bouncy as they used to be, they may be living with discomfort they cannot tell you about. Bowen therapy offers a gentle, drug-free way to help." },
      { type: "h2", text: "The same gentle moves, adapted for dogs" },
      { type: "p", text: "The Bowen technique translates naturally to dogs. The same small, precise moves and the same resting pauses that allow the body to respond. There is no forcing and nothing that hurts, so most dogs relax into it quickly." },
      { type: "h2", text: "What it can help with" },
      { type: "list", items: [
        "Stiffness and slowing down with age",
        "Hip and joint issues",
        "Recovery after surgery or injury",
        "Anxiety and trouble settling",
        "General mobility and comfort",
      ] },
      { type: "p", text: "Dogs often show a visible change within a single session, whether that is moving more freely or simply seeming more at ease." },
      { type: "h2", text: "Comfortable and stress-free" },
      { type: "p", text: "Sessions can be done in the clinic or at your home, whichever keeps your dog calmest. Bowen is safe for dogs of all ages and sizes. If your pet has been struggling, it is a kind and gentle option worth trying." },
    ],
  },
  {
    slug: "what-to-expect-first-bowen-session",
    title: "What to Expect at Your First Bowen Therapy Session",
    description: "Wondering what happens at a Bowen therapy appointment? A simple walkthrough of your first visit, what to wear, and how you might feel afterward.",
    date: "2026-06-01",
    readMin: 3,
    photoFile: "blog-what-to-expect.png",
    excerpt: "New to Bowen therapy? Here is exactly what happens at your first appointment so you can walk in relaxed.",
    body: [
      { type: "p", text: "Trying something new can feel a little uncertain, so here is a simple walkthrough of what your first Bowen therapy session looks like. The short version is that it is calm, gentle, and easy." },
      { type: "h2", text: "A conversation first" },
      { type: "p", text: "Your first appointment runs a little longer than the rest. Before any hands-on work, Kathy will ask about your pain, your history, and how your body moves day to day. This helps her understand what is really going on, not just where it hurts." },
      { type: "h2", text: "The session itself" },
      { type: "p", text: "You stay fully clothed, so wear something comfortable and loose. The work is a series of small, gentle moves with quiet pauses in between. There is no cracking and no hard pressure. Many people find the pauses so relaxing that they drift off." },
      { type: "h2", text: "How you might feel afterward" },
      { type: "p", text: "Most people leave feeling calm and lighter. Because the body keeps responding after the session, it is best to drink water, move gently, and avoid hard workouts for a day or so. Some people feel a shift right away, others over the next few days." },
      { type: "h2", text: "How many sessions" },
      { type: "p", text: "Most people notice a real difference within three to six sessions. Kathy will talk through a simple plan with you at the first visit, with no pressure. When you are ready, booking online takes just a minute." },
    ],
  },
];

function blocksToPortableText(blocks: Block[]) {
  return blocks.map((block) => {
    if (block.type === "list") {
      return block.items.map((item) => ({
        _type: "block",
        _key: cryptoKey(),
        style: "normal",
        listItem: "bullet",
        children: [{ _type: "span", _key: cryptoKey(), text: item }],
      }));
    }
    return {
      _type: "block",
      _key: cryptoKey(),
      style: block.type === "h2" ? "h2" : "normal",
      children: [{ _type: "span", _key: cryptoKey(), text: block.text }],
    };
  }).flat();
}

function cryptoKey() {
  return Math.random().toString(36).slice(2, 10);
}

async function run() {
  console.log(`Migrating into project ${client.config().projectId}, dataset ${client.config().dataset}`);

  for (const s of services) {
    console.log(`Uploading photo for ${s.name}...`);
    const photo = await uploadPhoto(s.photoFile);
    await client.createOrReplace({
      _id: `service-${s.slug}`,
      _type: "service",
      name: s.name,
      slug: { _type: "slug", current: s.slug },
      order: s.order,
      photo,
      tagline: s.tagline,
      shortDescription: s.shortDescription,
      fullDescription: s.fullDescription,
      details: s.details,
      price: s.price,
      bookingMethod: s.bookingMethod,
    });
    console.log(`✓ ${s.name}`);
  }

  for (const p of posts) {
    console.log(`Uploading photo for ${p.title}...`);
    const photo = await uploadPhoto(p.photoFile);
    await client.createOrReplace({
      _id: `post-${p.slug}`,
      _type: "post",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      date: p.date,
      readMin: p.readMin,
      photo,
      excerpt: p.excerpt,
      description: p.description,
      body: blocksToPortableText(p.body),
    });
    console.log(`✓ ${p.title}`);
  }

  console.log("Migration complete.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
