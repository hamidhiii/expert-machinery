"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Eyebrow, InnerHero, Reveal, SectionHeading, StatsBand } from "@/components/ui";
import { siteImages } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";
import { useSiteData } from "@/lib/site-data";

export default function AboutPage() {
  const { t, tr } = useLanguage();
  const { company, stats } = useSiteData();

  const cards = [
    { title: t("about.card1.title"), text: t("about.card1.text") },
    { title: t("about.card2.title"), text: t("about.card2.text") },
    { title: t("about.card3.title"), text: t("about.card3.text") },
    { title: t("about.card4.title"), text: t("about.card4.text") },
  ];

  const contacts = [
    { icon: Phone, label: t("contacts.phone"), value: company.phone, href: company.phoneHref },
    { icon: Mail, label: t("contacts.email"), value: company.email, href: `mailto:${company.email}` },
    { icon: MapPin, label: t("contacts.address"), value: tr(company.address), href: undefined },
  ];

  return (
    <>
      <InnerHero
        breadcrumbs={[{ label: t("common.home"), href: "/" }, { label: t("nav.about") }]}
        eyebrow={`About ${company.name}`}
        title={t("about.hero.title")}
        text={t("about.hero.text")}
        image={siteImages.meeting}
      />

      <StatsBand stats={stats.map((stat) => ({ value: stat.value, label: tr(stat.label) }))} />

      <section className="bg-paper py-20 lg:py-24">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-4 sm:px-6 lg:px-8 2xl:px-12">
          <SectionHeading index="01" eyebrow="Values" title={t("about.values.title")} />

          <div className="mt-12 divide-y divide-line border-y border-line">
            {cards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.04}>
                <div className="grid gap-4 py-7 md:grid-cols-[60px_1fr_1.2fr] md:items-start md:gap-8">
                  <span className="text-xs font-semibold text-flame">0{index + 1}</span>
                  <h3 className="text-xl font-semibold tracking-display text-ink">{card.title}</h3>
                  <p className="text-sm leading-7 text-muted">{card.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 2xl:px-12">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
              <Image
                src="/expert-machinery-logo.jpg"
                alt={company.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-10 sm:p-14"
              />
            </div>
          </Reveal>

          <div>
            <Eyebrow index="02">Company</Eyebrow>
            <h2 className="display mt-5 text-3xl sm:text-4xl">{company.legalName}</h2>
            <p className="mt-6 text-[15px] leading-8 text-muted">{t("footer.about")}</p>

            <div className="mt-9 divide-y divide-line border-y border-line">
              {contacts.map((item) => {
                const content = (
                  <span className="flex items-center gap-4 py-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-flame-soft text-flame">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted">{item.label}</span>
                      <span className="block text-base font-semibold text-ink">{item.value}</span>
                    </span>
                  </span>
                );

                return item.href ? (
                  <Link key={item.label} href={item.href} className="block transition hover:text-flame">
                    {content}
                  </Link>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
