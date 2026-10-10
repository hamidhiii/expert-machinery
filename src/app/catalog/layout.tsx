import type { Metadata } from "next";
import { SITE_NAME, pageMetadata } from "@/lib/seo";

const title = "Каталог: редукторы, насосы, фильтры и масла";

export const metadata: Metadata = {
  ...pageMetadata({
    title,
    description:
      "Каталог Expert Machinery: мотор-редукторы, насосы, гидромуфты, фильтры и масла Fleetguard с подбором по параметрам и поставкой по Казахстану.",
    path: "/catalog",
  }),
  // A plain string here would stop the root "%s | brand" template reaching groups and products.
  title: { default: title, template: `%s | ${SITE_NAME}` },
};

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
