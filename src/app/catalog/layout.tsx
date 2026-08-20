import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог редукторов, мотор-редукторов и насосов",
  description:
    "Каталог EXPERT MACHINERY: вальные, цилиндрические, червячные, планетарные и промышленные редукторы, насосы и гидромуфты с подбором по параметрам.",
};

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
