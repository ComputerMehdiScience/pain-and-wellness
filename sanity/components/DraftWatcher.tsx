"use client";

import { useEffect, useState } from "react";
import { useClient, type LayoutProps } from "sanity";

// Real content only: Sanity keeps its own internal drafts (preview keys) that must not be counted.
const DRAFTS = `*[_id in path("drafts.**") && !(_type match "sanity.*")]`;

/**
 * Wraps the whole Studio. While anything is saved as a draft but not yet on the
 * live site, shows a small note and makes the browser ask before the tab is closed.
 */
export function DraftWatcher(props: LayoutProps) {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    let alive = true;
    const refresh = () => {
      client
        .fetch<number>(`count(${DRAFTS})`, {}, { perspective: "raw", useCdn: false })
        .then((n) => alive && setCount(n))
        .catch(() => {});
    };
    refresh();
    const sub = client.listen(DRAFTS, {}, { visibility: "query", includeResult: false }).subscribe({
      next: () => refresh(),
      error: () => {},
    });
    const poll = window.setInterval(refresh, 15000);
    return () => {
      alive = false;
      sub.unsubscribe();
      window.clearInterval(poll);
    };
  }, [client]);

  useEffect(() => {
    if (count === 0) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [count]);

  return (
    <>
      {props.renderDefault(props)}
      {count > 0 && (
        <div
          role="status"
          style={{
            position: "fixed",
            left: 14,
            bottom: 14,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            borderRadius: 999,
            background: "#fff6e3",
            border: "1px solid #e6c07a",
            color: "#6b4a0f",
            fontSize: 13,
            boxShadow: "0 6px 18px rgba(0,0,0,0.16)",
            pointerEvents: "none",
          }}
        >
          <span style={{ width: 9, height: 9, borderRadius: 999, background: "#d99a1f" }} />
          {count === 1 ? "1 page has changes not on your live site yet" : `${count} pages have changes not on your live site yet`}
        </div>
      )}
    </>
  );
}
