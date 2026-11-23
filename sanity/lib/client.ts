import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // studioUrl must be defined or next-sanity never turns on stega (the hidden
  // markers Visual Editing uses to know which text belongs to which field).
  // defineLive() decides per request when to actually enable it.
  stega: { enabled: false, studioUrl: "/studio" },
});
