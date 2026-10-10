import { notFound } from "next/navigation";
import { getProducts, getSiteData } from "@/lib/api";
import { getGroup, productGroup } from "@/lib/catalog";
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

  return {
    title: found ? found.title.ru : "Каталог",
    description: found?.text.ru,
  };
}

export default async function GroupPage({ params }: GroupPageProps) {
  const { group } = await params;
  const found = getGroup((await getSiteData()).groups, group);

  if (!found) {
    notFound();
  }

  const products = (await getProducts()).filter((product) => productGroup(product) === found.key);

  return <GroupView groupKey={found.key} products={products} />;
}
