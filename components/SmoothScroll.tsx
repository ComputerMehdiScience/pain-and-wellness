"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  useEffect(() => {
    if (isStudio) return;
    const lenis = new Lenis({ lerp: 0.18, smoothWheel: true });
    const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [isStudio]);
  return null;
}
