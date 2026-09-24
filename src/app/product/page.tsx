"use client";

import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { productService, Product } from "@/services/product.service";

import ProductTable from "./components/ProductTable";
import ProductMobileCard from "./components/ProductMobileCard";
import ProductListSkeleton from "./components/ProductListSkeleton";
import LogoutButton from "./components/LogoutButton";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ProductPagination from "./components/ProductsPagination";

const PAGE_SIZES = [10, 20, 50];

function getValidPage(value: string | null) {
  const page = Number(value);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
} 

function getValidPageSize(value: string | null) {
  const limit = Number(value);

  if (!PAGE_SIZES.includes(limit)) {
    return 20;
  }

  return limit;
}

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const currentPage = getValidPage(searchParams.get("page"));

  const pageSize = getValidPageSize(searchParams.get("limit"));

  const totalPages = Math.ceil(totalProducts / pageSize);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError("");

      const skip = (currentPage - 1) * pageSize;

      const data = await productService.getProducts({
        limit: pageSize,
        skip,
      });

      setProducts(data.products);
      setTotalProducts(data.total);
    } catch (error) {
      const axiosError = error as AxiosError;

      console.error("Failed to fetch products:", axiosError);

      setError("Unable to load products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, pageSize]);

  const updateUrl = (page: number, limit: number = pageSize) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));
    params.set("limit", String(limit));

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    updateUrl(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (!PAGE_SIZES.includes(newPageSize)) {
      return;
    }

    updateUrl(1, newPageSize);
  };

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-zinc-500">
                Admin Dashboard
              </p>

              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
                Products
              </h1>

              <p className="mt-1 text-sm text-zinc-500">
                Manage and monitor your product inventory.
              </p>
            </div>

            <LogoutButton />
          </div>

          {!isLoading && !error && (
            <div className="mt-3 text-sm text-zinc-500">
              Total: {totalProducts} products
            </div>
          )}
        </header>

        {isLoading && <ProductListSkeleton />}

        {!isLoading && error && (
          <div className="rounded-xl border border-zinc-200 bg-white px-6 py-12 text-center">
            <div className="mx-auto max-w-sm">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                !
              </div>

              <h2 className="mt-4 text-sm font-semibold text-zinc-900">
                Something went wrong
              </h2>

              <p className="mt-1 text-sm text-zinc-500">{error}</p>

              <button
                onClick={fetchProducts}
                className="mt-5 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="rounded-xl border border-zinc-200 bg-white px-6 py-12 text-center">
            <h2 className="text-sm font-semibold text-zinc-900">
              No products found
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              There are no products to display.
            </p>
          </div>
        )}

        {!isLoading && !error && products.length > 0 && (
          <>
            <ProductTable products={products} />

            <div className="space-y-3 md:hidden">
              {products.map((product) => (
                <ProductMobileCard key={product.id} product={product} />
              ))}
            </div>

            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalProducts={totalProducts}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </>
        )}
      </div>
    </main>
  );
}
