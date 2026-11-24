"use client";

import { createContext, useContext, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <EditModeContext.Provider value={editing}>
      {children}
      {editing && <EditBar />}
    </EditModeContext.Provider>
  );
}

const PAGES: [string, string][] = [
  ["Home", "/"],
  ["About", "/about"],
  ["Personal Pain", "/personal-pain-management"],
  ["Equine", "/equine-body-work"],
  ["Services", "/services"],
  ["Results", "/results"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
];

/** Only visible inside the editor: says what to do and lets her jump between pages. */
function EditBar() {
  const path = usePathname() || "/";
  return (
    <>
      <div style={{ height: 96 }} aria-hidden />
      <div
        data-edit-bar
        style={{
          position: "fixed",
          left: "50%",
          bottom: 14,
          transform: "translateX(-50%)",
          zIndex: 2147483000,
          maxWidth: "calc(100vw - 24px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "6px 10px",
          padding: "8px 12px",
          background: "#1f4f55",
          color: "#fff",
          borderRadius: 14,
          boxShadow: "0 10px 30px rgba(0,0,0,0.28)",
          fontFamily: "system-ui, sans-serif",
          fontSize: 13,
          lineHeight: 1.2,
        }}
      >
        <span style={{ opacity: 0.9 }}>Click any text or photo to change it.</span>
        <span style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
          {PAGES.map(([label, href]) => {
            const on = path === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  padding: "6px 10px",
                  borderRadius: 999,
                  background: on ? "#fff" : "rgba(255,255,255,0.14)",
                  color: on ? "#1f4f55" : "#fff",
                  fontWeight: on ? 700 : 500,
                  textDecoration: "none",
                }}
              >
                {label}
              </Link>
            );
          })}
        </span>
      </div>
    </>
  );
}
