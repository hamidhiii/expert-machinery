"use client";

import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { InnerHero, Reveal } from "@/components/ui";
import { industries, siteImages } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

export default function IndustriesPage() {
  const { t, tr } = useLanguage();

  return (
    <>
      <InnerHero
        breadcrumbs={[{ label: t("common.home"), href: "/" }, { label: t("nav.industries") }]}
        eyebrow="Industries"
        title={t("industries.hero.title")}
        text={t("industries.hero.text")}
        image={siteImages.heroPlant}
      />

      <section className="bg-cream py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {industries.map((industry, index) => (
              <Reveal key={industry.slug} delay={index * 0.04}>
                <article className="group h-full overflow-hidden rounded-2xl bg-white">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={industry.image}
                      alt={tr(industry.title)}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-lg bg-flame text-white">
                      <industry.icon className="h-5 w-5" />
                    </span>
                    <span className="absolute right-5 top-5 text-xs font-semibold text-white/70">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="p-7">
                    <h2 className="text-xl font-semibold tracking-display text-ink">
                      {tr(industry.title)}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-muted">{tr(industry.text)}</p>
                    <p className="mt-5 border-t border-line pt-4 text-xs leading-5 text-muted/80">
                      {t("industries.pick")}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
