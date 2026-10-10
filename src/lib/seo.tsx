import type { Metadata } from "next";

/**
 * Canonical origin. expertmachinery.kz and http:// already 308 to it, and
 * canonical tags point the Vercel preview domains here too.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.expertmachinery.kz").replace(
  /\/$/,
  "",
);

export const SITE_NAME = "Expert Machinery Казахстан";

/** Search snippets are capped around 160 characters; cut on a word boundary. */
export function snippet(text: string, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, clean.lastIndexOf(" ", max - 1))}…`;
}

/**
 * Per-page metadata with canonical URL and Open Graph. A segment's openGraph
 * replaces the parent's entirely, so every page repeats the shared fields.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description: snippet(description),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ru_KZ",
      siteName: SITE_NAME,
      url: path,
      title,
      description: snippet(description, 200),
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}

/** JSON-LD for a breadcrumb trail; items are [name, path]. */
export function breadcrumbLd(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe once "<" is escaped (no closing </script>).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
