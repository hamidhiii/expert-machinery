import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сервис и инженерный подбор",
  description:
    "EXPERT MACHINERY: инженерный подбор редукторов и насосов, замена импортных аналогов, комплектация приводного узла, диагностика и контроль поставки.",
};

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
