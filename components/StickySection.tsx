"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function StickySection({
  children,
  zIndex = 1,
  dark = false,
}: {
  children: React.ReactNode;
  zIndex?: number;
  dark?: boolean;
}) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex,
        borderRadius: zIndex > 1 ? "0 0 0 0" : 0,
        boxShadow: zIndex > 1
          ? "0 -8px 40px oklch(22% 0.055 158 / 0.12)"
          : "none",
      }}
    >
      {children}
    </div>
  );
}
