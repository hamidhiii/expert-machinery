import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Сервис и инженерный подбор",
  description:
    "Expert Machinery: инженерный подбор редукторов и насосов, замена импортных аналогов, ремонт двигателей, диагностика и контроль поставки.",
  path: "/service",
});

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
