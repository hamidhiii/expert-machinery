import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Отрасли",
  description:
    "Приводные решения EXPERT MACHINERY для горнодобычи, цемента, пищевой переработки, логистики, энергетики и водоканала.",
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
