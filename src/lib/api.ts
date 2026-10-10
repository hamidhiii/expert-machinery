import { cache } from "react";
import {
  advantages as fallbackAdvantages,
  categoryLabels as fallbackCategoryLabels,
  company as fallbackCompany,
  companyStats as fallbackStats,
  groups as fallbackGroups,
  heroSlides as fallbackHeroSlides,
  industries as fallbackIndustries,
  productBrand,
  productGroup,
  products as fallbackProducts,
  services as fallbackServices,
  type Company,
  type Feature,
  type Group,
  type HeroSlide,
  type Industry,
  type LeadContext,
  type Product,
  type SiteData,
  type Stat,
} from "@/lib/catalog";
import type { Localized } from "@/lib/i18n";

/**
 * Admin API (Django REST, schema at /swagger). Everything is public GET except
 * POST /leads/. Responses are cached by Next and refreshed every REVALIDATE
 * seconds, so admin edits reach the site within a few minutes without a deploy.
 */
export const API_URL = (process.env.API_URL ?? "https://api.expertmachinery.kz").replace(/\/$/, "");

const REVALIDATE = 300;

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}/api/v1/${path}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE },
  });
  if (!response.ok) {
    throw new Error(`GET ${path} → ${response.status}`);
  }
  return response.json() as Promise<T>;
}

/** A failed endpoint falls back to the built-in copy instead of breaking the page. */
async function withFallback<T>(label: string, load: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await load();
  } catch (error) {
    console.error(`[api] ${label} unavailable, using built-in data:`, error);
    return fallback;
  }
}

/* ------------------------------------------------------------- API shapes */

type Row = Record<string, unknown>;

type ApiCompany = {
  name: string;
  address: string;
  address_en: string;
  address_kk: string;
  phone: string;
  email: string;
  instagram_url: string;
  whatsapp_url: string;
};

type ApiProduct = Row & {
  id: number;
  slug: string;
  code: string;
  category: string;
  group: string;
  brand: string;
  is_popular: boolean;
  main_image: string | null;
  params: Row[];
  cross_refs: Row[];
  properties: (Row & { method: string })[];
  advantages: Row[];
  notes: Row[];
  approvals: Row[];
};

type ApiProductDetail = ApiProduct & {
  series: { id: number } | null;
};

type ApiEquipmentType = Row & {
  id: number;
  slug: string;
  image: string | null;
  categories: string[];
  order: number;
};

type ApiBrand = { id: number; name: string };

type Page<T> = { count: number; next: string | null; results: T[] };

/* ---------------------------------------------------------------- mapping */

function text(row: Row, field: string): string {
  const value = row[field];
  return typeof value === "string" ? value.trim() : "";
}

/** `name_ru / name_en / name_kk` → Localized; empty translations fall back to RU. */
function loc(row: Row, prefix: string): Localized {
  const ru = text(row, `${prefix}_ru`);
  return {
    ru,
    en: text(row, `${prefix}_en`) || ru,
    kk: text(row, `${prefix}_kk`) || undefined,
  };
}

function optionalLoc(row: Row, prefix: string): Localized | undefined {
  const value = loc(row, prefix);
  return value.ru || value.en ? value : undefined;
}

function byOrder<T extends Row>(rows: T[]): T[] {
  return [...rows].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
}

function mapProduct(row: ApiProduct): Product {
  const optionalList = <T,>(list: T[]) => (list.length ? list : undefined);

  return {
    id: row.id,
    slug: row.slug,
    code: row.code,
    title: loc(row, "name"),
    category: row.category,
    group: row.group,
    brand: row.brand,
    popular: row.is_popular,
    image: row.main_image ?? "",
    specs: row.params.map((spec) => ({ label: loc(spec, "label"), value: loc(spec, "value") })),
    summary: loc(row, "short_description"),
    subtitle: optionalLoc(row, "subtitle"),
    usage: optionalLoc(row, "usage"),
    highlights: optionalList(row.advantages.map((item) => loc(item, "value"))),
    notes: optionalList(row.notes.map((item) => loc(item, "value"))),
    crossRef: optionalList(
      row.cross_refs.map((ref) => ({ label: loc(ref, "label"), value: text(ref, "value_ru") })),
    ),
    properties: optionalList(
      row.properties.map((item) => ({
        label: loc(item, "label"),
        value: loc(item, "value"),
        method: item.method,
      })),
    ),
    approvals: optionalList(row.approvals.map((item) => loc(item, "value"))),
  };
}

function mapCompany(row: ApiCompany): Company {
  const phoneDigits = row.phone.replace(/\D/g, "");
  return {
    ...fallbackCompany,
    legalName: row.name || fallbackCompany.legalName,
    address: {
      ru: row.address || fallbackCompany.address.ru,
      en: row.address_en || row.address || fallbackCompany.address.en,
      kk: row.address_kk || undefined,
    },
    phone: row.phone || fallbackCompany.phone,
    phoneHref: phoneDigits ? `tel:+${phoneDigits}` : fallbackCompany.phoneHref,
    whatsappHref: row.whatsapp_url || fallbackCompany.whatsappHref,
    instagramHref: row.instagram_url || fallbackCompany.instagramHref,
    email: row.email || fallbackCompany.email,
  };
}

/* ---------------------------------------------------------------- loaders */

const fallbackCatalog: Product[] = fallbackProducts.map((product) => ({
  ...product,
  group: productGroup(product),
  brand: productBrand(product),
}));

/** Every product, in admin order. Server-only: pages pass on just what they show. */
export const getProducts = cache(() =>
  withFallback(
    "products",
    async () => {
      const page = await get<Page<ApiProduct>>("products/?page_size=1000");
      return page.results.map(mapProduct);
    },
    fallbackCatalog,
  ),
);

const getEquipmentTypes = cache(() =>
  withFallback("equipment-types", () => get<ApiEquipmentType[]>("equipment-types/"), null),
);

const getBrands = cache(() => withFallback("brands", () => get<ApiBrand[]>("brands/"), null));

export const getSiteData = cache(async (): Promise<SiteData> => {
  const [
    products,
    equipmentTypes,
    company,
    stats,
    heroSlides,
    categoryLabels,
    industries,
    features,
    strings,
  ] = await Promise.all([
    getProducts(),
    getEquipmentTypes(),
    withFallback("company", async () => mapCompany(await get<ApiCompany>("company/")), fallbackCompany),
    withFallback(
      "stats",
      async () =>
        byOrder(await get<Row[]>("stats/")).map(
          (row): Stat => ({ value: text(row, "value"), label: loc(row, "label") }),
        ),
      fallbackStats,
    ),
    withFallback(
      "hero-slides",
      async () => {
        const slides = byOrder(await get<Row[]>("hero-slides/")).map(
          (row): HeroSlide => ({
            image: text(row, "image"),
            title: loc(row, "title"),
            text: loc(row, "text"),
          }),
        );
        // The hero cannot render without a slide.
        return slides.length ? slides : fallbackHeroSlides;
      },
      fallbackHeroSlides,
    ),
    withFallback(
      "categories",
      async () => ({
        all: fallbackCategoryLabels.all,
        ...Object.fromEntries(
          (await get<Row[]>("categories/")).map((row) => [text(row, "slug"), loc(row, "name")]),
        ),
      }),
      fallbackCategoryLabels as Record<string, Localized>,
    ),
    withFallback(
      "industries",
      async () =>
        byOrder(await get<Row[]>("industries/")).map(
          (row): Industry => ({
            slug: text(row, "slug"),
            icon: text(row, "icon_name"),
            image: text(row, "image"),
            title: loc(row, "name"),
            text: loc(row, "description"),
          }),
        ),
      fallbackIndustries,
    ),
    withFallback(
      "features",
      async () => {
        const rows = byOrder(await get<Row[]>("features/"));
        const pick = (section: string) =>
          rows
            .filter((row) => row.section === section)
            .map(
              (row): Feature => ({
                icon: text(row, "icon_name"),
                title: loc(row, "title"),
                text: loc(row, "description"),
              }),
            );
        return { advantages: pick("home"), services: pick("service") };
      },
      { advantages: fallbackAdvantages, services: fallbackServices },
    ),
    withFallback<SiteData["strings"]>(
      "ui-strings",
      async () => {
        const rows = await get<Row[]>("ui-strings/");
        const byLocale = (field: string) =>
          Object.fromEntries(
            rows.map((row) => [text(row, "key"), text(row, field)]).filter(([, value]) => value),
          );
        return { ru: byLocale("value_ru"), kk: byLocale("value_kk"), en: byLocale("value_en") };
      },
      {},
    ),
  ]);

  const groups: Group[] = equipmentTypes
    ? byOrder(equipmentTypes).map((row) => ({
        key: row.slug,
        title: loc(row, "name"),
        text: loc(row, "description"),
        image:
          row.image ?? fallbackGroups.find((group) => group.key === row.slug)?.image ?? "",
        categories: row.categories,
      }))
    : fallbackGroups;

  return {
    company,
    stats,
    heroSlides,
    groups: groups.map((group) => ({
      ...group,
      count: products.filter((product) => productGroup(product) === group.key).length,
    })),
    categoryLabels,
    industries,
    advantages: features.advantages,
    services: features.services,
    totalProducts: products.length,
    strings,
  };
});

export const getLeadContext = cache(async (product: Product): Promise<LeadContext> => {
  const [detail, equipmentTypes, brands] = await Promise.all([
    withFallback(
      `products/${product.slug}`,
      () => get<ApiProductDetail>(`products/${encodeURIComponent(product.slug)}/`),
      null,
    ),
    getEquipmentTypes(),
    getBrands(),
  ]);

  return {
    series: detail?.series?.id,
    brand: brands?.find((brand) => brand.name === productBrand(product))?.id,
    productType: equipmentTypes?.find((type) => type.slug === productGroup(product))?.id,
  };
});
