"use client";

import Image from "next/image";
import { Gauge } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { PageHero, Reveal } from "@/components/ui";
import { industries, siteImages } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

export default function IndustriesPage() {
  const { t, tr } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={t("industries.hero.eyebrow")}
        title={t("industries.hero.title")}
        text={t("industries.hero.text")}
        image={siteImages.heroPlant}
      />

      <section className="blueprint py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {industries.map((industry, index) => (
              <Reveal key={industry.slug} delay={index * 0.04}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:shadow-card sm:flex-row">
                  <div className="relative h-52 w-full shrink-0 overflow-hidden bg-ink sm:h-auto sm:w-56">
                    <Image
                      src={industry.image}
                      alt={tr(industry.title)}
                      fill
                      sizes="(max-width: 640px) 100vw, 224px"
                      className="object-cover opacity-80 transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ink/30" aria-hidden />
                    <span className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-flame text-white">
                      <industry.icon className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-lg font-black uppercase leading-tight tracking-tight text-ink">
                      {tr(industry.title)}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-7 text-steel">{tr(industry.text)}</p>
                    <p className="mt-5 flex items-start gap-2 border-t border-dashed border-slate-200 pt-4 text-xs font-bold leading-5 text-slate-400">
                      <Gauge className="mt-0.5 h-4 w-4 shrink-0 text-flame" />
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
