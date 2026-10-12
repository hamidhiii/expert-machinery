"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRequestModal } from "@/components/request-modal";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { pluralItems, useLanguage } from "@/lib/i18n";
import { useSiteData } from "@/lib/site-data";

/** 404: explains what happened and offers the ways back into the site. */
export function NotFoundView() {
  const { locale, t, tr } = useLanguage();
  const { open } = useRequestModal();
  const { groups } = useSiteData();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink">
        {/* Oversized outline numerals as the backdrop. */}
        <p
          aria-hidden
          className="pointer-events-none absolute -right-6 bottom-0 select-none text-[160px] font-bold leading-none tracking-display text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)] sm:text-[260px] lg:text-[380px] 2xl:text-[460px]"
        >
          404
        </p>

        <div className="relative mx-auto max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40 2xl:px-12">
          <Eyebrow>{t("notFound.eyebrow")}</Eyebrow>
          <h1 className="display mt-5 max-w-2xl text-4xl text-white sm:text-5xl lg:text-[64px]">
            {t("notFound.title")}
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-8 text-white/70">{t("notFound.text")}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/">{t("notFound.home")}</ButtonLink>
            <ButtonLink href="/catalog" variant="outline-light">
              {t("common.viewCatalog")}
            </ButtonLink>
            <button
              type="button"
              onClick={() => open()}
              className="inline-flex h-12 items-center px-2 text-sm font-semibold text-white/70 underline-offset-4 transition hover:text-white hover:underline"
            >
              {t("common.request")}
            </button>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-20">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-4 sm:px-6 lg:px-8 2xl:px-12">
          <p className="eyebrow text-flame">{t("notFound.groups")}</p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <Link
                key={group.key}
                href={`/catalog/${group.key}`}
                className="group flex items-center justify-between gap-4 bg-white px-6 py-5 transition hover:bg-surface"
              >
                <span>
                  <span className="block font-semibold tracking-display text-ink">{tr(group.title)}</span>
                  <span className="mt-1 block text-xs text-muted">
                    {group.count ? `${group.count} ${pluralItems(locale, group.count)}` : t("catalog.group.soon")}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-flame" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
