"use client";

import { CatalogExplorer } from "@/components/catalog-explorer";
import { CtaBand } from "@/components/cta-band";
import { InnerHero } from "@/components/ui";
import { products } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

export default function CatalogPage() {
  const { t } = useLanguage();

  return (
    <>
      <InnerHero
        breadcrumbs={[{ label: t("common.home"), href: "/" }, { label: t("nav.catalog") }]}
        eyebrow={`Catalog / ${new Date().getFullYear()}`}
        title={t("catalog.hero.title")}
        text={t("catalog.hero.text")}
        counter={`${products.length} / ${t("catalog.items")}`}
      />

      <section className="bg-cream py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CatalogExplorer />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
