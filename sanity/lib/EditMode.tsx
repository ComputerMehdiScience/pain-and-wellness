"use client";

import { createContext, useContext, useEffect } from "react";

const EditModeContext = createContext(false);

/** True while the site is shown inside the Studio's live editor (draft mode). */
export function useEditMode() {
  return useContext(EditModeContext);
}

/**
 * In the live editor, clicking should select things to edit, not leave the
 * page. Links that exit the site (Setmore, phone, email) and the carousel
 * cards are blocked, and the contact form cannot send real messages. Menu
 * links to other pages still work so she can move around her own site.
 */
export function EditModeProvider({ editing, children }: { editing: boolean; children: React.ReactNode }) {
  useEffect(() => {
    if (!editing) return;
    const blockExit = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const leavesSite = /^(https?:|tel:|mailto:)/i.test(href);
      if (leavesSite || a.hasAttribute("data-edit-block")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    const blockSubmit = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    document.addEventListener("click", blockExit, true);
    document.addEventListener("submit", blockSubmit, true);
    return () => {
      document.removeEventListener("click", blockExit, true);
      document.removeEventListener("submit", blockSubmit, true);
    };
  }, [editing]);

  return <EditModeContext.Provider value={editing}>{children}</EditModeContext.Provider>;
}
