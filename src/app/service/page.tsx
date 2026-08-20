"use client";

import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { Eyebrow, PageHero, Reveal } from "@/components/ui";
import { services, siteImages } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

export default function ServicePage() {
  const { t, tr } = useLanguage();

  const steps = [
    { title: t("home.process.step1.title"), text: t("home.process.step1.text") },
    { title: t("home.process.step2.title"), text: t("home.process.step2.text") },
    { title: t("home.process.step3.title"), text: t("home.process.step3.text") },
    { title: t("home.process.step4.title"), text: t("home.process.step4.text") },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("service.hero.eyebrow")}
        title={t("service.hero.title")}
        text={t("service.hero.text")}
        image={siteImages.welding}
      />

      <section className="blueprint py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={tr(service.title)} delay={index * 0.04}>
                <article className="h-full rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-card">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-flame-soft text-flame">
                    <service.icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-5 text-base font-black uppercase leading-tight tracking-tight text-ink">
                    {tr(service.title)}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-steel">{tr(service.text)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
          <div>
            <Eyebrow>{t("home.process.eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-3xl font-black uppercase leading-[1.05] tracking-tight text-ink sm:text-4xl">
              {t("home.process.title")}
            </h2>
            <ol className="mt-10 grid gap-4">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.05}>
                  <li className="flex gap-5 rounded-2xl border border-slate-200 bg-sand p-5">
                    <span className="text-2xl font-black text-flame">0{index + 1}</span>
                    <div>
                      <h3 className="text-base font-black uppercase tracking-tight text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-6 text-steel">{step.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={0.1} className="relative">
            <div className="absolute -right-5 -top-5 h-28 w-28 bg-flame/20 wedge" aria-hidden />
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-slate-200">
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
