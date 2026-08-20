"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Send } from "lucide-react";
import { company, siteImages } from "@/lib/catalog";
import { RequestForm } from "@/components/request-form";
import { Eyebrow, Reveal } from "@/components/ui";
import { useLanguage } from "@/lib/i18n";

export function CtaBand() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white">
      <Image src={siteImages.texture} alt="" fill sizes="100vw" className="object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-ink-700/90" aria-hidden />
      <div className="blueprint-dark absolute inset-0 opacity-40" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <Reveal>
          <Eyebrow>{company.name}</Eyebrow>
          <h2 className="mt-5 text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-4xl lg:text-[44px]">
            {t("home.cta.title")}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">{t("home.cta.text")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={company.phoneHref}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-flame px-6 text-sm font-black uppercase tracking-wide transition hover:bg-flame-dark"
            >
              <Phone className="h-4 w-4" />
              {company.phone}
            </Link>
            <Link
              href={company.telegramHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-6 text-sm font-black uppercase tracking-wide transition hover:bg-white/10"
            >
              <Send className="h-4 w-4" />
              {t("common.telegram")}
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <RequestForm />
        </Reveal>
      </div>
    </section>
  );
}
