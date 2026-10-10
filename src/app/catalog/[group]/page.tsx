import { notFound } from "next/navigation";
import { getProducts, getSiteData } from "@/lib/api";
import { getGroup, productGroup } from "@/lib/catalog";
import { JsonLd, breadcrumbLd, pageMetadata } from "@/lib/seo";
import { GroupView } from "./group-view";

type GroupPageProps = {
  params: Promise<{ group: string }>;
};

export async function generateStaticParams() {
  const { groups } = await getSiteData();
  return groups.map((group) => ({ group: group.key }));
}

export async function generateMetadata({ params }: GroupPageProps) {
  const { group } = await params;
  const found = getGroup((await getSiteData()).groups, group);

  if (!found) return { title: "Каталог" };

  return pageMetadata({
    title: `${found.title.ru} — купить в Казахстане`,
    description: `${found.text.ru} ${found.count ? `${found.count} позиций в каталоге, ` : ""}подбор по параметрам и поставка по Казахстану.`,
    path: `/catalog/${found.key}`,
    image: found.image,
  });
}

export default async function GroupPage({ params }: GroupPageProps) {
  const { group } = await params;
  const found = getGroup((await getSiteData()).groups, group);

  if (!found) {
    notFound();
  }

  const products = (await getProducts()).filter((product) => productGroup(product) === found.key);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          ["Главная", "/"],
          ["Каталог", "/catalog"],
          [found.title.ru, `/catalog/${found.key}`],
        ])}
      />
      <GroupView groupKey={found.key} products={products} />
    </>
  );
}
