"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import {
  brands,
  categories,
  categoryLabels,
  countByCategory,
  productBrand,
  products,
  type Brand,
  type CategoryKey,
} from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { useLanguage } from "@/lib/i18n";

type SortKey = "default" | "az" | "za";

function FilterGroup({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-line py-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left text-sm font-semibold text-ink"
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? <div className="mt-4 grid gap-2.5">{children}</div> : null}
    </div>
  );
}

export function CatalogExplorer() {
  const { locale, t, tr } = useLanguage();
  const [category, setCategory] = useState<CategoryKey>("all");
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("default");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const list = products.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (selectedBrands.length && !selectedBrands.includes(productBrand(product))) return false;
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

    if (sort === "default") return list;

    return [...list].sort((a, b) => {
      const result = tr(a.title).localeCompare(tr(b.title));
      return sort === "az" ? result : -result;
    });
  }, [category, selectedBrands, query, sort, tr]);

  function toggleBrand(brand: Brand) {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((item) => item !== brand) : [...prev, brand],
    );
  }

  return (
    <div>
      {/* search + quick category pills */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <label className="relative w-full lg:max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("catalog.search")}
            className="h-12 w-full rounded-lg border border-line bg-white pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-flame"
          />
        </label>

        <div className="scroll-thin flex gap-2 overflow-x-auto pb-1">
          {categories.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setCategory(key)}
              className={`shrink-0 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                category === key
                  ? "bg-flame text-white"
                  : "text-muted hover:bg-white hover:text-ink"
              }`}
            >
              {tr(categoryLabels[key])}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        {/* sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow text-flame">{t("catalog.filters")}</p>

          <div className="mt-6 border-t border-line">
            <FilterGroup title={t("catalog.filter.type")}>
              {categories.map((key) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-center justify-between gap-3 text-sm text-muted transition hover:text-ink"
                >
                  <span className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="category"
                      checked={category === key}
                      onChange={() => setCategory(key)}
                      className="h-3.5 w-3.5 accent-flame"
                    />
                    {tr(categoryLabels[key])}
                  </span>
                  <span className="text-xs text-muted/60">{countByCategory(key)}</span>
                </label>
              ))}
            </FilterGroup>

            <FilterGroup title={t("catalog.filter.brand")}>
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex cursor-pointer items-center justify-between gap-3 text-sm text-muted transition hover:text-ink"
                >
                  <span className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="h-3.5 w-3.5 accent-flame"
                    />
                    {brand}
                  </span>
                  <span className="text-xs text-muted/60">
                    {products.filter((product) => productBrand(product) === brand).length}
                  </span>
                </label>
              ))}
            </FilterGroup>
          </div>

          {(category !== "all" || selectedBrands.length || query) ? (
            <button
              type="button"
              onClick={() => {
                setCategory("all");
                setSelectedBrands([]);
                setQuery("");
              }}
              className="mt-6 text-sm font-semibold text-flame underline underline-offset-4"
            >
              {t("catalog.reset")}
            </button>
          ) : null}
        </aside>

        {/* results */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
            <p className="text-sm text-muted">
              <span className="font-semibold text-ink">{filtered.length}</span> {t("catalog.results")}
            </p>

            <label className="flex items-center gap-2 text-sm text-muted">
              {t("catalog.sort")}
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-ink outline-none focus:border-flame"
              >
                <option value="default">{t("catalog.sort.default")}</option>
                <option value="az">{t("catalog.sort.az")}</option>
                <option value="za">{t("catalog.sort.za")}</option>
              </select>
            </label>
          </div>

          {filtered.length ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={`${locale}-${product.slug}`} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl bg-white p-12 text-center">
              <p className="display text-2xl text-ink">{t("catalog.empty.title")}</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
                {t("catalog.empty.text")}
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                  setSelectedBrands([]);
                }}
                className="mt-7 inline-flex h-11 items-center rounded-lg bg-ink px-6 text-sm font-semibold text-white"
              >
                {t("catalog.reset")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
