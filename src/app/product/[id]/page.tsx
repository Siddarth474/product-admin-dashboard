import { AxiosError } from "axios";
import { notFound } from "next/navigation";
import Link from "next/link";

import { productService } from "@/services/product.service";

import ProductGallery from "@/app/product/components/ProductGallery";
import ProductInfo from "@/app/product/components/ProductInfo";
import ProductReviews from "@/app/product/components/ProductReviews";
import LogoutButton from "@/app/product/components/LogoutButton";

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    notFound();
  }

  try {
    const product = await productService.getProductById(productId);


    return (
      <main className="min-h-screen bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm min-w-0">
              <Link
                href="/product"
                className="text-zinc-500 transition hover:text-zinc-900 shrink-0"
              >
                Products
              </Link>

              <span className="text-zinc-300">/</span>

              <span className="truncate text-zinc-900">{product.title}</span>
            </div>

            <LogoutButton />
          </nav>

          <section className="grid gap-8 lg:grid-cols-2 lg:gap-14">
            <ProductGallery
              title={product.title}
              thumbnail={product.thumbnail}
              images={product.images}
            />

            <ProductInfo product={product} />
          </section>

          <ProductReviews reviews={product.reviews} />
        </div>
      </main>
    );
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 404) {
      notFound();
    }

    throw error;
  }
}
