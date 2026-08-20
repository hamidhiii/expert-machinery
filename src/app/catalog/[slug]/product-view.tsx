"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Phone, Send } from "lucide-react";
import {
  categoryLabels,
  company,
  relatedProducts,
  type Product,
} from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { RequestForm } from "@/components/request-form";
import { Eyebrow, Reveal, SectionHeading } from "@/components/ui";
import { useLanguage } from "@/lib/i18n";

export function ProductView({ product }: { product: Product }) {
  const { t, tr } = useLanguage();
  const related = relatedProducts(product);

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-sm font-black text-steel transition hover:text-flame"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("product.back")}
          </Link>
        </div>
      </section>

      <section className="blueprint py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          {/* gallery */}
          <Reveal className="relative">
            <div className="absolute -left-4 -top-4 h-20 w-20 bg-flame wedge-tl" aria-hidden />
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="relative aspect-[4/3]">
                <Image
                  src={product.image}
                  alt={tr(product.title)}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain p-10"
                />
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
                <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white">
                  {product.code}
                </span>
                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-flame">
                  {tr(categoryLabels[product.category])}
                </span>
              </div>
            </div>
          </Reveal>

          {/* summary */}
          <Reveal delay={0.08}>
            <Eyebrow>{tr(categoryLabels[product.category])}</Eyebrow>
            <h1 className="mt-4 text-3xl font-black uppercase leading-[1.05] tracking-tight text-ink sm:text-4xl">
              {tr(product.title)}
            </h1>
            <p className="mt-5 text-base leading-8 text-steel">{tr(product.summary)}</p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                {t("product.usage")}
              </p>
              <p className="mt-2 text-sm font-bold text-ink">{tr(product.usage)}</p>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <p className="border-b border-slate-100 px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                {t("product.specs")}
              </p>
              <dl className="divide-y divide-slate-100">
                {product.specs.map((spec) => (
                  <div
                    key={tr(spec.label)}
                    className="flex items-baseline justify-between gap-6 px-5 py-3.5"
                  >
                    <dt className="text-sm font-semibold text-steel">{tr(spec.label)}</dt>
                    <dd className="text-right text-sm font-black text-ink">{tr(spec.value)}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                {t("product.advantages")}
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {product.highlights.map((highlight) => (
                  <li
                    key={tr(highlight)}
                    className="flex items-start gap-2.5 rounded-xl bg-white px-4 py-3 text-sm font-bold text-ink ring-1 ring-slate-200"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-flame" />
                    {tr(highlight)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={company.phoneHref}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-flame px-6 text-sm font-black uppercase tracking-wide text-white transition hover:bg-flame-dark"
              >
                <Phone className="h-4 w-4" />
                {t("product.requestPrice")}
              </Link>
              <Link
                href={company.telegramHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-slate-300 px-6 text-sm font-black uppercase tracking-wide text-ink transition hover:border-ink"
              >
                <Send className="h-4 w-4" />
                Telegram
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* request */}
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <Eyebrow>{t("form.title")}</Eyebrow>
            <h2 className="mt-4 text-2xl font-black uppercase leading-tight tracking-tight text-ink sm:text-3xl">
              {t("product.whatToSend.title")}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-steel">
              {t("product.whatToSend.text")}
            </p>
          </div>
          <RequestForm defaultType={`${product.code} — ${tr(product.title)}`} />
        </div>
      </section>

      {/* related */}
      <section className="bg-sand py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t("product.related")} />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
