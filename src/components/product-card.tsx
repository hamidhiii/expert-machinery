"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryLabels, type Product } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

export function ProductCard({ product }: { product: Product }) {
  const { t, tr } = useLanguage();

  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-ink/20 hover:shadow-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        <Image
          src={product.image}
          alt={tr(product.title)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink/90 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white">
          {product.code}
        </span>
      </div>

      <div className="flex flex-1 flex-col border-t border-slate-100 p-5">
        <span className="text-[11px] font-black uppercase tracking-[0.18em] text-flame">
          {tr(categoryLabels[product.category])}
        </span>
        <h3 className="mt-2 text-base font-black leading-snug text-ink">{tr(product.title)}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-steel">{tr(product.usage)}</p>

        <div className="mt-4 grid gap-1.5 border-t border-dashed border-slate-200 pt-4">
          {product.specs.slice(0, 3).map((spec) => (
            <div key={tr(spec.label)} className="flex items-baseline justify-between gap-3 text-xs">
              <span className="font-semibold text-slate-400">{tr(spec.label)}</span>
              <span className="text-right font-black text-ink">{tr(spec.value)}</span>
            </div>
          ))}
        </div>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-black text-ink transition group-hover:text-flame">
          {t("common.more")}
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
