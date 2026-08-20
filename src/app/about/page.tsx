"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Eyebrow, PageHero, Reveal, SectionHeading } from "@/components/ui";
import { company, industries, products, siteImages } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

export default function AboutPage() {
  const { t, tr } = useLanguage();

  const cards = [
    { title: t("about.card1.title"), text: t("about.card1.text") },
    { title: t("about.card2.title"), text: t("about.card2.text") },
    { title: t("about.card3.title"), text: t("about.card3.text") },
    { title: t("about.card4.title"), text: t("about.card4.text") },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("about.hero.eyebrow")}
        title={t("about.hero.title")}
        text={t("about.hero.text")}
        image={siteImages.meeting}
        stats={[
          { value: `${products.length}`, label: t("home.stats.items") },
          { value: "9", label: t("home.stats.series") },
          { value: `${industries.length}`, label: t("home.stats.industries") },
          { value: "24ч", label: t("home.stats.response") },
        ]}
      />

      <section className="blueprint py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t("about.hero.eyebrow")} title={t("about.values.title")} />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.05}>
                <article className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                  <span className="text-3xl font-black text-flame">0{index + 1}</span>
                  <h3 className="mt-4 text-base font-black uppercase leading-tight tracking-tight text-ink">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-steel">{card.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <Reveal className="relative">
            <div className="absolute -bottom-6 -left-6 h-32 w-32 bg-flame/15 wedge" aria-hidden />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200">
              <Image
                src={siteImages.line}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Eyebrow>{company.name}</Eyebrow>
            <h2 className="mt-4 text-3xl font-black uppercase leading-[1.05] tracking-tight text-ink sm:text-4xl">
              {company.legalName}
            </h2>
            <p className="mt-5 text-base leading-8 text-steel">{t("footer.about")}</p>

            <div className="mt-8 grid gap-3">
              <Link
                href={company.phoneHref}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-sand px-5 py-4 transition hover:border-flame"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-flame text-white">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                    {t("contacts.phone")}
                  </span>
                  <span className="block text-base font-black text-ink">{company.phone}</span>
                </span>
              </Link>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-sand px-5 py-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-white">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                    {t("contacts.address")}
                  </span>
                  <span className="block text-base font-black text-ink">{tr(company.address)}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
