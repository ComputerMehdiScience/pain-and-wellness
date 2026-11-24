import { service } from "./service";
import { post } from "./post";
import { siteSettings } from "./siteSettings";
import { siteText } from "./siteText";
import { testimonial } from "./testimonial";
import { faqItem } from "./faqItem";
import { pricingRow } from "./pricingRow";
import { homepage } from "./homepage";
import { pageContent } from "./pageContent";
import { StatusInput } from "../components/StatusInput";

const documents = [
  service,
  post,
  siteSettings,
  siteText,
  testimonial,
  faqItem,
  pricingRow,
  homepage,
  pageContent,
];

// Every document shows a plain "Live / not live yet" note at the top.
export const schemaTypes = documents.map((t) => ({ ...t, components: { ...(t as { components?: object }).components, input: StatusInput } })) as unknown as typeof documents;
