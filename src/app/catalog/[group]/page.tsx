import { notFound } from "next/navigation";
import { getGroup, groups } from "@/lib/catalog";
import { GroupView } from "./group-view";

type GroupPageProps = {
  params: Promise<{ group: string }>;
};

export function generateStaticParams() {
  return groups.map((group) => ({ group: group.key }));
}

export async function generateMetadata({ params }: GroupPageProps) {
  const { group } = await params;
  const found = getGroup(group);

  return {
    title: found ? found.title.ru : "Каталог",
    description: found?.text.ru,
  };
}

export default async function GroupPage({ params }: GroupPageProps) {
  const { group } = await params;
  const found = getGroup(group);

  if (!found) {
    notFound();
  }

  return <GroupView groupKey={found.key} />;
}
