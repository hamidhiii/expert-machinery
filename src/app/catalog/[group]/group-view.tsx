"use client";

import { CatalogExplorer } from "@/components/catalog-explorer";
import { CtaBand } from "@/components/cta-band";
import { ButtonLink, InnerHero } from "@/components/ui";
import { useRequestModal } from "@/components/request-modal";
import { getGroup, groupProducts, siteImages, type GroupKey } from "@/lib/catalog";
import { pluralItems, useLanguage } from "@/lib/i18n";

export function GroupView({ groupKey }: { groupKey: GroupKey }) {
  const { locale, t, tr } = useLanguage();
  const { open } = useRequestModal();

  const group = getGroup(groupKey)!;
  const items = groupProducts(groupKey);
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
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <p className="display text-3xl text-ink">{t("catalog.group.soon")}</p>
            <p className="mt-4 text-[15px] leading-8 text-muted">{t("catalog.group.soonText")}</p>
            <div className="mt-8 flex justify-center">
              <ButtonLink onClick={() => open(tr(group.title))}>{t("common.request")}</ButtonLink>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-paper py-14 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <CatalogExplorer group={groupKey} />
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
