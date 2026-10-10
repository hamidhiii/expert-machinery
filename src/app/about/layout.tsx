import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "О компании",
  description:
    "Expert Machinery — поставщик промышленных редукторов, насосов и приводных решений для предприятий Казахстана. Офис в Астане.",
  path: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
