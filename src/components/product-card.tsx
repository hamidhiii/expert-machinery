"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { productHref, requestSubject, type Product } from "@/lib/catalog";
import { useRequestModal } from "@/components/request-modal";
import { useLanguage } from "@/lib/i18n";
import { useSiteData } from "@/lib/site-data";

export function ProductCard({ product }: { product: Product }) {
  const { t, tr } = useLanguage();
  const { open } = useRequestModal();
  const category = useSiteData().categoryLabels[product.category];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white transition hover:shadow-card">
      <Link href={productHref(product)} className="relative block aspect-[4/3] bg-surface/60">
        <Image
          src={product.image}
          alt={tr(product.title)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
          // Supplier photos come on white; multiply drops the white box onto the card tint.
          className="object-contain p-7 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
        {category ? (
          <span className="absolute left-4 top-4 rounded-md bg-ink/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            {tr(category)}
          </span>
        ) : null}
        <span className="absolute -bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-flame text-white shadow-card transition group-hover:bg-flame-dark">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6 pt-7">
        {product.code ? (
          <p className="text-[11px] font-medium lowercase tracking-wide text-muted/80">
            {product.code}
          </p>
        ) : null}

        <h3 className="mt-2 text-lg font-bold leading-snug tracking-display text-ink">
          <Link href={productHref(product)} className="transition hover:text-flame">
            {tr(product.title)}
          </Link>
        </h3>

        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
          {product.specs.slice(0, 3).map((spec) => (
            <span key={tr(spec.label)}>{tr(spec.value)}</span>
          ))}
        </p>

        <div className="mt-6 flex flex-1 items-end gap-5 border-t border-line pt-5">
          <Link
            href={productHref(product)}
            className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-flame"
          >
            {t("common.more")}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
          </Link>
          <button
            type="button"
            onClick={() => open(requestSubject(product, tr(product.title)))}
            className="text-sm font-medium text-muted transition hover:text-ink"
          >
            {t("common.request")}
          </button>
        </div>
      </div>
    </article>
  );
}
