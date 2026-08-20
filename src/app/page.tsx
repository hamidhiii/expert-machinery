"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import {
  categoryLabels,
  categoryMeta,
  company,
  countByCategory,
  industries,
  popularProducts,
  products,
  siteImages,
} from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { CtaBand } from "@/components/cta-band";
import { ArrowPill, ButtonLink, Eyebrow, Reveal, SectionHeading } from "@/components/ui";
import { useLanguage } from "@/lib/i18n";

const heroProduct = products.find((item) => item.slug === "k-series-helical-bevel-gear-motor")!;

export default function HomePage() {
  const { t, tr } = useLanguage();

  const stats = [
    { value: `${products.length}`, label: t("home.stats.items") },
    { value: "9", label: t("home.stats.series") },
    { value: `${industries.length}`, label: t("home.stats.industries") },
    { value: "24ч", label: t("home.stats.response") },
  ];

  const steps = [
    { title: t("home.process.step1.title"), text: t("home.process.step1.text") },
    { title: t("home.process.step2.title"), text: t("home.process.step2.text") },
    { title: t("home.process.step3.title"), text: t("home.process.step3.text") },
    { title: t("home.process.step4.title"), text: t("home.process.step4.text") },
  ];

  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <Image
          src={siteImages.heroPlant}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 duotone"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/70"
          aria-hidden
        />
        <div className="blueprint-dark absolute inset-0 opacity-50" aria-hidden />
        <div
          className="absolute -right-24 top-10 h-80 w-80 rotate-12 bg-flame/30 wedge blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-300">
                {t("home.hero.badge")}
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 text-4xl font-black uppercase leading-[1.02] tracking-tight sm:text-5xl lg:text-[64px]">
                {t("home.hero.title")}
                <span className="mt-2 block text-flame">{t("home.hero.titleAccent")}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                {t("home.hero.text")}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-8 grid gap-3">
                {[t("home.hero.point1"), t("home.hero.point2"), t("home.hero.point3")].map(
                  (point) => (
                    <li key={point} className="flex items-center gap-3 text-sm font-bold text-slate-200">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-flame/20 text-flame">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {point}
                    </li>
                  ),
                )}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/catalog">
                  {t("common.catalog")}
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <Link
                  href={company.phoneHref}
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-6 text-sm font-black uppercase tracking-wide transition hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                  {company.phone}
                </Link>
              </div>
            </Reveal>
          </div>

          {/* floating spec card */}
          <Reveal delay={0.15} className="relative">
            <div className="absolute -left-6 -top-6 h-24 w-24 bg-flame wedge-tl" aria-hidden />
            <div className="relative rounded-3xl border border-white/10 bg-white p-6 shadow-lift">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white">
                  {heroProduct.code}
                </span>
                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-flame">
                  {tr(categoryLabels[heroProduct.category])}
                </span>
              </div>

              <div className="relative mt-4 aspect-[5/4] overflow-hidden rounded-2xl bg-slate-50">
                <Image
                  src={heroProduct.image}
                  alt={tr(heroProduct.title)}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-contain p-6"
                />
              </div>

              <p className="mt-5 text-lg font-black leading-snug text-ink">
                {tr(heroProduct.title)}
              </p>

              <div className="mt-4 grid gap-2 border-t border-dashed border-slate-200 pt-4">
                {heroProduct.specs.map((spec) => (
                  <div key={tr(spec.label)} className="flex items-baseline justify-between gap-4">
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      {tr(spec.label)}
                    </span>
                    <span className="text-sm font-black text-ink">{tr(spec.value)}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/catalog/${heroProduct.slug}`}
                className="group mt-5 inline-flex items-center gap-2"
              >
                <ArrowPill>{t("common.more")}</ArrowPill>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------------- stats */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-slate-200 px-4 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="px-2 py-8 sm:px-8">
              <p className="text-4xl font-black tracking-tight text-ink">{stat.value}</p>
              <p className="mt-2 text-xs font-bold uppercase leading-5 tracking-wide text-steel">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- categories */}
      <section className="blueprint py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t("home.categories.eyebrow")}
            title={t("home.categories.title")}
            text={t("home.categories.text")}
            action={
              <ButtonLink href="/catalog" variant="ghost">
                {t("common.catalog")}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            }
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(categoryMeta) as (keyof typeof categoryMeta)[]).map((key, index) => (
              <Reveal key={key} delay={index * 0.04}>
                <Link
                  href="/catalog"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-50">
                    <Image
                      src={categoryMeta[key].image}
                      alt={tr(categoryLabels[key])}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute right-4 top-4 rounded-full bg-ink/90 px-3 py-1 text-[11px] font-black text-white">
                      {countByCategory(key)} {t("home.categories.count")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col border-t border-slate-100 p-6">
                    <h3 className="text-lg font-black uppercase tracking-tight text-ink">
                      {tr(categoryLabels[key])}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-steel">
                      {tr(categoryMeta[key].text)}
                    </p>
                    <span className="mt-4">
                      <ArrowPill>{t("common.more")}</ArrowPill>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- popular */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t("home.popular.eyebrow")}
            title={t("home.popular.title")}
            text={t("home.popular.text")}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popularProducts.slice(0, 8).map((product, index) => (
              <Reveal key={product.slug} delay={index * 0.03}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- industries */}
      <section className="bg-sand py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t("home.industries.eyebrow")}
            title={t("home.industries.title")}
            text={t("home.industries.text")}
            action={
              <ButtonLink href="/industries" variant="ghost">
                {t("nav.industries")}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            }
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <Reveal key={industry.slug} delay={index * 0.04}>
                <Link
                  href="/industries"
                  className="group relative block h-64 overflow-hidden rounded-2xl bg-ink"
                >
                  <Image
                    src={industry.image}
                    alt={tr(industry.title)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-70"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-flame text-white">
                      <industry.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-black uppercase leading-tight tracking-tight text-white">
                      {tr(industry.title)}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-300">
                      {tr(industry.text)}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- process */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <Reveal className="relative">
            <div className="absolute -bottom-6 -left-6 h-32 w-32 bg-flame/15 wedge" aria-hidden />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200">
              <Image
                src={siteImages.drawings}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Eyebrow>{t("home.process.eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-3xl font-black uppercase leading-[1.05] tracking-tight text-ink sm:text-4xl">
              {t("home.process.title")}
            </h2>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.05}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-sand p-6">
                    <span className="text-2xl font-black text-flame">
                      0{index + 1}
                    </span>
                    <h3 className="mt-3 text-base font-black uppercase tracking-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-steel">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
