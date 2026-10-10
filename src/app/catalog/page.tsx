"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { InnerHero, Reveal } from "@/components/ui";
import { siteImages } from "@/lib/catalog";
import { pluralItems, useLanguage } from "@/lib/i18n";
import { useSiteData } from "@/lib/site-data";

export default function CatalogPage() {
  const { locale, t, tr } = useLanguage();
  const { groups, totalProducts } = useSiteData();

  return (
    <>
      <InnerHero
        breadcrumbs={[{ label: t("common.home"), href: "/" }, { label: t("nav.catalog") }]}
        eyebrow={`Catalog / ${new Date().getFullYear()}`}
        title={t("catalog.groups.title")}
        text={t("catalog.groups.text")}
        image={siteImages.line}
        counter={`${totalProducts} / ${pluralItems(locale, totalProducts)}`}
      />

      <section className="bg-paper py-16 lg:py-20">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group, index) => {
              const count = group.count;
              const empty = group.categories.length === 0;

              return (
                <Reveal key={group.key} delay={index * 0.04}>
                  <Link
                    href={`/catalog/${group.key}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper transition hover:-translate-y-1 hover:shadow-card"
                  >
                    <div className="relative aspect-[5/3] overflow-hidden bg-surface">
                      <Image
                        src={group.image}
                        alt={tr(group.title)}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={
                          empty
                            ? "object-cover opacity-80 transition duration-500 group-hover:scale-105"
                            : "object-contain p-8 mix-blend-multiply transition duration-500 group-hover:scale-105"
                        }
                      />
                      <span className="absolute left-4 top-4 rounded-md bg-ink/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                        {empty ? t("catalog.group.soon") : `${count} ${pluralItems(locale, count)}`}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <span className="text-xs font-semibold text-flame">0{index + 1}</span>
                      <h2 className="mt-3 text-xl font-semibold tracking-display text-ink">
                        {tr(group.title)}
                      </h2>
                      <p className="mt-3 flex-1 text-sm leading-7 text-muted">{tr(group.text)}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-flame">
                        {empty ? t("common.request") : t("common.more")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
