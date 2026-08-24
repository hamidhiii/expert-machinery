"use client";

import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { company } from "@/lib/catalog";
import { ButtonLink, Eyebrow, Reveal } from "@/components/ui";
import { useRequestModal } from "@/components/request-modal";
import { useLanguage } from "@/lib/i18n";

export function CtaBand() {
  const { t } = useLanguage();
  const { open } = useRequestModal();

  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:px-8">
        <Reveal>
          <Eyebrow>{company.name}</Eyebrow>
          <h2 className="display mt-5 max-w-2xl text-4xl sm:text-5xl">{t("home.cta.title")}</h2>
          <p className="mt-6 max-w-xl text-[15px] leading-8 text-muted">{t("home.cta.text")}</p>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-wrap items-center gap-3 lg:justify-end">
          <ButtonLink onClick={() => open()}>{t("common.request")}</ButtonLink>
          <Link
            href={company.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center gap-2.5 rounded-lg border border-ink/20 px-6 text-sm font-semibold text-ink transition hover:border-ink"
          >
            <MessageCircle className="h-4 w-4 text-flame" />
            WhatsApp
          </Link>
          <Link
            href={company.phoneHref}
            className="inline-flex h-12 items-center gap-2.5 rounded-lg border border-ink/20 px-6 text-sm font-semibold text-ink transition hover:border-ink"
          >
            <Phone className="h-4 w-4 text-flame" />
            {company.phone}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
