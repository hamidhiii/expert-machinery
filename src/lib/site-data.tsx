"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteData } from "@/lib/catalog";

const SiteDataContext = createContext<SiteData | null>(null);

/** Admin-managed content loaded once in the root layout (see src/lib/api.ts). */
export function SiteDataProvider({ data, children }: { data: SiteData; children: ReactNode }) {
  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return ctx;
}
