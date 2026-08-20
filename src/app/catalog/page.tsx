"use client";

import { CatalogExplorer } from "@/components/catalog-explorer";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/ui";
import { industries, products, siteImages } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

export default function CatalogPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={t("catalog.hero.eyebrow")}
        title={t("catalog.hero.title")}
        text={t("catalog.hero.text")}
        image={siteImages.line}
        stats={[
          { value: `${products.length}`, label: t("catalog.items") },
          { value: "9", label: t("home.stats.series") },
          { value: `${industries.length}`, label: t("home.stats.industries") },
          { value: "24ч", label: t("home.stats.response") },
        ]}
      />

      <section className="blueprint py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CatalogExplorer />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
