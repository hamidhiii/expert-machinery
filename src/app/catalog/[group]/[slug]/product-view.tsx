"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Phone } from "lucide-react";
import {
  categoryLabels,
  company,
  getGroup,
  productBrand,
  productGroup,
  relatedProducts,
  type Product,
} from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { useRequestModal } from "@/components/request-modal";
import { Breadcrumbs, ButtonLink, Eyebrow, Reveal, SectionHeading } from "@/components/ui";
import { useLanguage } from "@/lib/i18n";

export function ProductView({ product }: { product: Product }) {
  const { t, tr } = useLanguage();
  const { open } = useRequestModal();
  const related = relatedProducts(product);
  const group = getGroup(productGroup(product))!;

  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: t("common.home"), href: "/" },
              { label: t("nav.catalog"), href: "/catalog" },
              { label: tr(group.title), href: `/catalog/${group.key}` },
              { label: tr(product.title) },
            ]}
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white">
                <Image
                  src={product.image}
                  alt={tr(product.title)}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-12"
                />
                <span className="absolute left-6 top-6 rounded-md bg-ink/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                  {tr(categoryLabels[product.category])}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <Eyebrow>{productBrand(product)}</Eyebrow>
              <h1 className="display mt-5 text-4xl sm:text-5xl">{tr(product.title)}</h1>
              <p className="mt-3 text-sm font-medium text-muted">{product.code}</p>
              <p className="mt-6 text-[15px] leading-8 text-muted">{tr(product.summary)}</p>

              <dl className="mt-8 border-t border-line">
                <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <dt className="text-sm text-muted">{t("product.usage")}</dt>
                  <dd className="text-right text-sm font-semibold text-ink">{tr(product.usage)}</dd>
                </div>
                {product.specs.map((spec) => (
                  <div
                    key={tr(spec.label)}
                    className="flex items-baseline justify-between gap-6 border-b border-line py-4"
                  >
                    <dt className="text-sm text-muted">{tr(spec.label)}</dt>
                    <dd className="text-right text-sm font-semibold text-ink">{tr(spec.value)}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink onClick={() => open(`${product.code} — ${tr(product.title)}`)}>
                  {t("product.requestPrice")}
                </ButtonLink>
                <Link
                  href={company.phoneHref}
                  className="inline-flex h-12 items-center gap-2.5 rounded-lg border border-ink/20 px-6 text-sm font-semibold text-ink transition hover:border-ink"
                >
                  <Phone className="h-4 w-4 text-flame" />
                  {company.phone}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* advantages + what to send */}
      <section className="border-t border-line bg-paper py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Eyebrow index="01">Advantages</Eyebrow>
            <h2 className="display mt-5 text-3xl sm:text-4xl">{t("product.advantages")}</h2>
            <ul className="mt-8 grid gap-3">
              {product.highlights.map((highlight) => (
                <li
                  key={tr(highlight)}
                  className="flex items-start gap-3 rounded-xl bg-white px-5 py-4 text-sm font-medium text-ink"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-flame" />
                  {tr(highlight)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Eyebrow index="02">Request</Eyebrow>
            <h2 className="display mt-5 text-3xl sm:text-4xl">{t("product.whatToSend.title")}</h2>
            <p className="mt-6 text-[15px] leading-8 text-muted">{t("product.whatToSend.text")}</p>
            <div className="mt-8">
              <ButtonLink onClick={() => open(`${product.code} — ${tr(product.title)}`)}>
                {t("common.request")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* related */}
      <section className="border-t border-line bg-paper py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading index="03" eyebrow="Related / equipment" title={t("product.related")} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
