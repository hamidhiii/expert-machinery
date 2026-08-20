import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "EXPERT MACHINERY — поставщик промышленных редукторов, насосов и приводных решений для предприятий Узбекистана и Центральной Азии.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
