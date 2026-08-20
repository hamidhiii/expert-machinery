"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  categories,
  categoryLabels,
  countByCategory,
  products,
  type CategoryKey,
} from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { useLanguage } from "@/lib/i18n";

export function CatalogExplorer({ initialCategory = "all" }: { initialCategory?: CategoryKey }) {
  const { locale, t, tr } = useLanguage();
  const [category, setCategory] = useState<CategoryKey>(initialCategory);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return products.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (!needle) return true;

      const haystack = [
        product.code,
        product.title.ru,
        product.title.en,
        product.usage.ru,
        product.usage.en,
        product.summary.ru,
        product.summary.en,
        ...product.specs.flatMap((spec) => [spec.value.ru, spec.value.en]),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [category, query]);

  return (
    <div>
      <div className="sticky top-[76px] z-30 -mx-4 border-b border-slate-200 bg-sand/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("catalog.search")}
              className="h-12 w-full rounded-full border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-ink outline-none transition placeholder:text-slate-400 focus:border-flame"
            />
          </label>

          <div className="flex items-center gap-2 text-sm font-black text-ink">
            <SlidersHorizontal className="h-4 w-4 text-flame" />
            {t("catalog.found")}: <span className="text-flame">{filtered.length}</span>
          </div>
        </div>

        <div className="scroll-thin mt-4 flex gap-2 overflow-x-auto pb-1">
          {categories.map((key) => {
            const active = key === category;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setCategory(key)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition ${
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-ink/30 hover:text-ink"
                }`}
              >
                {tr(categoryLabels[key])}
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-black ${
                    active ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {countByCategory(key)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={`${locale}-${product.slug}`} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-xl font-black text-ink">{t("catalog.empty.title")}</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-steel">
            {t("catalog.empty.text")}
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="mt-6 inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-black text-white"
          >
            {t("catalog.reset")}
          </button>
        </div>
      )}
    </div>
  );
}
