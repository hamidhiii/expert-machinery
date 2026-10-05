"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  advantages,
  companyStats,
  groupProducts,
  groups,
  heroSlides,
  industries,
  type GroupKey,
} from "@/lib/catalog";
import { CtaBand } from "@/components/cta-band";
import { useRequestModal } from "@/components/request-modal";
import {
  ArrowLink,
  ButtonLink,
  Eyebrow,
  Reveal,
  SectionHeading,
  StatsBand,
} from "@/components/ui";
import { useLanguage } from "@/lib/i18n";

export default function HomePage() {
  const { t, tr } = useLanguage();
  const { open } = useRequestModal();
  const [slide, setSlide] = useState(0);
  const [activeGroup, setActiveGroup] = useState<GroupKey>("gear");
  const active = groups.find((group) => group.key === activeGroup)!;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  const stats = companyStats.map((stat) => ({ value: stat.value, label: t(stat.key) }));

  const current = heroSlides[slide];

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-ink lg:min-h-[680px] 2xl:min-h-[800px]">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={current.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" aria-hidden />

        <div className="relative mx-auto w-full max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-4 py-20 sm:px-6 lg:px-8 2xl:px-12">
          <Eyebrow>{t("home.hero.badge")}</Eyebrow>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="display mt-6 max-w-4xl text-[40px] text-white sm:text-6xl lg:text-[72px] 2xl:max-w-[52rem] 2xl:text-[88px]">
                {t(current.titleKey)}
              </h1>
              <p className="mt-7 max-w-xl text-[15px] leading-8 text-white/70 2xl:max-w-2xl 2xl:text-base 2xl:leading-8">
                {t(current.textKey)}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink onClick={() => open()}>{t("common.request")}</ButtonLink>
            <ButtonLink href="/catalog" variant="outline-light">
              {t("common.viewCatalog")}
            </ButtonLink>
          </div>

          <div className="mt-14 flex items-center gap-4">
            {heroSlides.map((item, index) => (
              <button
                key={item.titleKey}
                type="button"
                onClick={() => setSlide(index)}
                aria-label={`${index + 1}`}
                className={`text-xs font-semibold transition ${
                  index === slide ? "text-white" : "text-white/35 hover:text-white/70"
                }`}
              >
                0{index + 1}
                {index === slide ? (
                  <motion.span
                    layoutId="slide-underline"
                    className="mt-1.5 block h-px bg-flame"
                  />
                ) : (
                  <span className="mt-1.5 block h-px bg-transparent" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <StatsBand stats={stats} />

      {/* ------------------------------------------------------ categories */}
      <section className="bg-paper py-20 lg:py-24">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-4 sm:px-6 lg:px-8 2xl:px-12">
          <SectionHeading
            index="01"
            eyebrow="Catalog"
            title={t("home.categories.title")}
            text={t("home.categories.text")}
            action={<ArrowLink href="/catalog">{t("common.viewAll")}</ArrowLink>}
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <Reveal>
              <Link
                href={`/catalog/${active.key}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-ink"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.key}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                  >
                    <Image
                      src={active.image}
                      alt={tr(active.title)}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className={
                        active.categories.length
                          ? "bg-surface object-contain p-12"
                          : "object-cover opacity-70"
                      }
                    />
                  </motion.div>
                </AnimatePresence>

                <div
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="eyebrow text-flame">
                    {active.categories.length
                      ? `${groupProducts(active.key).length} ${t("home.categories.count")}`
                      : t("catalog.group.soon")}
                  </p>
                  <p className="display mt-3 text-3xl text-white">{tr(active.title)}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                    {t("common.more")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>

            <div className="divide-y divide-line border-y border-line">
              {groups.map((group, index) => (
                <Link
                  key={group.key}
                  href={`/catalog/${group.key}`}
                  onMouseEnter={() => setActiveGroup(group.key)}
                  onFocus={() => setActiveGroup(group.key)}
                  className={`group flex items-center gap-6 py-6 transition ${
                    activeGroup === group.key ? "text-ink" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  <span
                    className={`text-xs font-semibold transition ${
                      activeGroup === group.key ? "text-flame" : "text-muted/50"
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <span className="flex-1">
                    <span className="text-xl font-semibold tracking-display">{tr(group.title)}</span>
                    <span className="mt-1 block max-w-lg text-sm leading-6 text-muted">
                      {tr(group.text)}
                    </span>
                  </span>
                  <span className="hidden text-xs font-semibold text-muted/60 sm:block">
                    {group.categories.length ? groupProducts(group.key).length : "—"}
                  </span>
                  <ArrowRight
                    className={`h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 ${
                      activeGroup === group.key ? "text-flame" : "text-muted/50"
                    }`}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- why us */}
      <section className="bg-ink py-20 text-white lg:py-24">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-4 sm:px-6 lg:px-8 2xl:px-12">
          <Eyebrow index="02">Engineering</Eyebrow>
          <h2 className="display mt-5 text-4xl sm:text-5xl">{t("home.why.title")}</h2>
          <p className="display mt-3 text-4xl text-white/25 sm:text-5xl">{t("home.why.display")}</p>

          <div className="mt-16 grid gap-x-16 gap-y-px lg:grid-cols-2">
            {advantages.map((item, index) => (
              <Reveal key={tr(item.title)} delay={(index % 2) * 0.05}>
                <div className="flex gap-6 border-t border-white/10 py-7">
                  <span className="text-xs font-semibold text-flame">0{index + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-display text-white">
                      {tr(item.title)}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-7 text-white/50">{tr(item.text)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14">
            <ButtonLink href="/service" variant="outline-light">
              {t("nav.service")}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ industries */}
      <section className="bg-paper py-20 lg:py-24">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-4 sm:px-6 lg:px-8 2xl:px-12">
          <SectionHeading
            index="03"
            eyebrow="Industries"
            title={t("home.industries.title")}
            text={t("home.industries.text")}
            action={<ArrowLink href="/industries">{t("common.viewAll")}</ArrowLink>}
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <Reveal key={industry.slug} delay={index * 0.04}>
                <Link
                  href="/industries"
                  className="group relative block h-72 overflow-hidden rounded-2xl bg-ink"
                >
                  <Image
                    src={industry.image}
                    alt={tr(industry.title)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-85"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent"
                    aria-hidden
                  />
                  <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition group-hover:bg-flame">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <h3 className="text-xl font-semibold tracking-display text-white">
                      {tr(industry.title)}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/60">
                      {tr(industry.text)}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
