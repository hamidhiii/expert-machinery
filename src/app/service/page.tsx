"use client";

import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { ButtonLink, Eyebrow, InnerHero, Reveal, SectionHeading } from "@/components/ui";
import { useRequestModal } from "@/components/request-modal";
import { services, siteImages } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

export default function ServicePage() {
  const { t, tr } = useLanguage();
  const { open } = useRequestModal();

  const steps = [
    { title: t("home.process.step1.title"), text: t("home.process.step1.text") },
    { title: t("home.process.step2.title"), text: t("home.process.step2.text") },
    { title: t("home.process.step3.title"), text: t("home.process.step3.text") },
    { title: t("home.process.step4.title"), text: t("home.process.step4.text") },
  ];

  return (
    <>
      <InnerHero
        breadcrumbs={[{ label: t("common.home"), href: "/" }, { label: t("nav.service") }]}
        eyebrow="Service / engineering"
        title={t("service.hero.title")}
        text={t("service.hero.text")}
        image={siteImages.welding}
        action={<ButtonLink onClick={() => open()}>{t("common.request")}</ButtonLink>}
      />

      <section className="bg-cream py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading index="01" eyebrow="Capabilities" title={t("service.hero.eyebrow")} />

          <div className="mt-12 divide-y divide-line border-y border-line">
            {services.map((service, index) => (
              <Reveal key={tr(service.title)} delay={index * 0.03}>
                <div className="grid gap-4 py-7 md:grid-cols-[60px_1fr_1.2fr] md:items-start md:gap-8">
                  <span className="text-xs font-semibold text-flame">0{index + 1}</span>
                  <h3 className="text-xl font-semibold tracking-display text-ink">
                    {tr(service.title)}
                  </h3>
                  <p className="text-sm leading-7 text-muted">{tr(service.text)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-white lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
          <div>
            <Eyebrow index="02">Process</Eyebrow>
            <h2 className="display mt-5 text-4xl sm:text-5xl">{t("home.process.title")}</h2>

            <ol className="mt-12 grid gap-px">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.05}>
                  <li className="flex gap-6 border-t border-white/10 py-6">
                    <span className="text-xs font-semibold text-flame">0{index + 1}</span>
                    <div>
                      <h3 className="text-lg font-semibold tracking-display">{step.title}</h3>
                      <p className="mt-2 max-w-lg text-sm leading-7 text-white/50">{step.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src={siteImages.drawings}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
