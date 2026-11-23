"use client";

import { createContext, useContext } from "react";
import { SITE_TEXT_DEFAULTS, type SiteText } from "./siteTextSpec";

const SiteTextContext = createContext<SiteText>(SITE_TEXT_DEFAULTS);

export function SiteTextProvider({ text, children }: { text: SiteText; children: React.ReactNode }) {
  return <SiteTextContext.Provider value={text}>{children}</SiteTextContext.Provider>;
}

/** All the editable wording on the site (button labels, headings, menu links). */
export function useSiteText(): SiteText {
  return useContext(SiteTextContext);
}
