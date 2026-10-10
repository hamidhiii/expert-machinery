import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Отрасли: приводы для горнодобычи, цемента, энергетики",
  description:
    "Приводные решения Expert Machinery для горнодобычи, цемента, пищевой переработки, логистики, энергетики и водоканала Казахстана.",
  path: "/industries",
});

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
