import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/catalog";
import { ProductView } from "./product-view";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  return {
    title: product ? product.title.ru : "Оборудование",
    description: product?.summary.ru,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductView product={product} />;
}
