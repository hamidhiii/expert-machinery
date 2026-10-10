"use client";

import { CatalogExplorer } from "@/components/catalog-explorer";
import { CtaBand } from "@/components/cta-band";
import { ButtonLink, InnerHero } from "@/components/ui";
import { useRequestModal } from "@/components/request-modal";
import { getGroup, siteImages, type Product } from "@/lib/catalog";
import { pluralItems, useLanguage } from "@/lib/i18n";
import { useSiteData } from "@/lib/site-data";

export function GroupView({ groupKey, products: items }: { groupKey: string; products: Product[] }) {
  const { locale, t, tr } = useLanguage();
  const { open } = useRequestModal();

  const group = getGroup(useSiteData().groups, groupKey)!;
  const empty = group.categories.length === 0;

  return (
    <>
      <InnerHero
        breadcrumbs={[
          { label: t("common.home"), href: "/" },
          { label: t("nav.catalog"), href: "/catalog" },
          { label: tr(group.title) },
        ]}
        eyebrow={t("nav.catalog")}
        title={tr(group.title)}
        text={tr(group.text)}
        image={empty ? group.image : siteImages.line}
        counter={empty ? undefined : `${items.length} / ${pluralItems(locale, items.length)}`}
        action={
          empty ? <ButtonLink onClick={() => open(tr(group.title))}>{t("common.request")}</ButtonLink> : undefined
        }
      />

      {empty ? (
        <section className="bg-paper py-20 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8 2xl:px-12">
            <p className="display text-3xl text-ink">{t("catalog.group.soon")}</p>
            <p className="mt-4 text-[15px] leading-8 text-muted">{t("catalog.group.soonText")}</p>
            <div className="mt-8 flex justify-center">
              <ButtonLink onClick={() => open(tr(group.title))}>{t("common.request")}</ButtonLink>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-paper py-14 lg:py-16">
          <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-4 sm:px-6 lg:px-8 2xl:px-12">
            <CatalogExplorer categories={group.categories} products={items} />
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
