import { notFound } from "next/navigation";
import { getLeadContext, getProducts } from "@/lib/api";
import { productGroup, relatedProducts } from "@/lib/catalog";
import { ProductView } from "./product-view";

type ProductPageProps = {
  params: Promise<{ group: string; slug: string }>;
};

async function findProduct(slug: string) {
  return (await getProducts()).find((product) => product.slug === slug);
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

  return {
    title: product ? product.title.ru : "Оборудование",
    description: product?.summary.ru,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { group, slug } = await params;
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);

  if (!product || productGroup(product) !== group) {
    notFound();
  }

  return (
    <ProductView
      product={product}
      related={relatedProducts(product, products)}
      lead={await getLeadContext(product)}
    />
  );
}
