import type { MetadataRoute } from "next";
import { getProductDates, getProducts, getSiteData } from "@/lib/api";
import { productHref } from "@/lib/catalog";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ groups }, products, dates] = await Promise.all([
    getSiteData(),
    getProducts(),
    getProductDates(),
  ]);

  const pages: [string, number][] = [
    ["", 1],
    ["/catalog", 0.9],
    ["/service", 0.7],
    ["/industries", 0.7],
    ["/about", 0.6],
    ["/contacts", 0.6],
  ];

  return [
    ...pages.map(([path, priority]) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "weekly" as const,
      priority,
    })),
    ...groups.map((group) => ({
      url: `${SITE_URL}/catalog/${group.key}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: `${SITE_URL}${productHref(product)}`,
      lastModified: dates[product.slug],
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
