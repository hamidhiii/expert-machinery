"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Check, Info, Phone } from "lucide-react";
import {
  getGroup,
  productBrand,
  productGroup,
  requestSubject,
  type LeadContext,
  type Product,
} from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { useRequestModal } from "@/components/request-modal";
import { Breadcrumbs, ButtonLink, Eyebrow, Reveal, SectionHeading } from "@/components/ui";
import { useLanguage, type TranslationKey } from "@/lib/i18n";
import { useSiteData } from "@/lib/site-data";

const whatToSendKey: Record<string, TranslationKey> = {
  filters: "product.whatToSend.filters",
  oils: "product.whatToSend.oils",
};

function DetailBlock({ index, eyebrow, title, children }: {
  index: number;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Eyebrow index={String(index).padStart(2, "0")}>{eyebrow}</Eyebrow>
      <h2 className="display mt-5 text-3xl sm:text-4xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export function ProductView({
  product,
  related,
  lead,
}: {
  product: Product;
  related: Product[];
  lead: LeadContext;
}) {
  const { t, tr } = useLanguage();
  const { open } = useRequestModal();
  const { categoryLabels, company, groups } = useSiteData();
  const group = getGroup(groups, productGroup(product))!;
  const category = categoryLabels[product.category];
  const request = () => open(requestSubject(product, tr(product.title)), lead);

  let index = 0;
  const next = () => ++index;

  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-4 pb-16 pt-8 sm:px-6 lg:px-8 2xl:px-12">
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
                {category ? (
                  <span className="absolute left-6 top-6 rounded-md bg-ink/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    {tr(category)}
                  </span>
                ) : null}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <Eyebrow>{productBrand(product)}</Eyebrow>
              <h1 className="display mt-5 text-4xl sm:text-5xl">{tr(product.title)}</h1>
              {product.subtitle ? (
                <p className="mt-4 text-base font-semibold text-ink/80">{tr(product.subtitle)}</p>
              ) : null}
              {product.code ? (
                <p className="mt-3 text-sm font-medium text-muted">{product.code}</p>
              ) : null}
              <p className="mt-6 text-[15px] leading-8 text-muted">{tr(product.summary)}</p>

              <dl className="mt-8 border-t border-line">
                {product.usage ? (
                  <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                    <dt className="text-sm text-muted">{t("product.usage")}</dt>
                    <dd className="text-right text-sm font-semibold text-ink">{tr(product.usage)}</dd>
                  </div>
                ) : null}
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
                <ButtonLink onClick={request}>{t("product.requestPrice")}</ButtonLink>
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

      {product.properties?.length ? (
        <section className="border-t border-line bg-paper py-20">
          <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-4 sm:px-6 lg:px-8 2xl:px-12">
            <DetailBlock index={next()} eyebrow="Properties" title={t("product.properties")}>
              <p className="-mt-3 mb-6 text-sm text-muted">{t("product.propertiesNote")}</p>
              <div className="scroll-thin overflow-x-auto rounded-2xl border border-line">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
                    <tr>
                      <th className="px-5 py-3 font-semibold">{t("product.properties.indicator")}</th>
                      <th className="px-5 py-3 font-semibold">{t("product.properties.value")}</th>
                      <th className="px-5 py-3 font-semibold">{t("product.properties.method")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {product.properties.map((row) => (
                      <tr key={tr(row.label)}>
                        <td className="px-5 py-3.5 text-muted">{tr(row.label)}</td>
                        <td className="px-5 py-3.5 font-semibold text-ink">{tr(row.value)}</td>
                        <td className="px-5 py-3.5 text-muted">{row.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DetailBlock>
          </div>
        </section>
      ) : null}

      <section className="border-t border-line bg-paper py-20">
        <div className="mx-auto grid max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8 2xl:px-12">
          <div className="grid content-start gap-14">
            {product.highlights?.length ? (
              <DetailBlock index={next()} eyebrow="Advantages" title={t("product.advantages")}>
                <ul className="grid gap-3">
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
              </DetailBlock>
            ) : null}

            {product.notes?.length ? (
              <DetailBlock index={next()} eyebrow="Notes" title={t("product.notes")}>
                <ul className="grid gap-3">
                  {product.notes.map((note) => (
                    <li
                      key={tr(note)}
                      className="flex items-start gap-3 rounded-xl bg-surface px-5 py-4 text-sm text-ink"
                    >
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-flame" />
                      {tr(note)}
                    </li>
                  ))}
                </ul>
              </DetailBlock>
            ) : null}

            {product.crossRef?.length ? (
              <DetailBlock index={next()} eyebrow="Cross-reference" title={t("product.crossRef")}>
                <p className="-mt-3 mb-6 text-sm text-muted">{t("product.crossRefNote")}</p>
                <dl className="border-t border-line">
                  {product.crossRef.map((ref) => (
                    <div
                      key={tr(ref.label) + ref.value}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line py-4"
                    >
                      <dt className="text-sm text-muted">{tr(ref.label)}</dt>
                      <dd className="flex flex-wrap justify-end gap-2">
                        {ref.value.split(/,\s*/).map((code) => (
                          <span
                            key={code}
                            className="rounded-md bg-surface px-2.5 py-1 font-mono text-xs font-semibold text-ink"
                          >
                            {code}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </DetailBlock>
            ) : null}

            {product.approvals?.length ? (
              <DetailBlock index={next()} eyebrow="Specifications" title={t("product.approvals")}>
                <ul className="flex flex-wrap gap-2">
                  {product.approvals.map((approval) => (
                    <li
                      key={tr(approval)}
                      className="rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-ink"
                    >
                      {tr(approval)}
                    </li>
                  ))}
                </ul>
              </DetailBlock>
            ) : null}
          </div>

          <DetailBlock index={next()} eyebrow="Request" title={t("product.whatToSend.title")}>
            <p className="-mt-3 text-[15px] leading-8 text-muted">
              {t(whatToSendKey[group.key] ?? "product.whatToSend.text")}
            </p>
            <div className="mt-8">
              <ButtonLink onClick={request}>{t("common.request")}</ButtonLink>
            </div>
          </DetailBlock>
        </div>
      </section>

      {related.length ? (
      <section className="border-t border-line bg-paper py-20">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-4 sm:px-6 lg:px-8 2xl:px-12">
          <SectionHeading
            index={String(next()).padStart(2, "0")}
            eyebrow="Related / equipment"
            title={t("product.related")}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </div>
      </section>
      ) : null}
    </>
  );
}
