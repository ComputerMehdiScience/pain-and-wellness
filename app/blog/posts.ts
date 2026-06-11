export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;        // ISO, used for sorting + display
  readMin: number;
  photo: string;
  objectPosition?: string;
  excerpt: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "what-is-bowen-therapy",
    title: "What Is Bowen Therapy? A Gentle Approach to Lasting Relief",
    description:
      "Bowen therapy is a gentle, hands-on treatment for pain and stiffness. Learn how it works and who it helps, from a certified Bowen therapist in Stirling, Ontario.",
    date: "2026-05-02",
    readMin: 4,
    photo: "/photos/blog-bowen-therapy.png",
    objectPosition: "center",
    excerpt:
      "A simple look at what Bowen therapy is, how the gentle moves work, and the kinds of pain it can help with.",
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
    description:
      "Stiffness, uneven movement, and behaviour changes under saddle can point to a body that needs help. Five signs your horse could benefit from equine bodywork in Hastings County.",
    date: "2026-05-12",
    readMin: 4,
    photo: "/photos/blog-horse.png",
    objectPosition: "center",
    excerpt:
      "Horses cannot tell us when something hurts, but their body and behaviour often will. Here are five signs to watch for.",
    body: [
      { type: "p", text: "Horses are stoic by nature. They hide discomfort well, which means problems often show up as small changes long before they become obvious. Knowing what to look for can help you catch trouble early." },
      { type: "h2", text: "1. Uneven or short movement" },
      { type: "p", text: "If your horse is short-striding, tracking unevenly, or just not moving as freely as usual, the body may be compensating for tension or an old strain. It is easy to write off as a bad day, but a pattern is worth paying attention to." },
      { type: "h2", text: "2. Changes under saddle" },
      { type: "p", text: "Reluctance to pick up a lead, hollowing the back, pinning the ears, or resisting work that used to be easy can all be signs of physical discomfort rather than attitude. Horses rarely act out for no reason." },
      { type: "h2", text: "3. Stiffness on one side" },
      { type: "p", text: "Many horses are naturally a little one-sided, but a clear difference between left and right, or trouble bending one way, often points to tension that bodywork can ease." },
      { type: "h2", text: "4. Head-shying or sensitivity to grooming" },
      { type: "p", text: "Flinching, head-shying, or sudden sensitivity when you groom or tack up can mean a sore spot. A horse that used to stand quietly and now fidgets is telling you something." },
      { type: "h2", text: "5. Recovery after an injury" },
      { type: "p", text: "Even after an injury heals, horses often hold protective patterns that linger. Bodywork helps release those patterns so your horse can move comfortably again." },
      { type: "h2", text: "Help that comes to you" },
      { type: "p", text: "Equine bodywork uses gentle, hands-on techniques to address the root causes of stiffness and resistance, not just the symptoms. Farm visits across Hastings County mean no trailering required. If any of these signs sound familiar, it may be time to book a visit." },
    ],
  },
  {
    slug: "bowen-therapy-for-dogs",
    title: "Bowen Therapy for Dogs: Gentle Help for Aging and Sore Pets",
    description:
      "Older dogs slowing down on the stairs or stiff after rest may benefit from Bowen therapy. Learn how this gentle technique helps dogs in Stirling and Hastings County.",
    date: "2026-05-22",
    readMin: 3,
    photo: "/photos/blog-dog.png",
    objectPosition: "center",
    excerpt:
      "The same gentle approach that helps people works beautifully for dogs. Here is how it can help your pet.",
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
    description:
      "Wondering what happens at a Bowen therapy appointment? A simple walkthrough of your first visit, what to wear, and how you might feel afterward.",
    date: "2026-06-01",
    readMin: 3,
    photo: "/photos/blog-what-to-expect.png",
    objectPosition: "center",
    excerpt:
      "New to Bowen therapy? Here is exactly what happens at your first appointment so you can walk in relaxed.",
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

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
