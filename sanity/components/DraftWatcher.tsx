"use client";

import { useEffect, useState } from "react";
import { useClient, type LayoutProps } from "sanity";

// Real content only: Sanity keeps its own internal drafts (preview keys) that must not be counted.
const DRAFTS = `*[_id in path("drafts.**") && !(_type match "sanity.*")]`;

/**
 * Wraps the whole Studio. While anything is saved as a draft but not yet on the
 * live site, makes the browser ask before the tab is closed.
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
    </>
  );
}
