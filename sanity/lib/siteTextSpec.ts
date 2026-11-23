/**
 * Every piece of fixed wording on the site (button labels, section headings,
 * form labels, menu and footer links). This one list drives three things:
 *  - the editor fields in Studio ("Buttons & Labels")
 *  - the defaults the site falls back to if a field is ever left empty
 *  - the seed data written when the document is first created
 * Safe to import from both server and client code.
 */

export const TEXT_GROUPS = [
  { name: "menu", title: "Menu & Footer" },
  { name: "home", title: "Homepage" },
  { name: "services", title: "Services pages" },
  { name: "blog", title: "Blog" },
  { name: "contact", title: "Contact & forms" },
] as const;

type GroupName = (typeof TEXT_GROUPS)[number]["name"];

type Field = { key: string; title: string; group: GroupName; value: string; long?: boolean; help?: string };

export const TEXT_FIELDS = [
  // ---- Menu & Footer
  { key: "navBookButton", title: "Top menu: Book button", group: "menu", value: "Book now" },
  { key: "navBookButtonMobile", title: "Phone menu: Book button", group: "menu", value: "Book an appointment" },
  { key: "footerBrand", title: "Footer: business name", group: "menu", value: "Pain & Wellness Solutions" },
  { key: "footerServicesHeading", title: "Footer: Services column title", group: "menu", value: "Services" },
  { key: "footerExploreHeading", title: "Footer: Explore column title", group: "menu", value: "Explore" },
  { key: "footerVisitHeading", title: "Footer: Visit column title", group: "menu", value: "Visit" },
  { key: "footerBadge", title: "Footer: green badge", group: "menu", value: "New patients welcome" },
  { key: "footerCopyright", title: "Footer: bottom line", group: "menu", value: "© 2025 Pain & Wellness Solutions · Stirling, Ontario" },

  // ---- Homepage
  { key: "heroPrimaryButton", title: "Top banner: main button", group: "home", value: "Book an appointment" },
  { key: "heroSecondaryButton", title: "Top banner: second button", group: "home", value: "View services" },
  { key: "heroSecondaryHref", title: "Top banner: second button goes to", group: "home", value: "/services", help: "A page on this site, like /services or /contact." },
  { key: "servicesHeading", title: "Services carousel: heading", group: "home", value: "What Kathy offers." },
  { key: "servicesSubheading", title: "Services carousel: sentence under the heading", group: "home", value: "Hands-on sessions for people and animals, at the clinic or at your farm.", long: true },
  { key: "servicesLearnMore", title: "Services carousel: Learn more label", group: "home", value: "Learn more →" },
  { key: "servicesPrev", title: "Services carousel: back button", group: "home", value: "← Prev" },
  { key: "servicesNext", title: "Services carousel: next button", group: "home", value: "Next →" },
  { key: "servicesBookButton", title: "Services carousel: Book button", group: "home", value: "Book an appointment" },
  { key: "expectButton", title: "Two photo blocks: Book button", group: "home", value: "Book an appointment" },
  { key: "aboutName", title: "Meet Kathy photo: name", group: "home", value: "Kathy Morton" },
  { key: "aboutRole", title: "Meet Kathy photo: title line", group: "home", value: "Certified Bowen Therapist · Since 2017" },
  { key: "herdButton", title: "Healing with the Herd: Book button", group: "home", value: "Book a Herd session" },
  { key: "herdCallPrefix", title: "Healing with the Herd: words before the phone number", group: "home", value: "or call" },
  { key: "faqHeading", title: "FAQ: heading", group: "home", value: "Common questions" },
  { key: "faqIntro", title: "FAQ: sentence under the heading", group: "home", value: "Most people ask these before booking. Still curious?" },
  { key: "faqCallLink", title: "FAQ: call link words", group: "home", value: "Call Kathy directly" },
  { key: "pricingHeading", title: "Pricing: heading", group: "home", value: "Simple, honest pricing." },
  { key: "pricingSubheading", title: "Pricing: sentence under the heading", group: "home", value: "No packages to decode. Just what a visit costs." },
  { key: "pricingFootnote", title: "Pricing: note below the table", group: "home", value: "Reiki, Scar Tissue Release, and Ionized Foot Detox are priced individually." },
  { key: "pricingCallLink", title: "Pricing: call link words", group: "home", value: "Call Kathy" },
  { key: "pricingFootnoteEnd", title: "Pricing: last words of the note", group: "home", value: "to ask." },
  { key: "testimonialsHeading", title: "Reviews: heading", group: "home", value: "Real clients, real changes." },
  { key: "testimonialsSubheading", title: "Reviews: sentence under the heading", group: "home", value: "Here's what people have to say after working with Kathy." },
  { key: "ctaButton", title: "Bottom of pages: Book button", group: "home", value: "Book your appointment" },
  { key: "firstVisitButton", title: "Personal Pain page: Book button", group: "home", value: "Book your first visit" },

  // ---- Services pages
  { key: "directoryCallForPricing", title: "Services list: no price label", group: "services", value: "Call for pricing" },
  { key: "directoryBookButton", title: "Services list: Book online button", group: "services", value: "Book an appointment" },
  { key: "directoryCallButton", title: "Services list: Call button", group: "services", value: "Call to arrange a visit" },
  { key: "serviceEyebrow", title: "Single service page: small label above the name", group: "services", value: "Service" },
  { key: "serviceBack", title: "Single service page: back link", group: "services", value: "← Back" },
  { key: "serviceDetailsHeading", title: "Single service page: list heading", group: "services", value: "What to know" },
  { key: "servicePricingNote", title: "Single service page: no price note", group: "services", value: "Priced individually. Call for pricing." },
  { key: "serviceCallButton", title: "Single service page: Call button", group: "services", value: "Call to book" },
  { key: "serviceBookButton", title: "Single service page: Book online button", group: "services", value: "Book this service" },

  // ---- Blog
  { key: "blogReadMore", title: "Blog list: Read more link", group: "blog", value: "Read more →" },
  { key: "blogMinRead", title: "Blog: the words after the number of minutes", group: "blog", value: "min read" },
  { key: "blogBack", title: "Blog post: back link", group: "blog", value: "← All posts" },
  { key: "blogBookButton", title: "Blog post: Book button", group: "blog", value: "Book an appointment" },

  // ---- Contact & forms
  { key: "contactFormHeading", title: "Contact page: form heading", group: "contact", value: "Send a message." },
  { key: "contactFormSubheading", title: "Contact page: sentence under the heading", group: "contact", value: "Not sure where to start? Send a note and Kathy will point you in the right direction.", long: true },
  { key: "contactPhoneLabel", title: "Contact page: Phone label", group: "contact", value: "Phone" },
  { key: "contactClinicLabel", title: "Contact page: Clinic label", group: "contact", value: "Clinic" },
  { key: "contactInstagramLabel", title: "Contact page: Instagram label", group: "contact", value: "Instagram" },
  { key: "contactInstagramHandle", title: "Contact page: Instagram name shown", group: "contact", value: "@painandwellnesssolutions" },
  { key: "contactFacebookLabel", title: "Contact page: Facebook label", group: "contact", value: "Facebook" },
  { key: "contactFacebookHandle", title: "Contact page: Facebook name shown", group: "contact", value: "@painandwellnesssolutions" },
  { key: "formNameLabel", title: "Form: Name label", group: "contact", value: "Name" },
  { key: "formEmailLabel", title: "Form: Email label", group: "contact", value: "Email" },
  { key: "formPhoneLabel", title: "Form: Phone label", group: "contact", value: "Phone (optional)" },
  { key: "formMessageLabel", title: "Form: Message label", group: "contact", value: "Message" },
  { key: "formNamePlaceholder", title: "Form: Name hint", group: "contact", value: "Your name" },
  { key: "formEmailPlaceholder", title: "Form: Email hint", group: "contact", value: "you@email.com" },
  { key: "formPhonePlaceholder", title: "Form: Phone hint", group: "contact", value: "613-000-0000" },
  { key: "formMessagePlaceholder", title: "Form: Message hint", group: "contact", value: "How can Kathy help you or your animals?" },
  { key: "formSubmit", title: "Form: Send button", group: "contact", value: "Send message" },
  { key: "formSending", title: "Form: Send button while sending", group: "contact", value: "Sending..." },
  { key: "formSuccessTitle", title: "Form: thank-you headline", group: "contact", value: "Thank you, your message is on its way." },
  { key: "formSuccessBody", title: "Form: thank-you words before the phone number", group: "contact", value: "Kathy will get back to you soon. For anything urgent, call" },
  { key: "formErrorBody", title: "Form: error words before the phone number", group: "contact", value: "Something went wrong sending your message. Please try again, or call" },
] as const satisfies readonly Field[];

export type TextKey = (typeof TEXT_FIELDS)[number]["key"];

export type LinkItem = { label: string; href: string };
export type StatItem = { value: string; label: string };

export type SiteText = Record<TextKey, string> & {
  navLinks: LinkItem[];
  footerServiceLinks: LinkItem[];
  footerExploreLinks: LinkItem[];
  footerLegalLinks: LinkItem[];
  aboutStats: StatItem[];
};

export const LIST_DEFAULTS = {
  navLinks: [
    { label: "About", href: "/about" },
    { label: "Personal Pain Management", href: "/personal-pain-management" },
    { label: "Equine Body Work", href: "/equine-body-work" },
    { label: "Services", href: "/services" },
    { label: "Results", href: "/results" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  footerServiceLinks: [
    { label: "Bowen & myoskeletal", href: "/services/bowen-myoskeletal-therapy" },
    { label: "Healing with the Herd", href: "/services/healing-with-the-herd" },
    { label: "Scar Tissue Release", href: "/services/scar-tissue-release" },
    { label: "Reiki", href: "/services/reiki" },
    { label: "Ionized Foot Detox", href: "/services/ionized-foot-detox" },
    { label: "Equine Bodywork", href: "/services/equine-bodywork" },
    { label: "Canine Bowen", href: "/services/canine-bowen" },
  ],
  footerExploreLinks: [
    { label: "About Kathy", href: "/about" },
    { label: "Personal Pain Management", href: "/personal-pain-management" },
    { label: "Equine Body Work", href: "/equine-body-work" },
    { label: "Results & reviews", href: "/results" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  footerLegalLinks: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  aboutStats: [
    { value: "2017", label: "In practice since" },
    { value: "Certified", label: "Bowen Therapist" },
    { value: "ON", label: "Stirling area" },
  ],
} satisfies Pick<SiteText, "navLinks" | "footerServiceLinks" | "footerExploreLinks" | "footerLegalLinks" | "aboutStats">;

const TEXT_DEFAULTS = Object.fromEntries(TEXT_FIELDS.map((f) => [f.key, f.value])) as Record<TextKey, string>;

export const SITE_TEXT_DEFAULTS: SiteText = { ...TEXT_DEFAULTS, ...LIST_DEFAULTS };

/** Fills any missing or empty value with the original wording, so the site never shows a blank label. */
export function mergeSiteText(data: Partial<Record<string, unknown>> | null | undefined): SiteText {
  const out: Record<string, unknown> = { ...SITE_TEXT_DEFAULTS };
  if (!data) return out as SiteText;
  for (const f of TEXT_FIELDS) {
    const v = data[f.key];
    if (typeof v === "string" && v.trim()) out[f.key] = v;
  }
  for (const key of Object.keys(LIST_DEFAULTS) as (keyof typeof LIST_DEFAULTS)[]) {
    const v = data[key];
    if (Array.isArray(v) && v.length) out[key] = v;
  }
  return out as SiteText;
}
