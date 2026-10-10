import { notFound } from "next/navigation";
import { getLeadContext, getProducts, getSiteData } from "@/lib/api";
import { getGroup, productBrand, productGroup, productHref, relatedProducts, type Product } from "@/lib/catalog";
import { JsonLd, breadcrumbLd, pageMetadata } from "@/lib/seo";
import { ProductView } from "./product-view";

type ProductPageProps = {
  params: Promise<{ group: string; slug: string }>;
};

async function findProduct(slug: string) {
  return (await getProducts()).find((product) => product.slug === slug);
}

/**
 * "ATA Shaft Mounted Gearbox — AOKMAN". Fleetguard titles already carry the
 * brand, so they get the item type instead: "Fleetguard LF3349 — Масляный фильтр".
 */
function seoTitle(product: Product) {
  const title = product.title.ru;
  const brand = productBrand(product);
  if (!title.toLowerCase().includes(brand.toLowerCase())) return `${title} — ${brand}`;

  const kind = product.subtitle?.ru.split(/[,(]/)[0].trim();
  return kind ? `${title} — ${kind}` : title;
}

export async function generateStaticParams() {
  return (await getProducts()).map((product) => ({
    group: productGroup(product),
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await findProduct(slug);

  if (!product) return { title: "Оборудование" };

  return pageMetadata({
    title: seoTitle(product),
    description:
      product.summary.ru ||
      `${product.title.ru}: подбор, поставка и консультация инженера Expert Machinery в Казахстане.`,
    path: productHref(product),
    image: product.image,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { group, slug } = await params;
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);

  if (!product || productGroup(product) !== group) {
    notFound();
  }

  const productGroupInfo = getGroup((await getSiteData()).groups, productGroup(product));

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          ["Главная", "/"],
          ["Каталог", "/catalog"],
          ...(productGroupInfo
            ? [[productGroupInfo.title.ru, `/catalog/${productGroupInfo.key}`] as [string, string]]
            : []),
          [product.title.ru, productHref(product)],
        ])}
      />
      <ProductView
        product={product}
        related={relatedProducts(product, products)}
        lead={await getLeadContext(product)}
      />
    </>
  );
}
