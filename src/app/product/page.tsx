"use client";

import ProductTable from "./components/ProductTable";
import ProductMobileCard from "./components/ProductMobileCard";
import ProductListSkeleton from "./components/ProductListSkeleton";
import ProductPagination from "./components/ProductsPagination";
import ProductFilters from "./components/ProductFilters";
import LogoutButton from "./components/LogoutButton";
import { useProducts } from "@/hooks/useProducts";


export default function ProductsPage() {
  const {
    products,
    categories,
    totalProducts,
    totalPages,
    currentPage,
    pageSize,
    selectedCategory,
    searchQuery,
    selectedSort,
    selectedOrder,
    isLoading,
    error,
    handlePageChange,
    handlePageSizeChange,
    handleCategoryChange,
    handleSearchChange,
    handleSortChange,
    refetch,
  } = useProducts();

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

        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          selectedSort={selectedSort}
          selectedOrder={selectedOrder}
          onCategoryChange={handleCategoryChange}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
        />

        {isLoading && <ProductListSkeleton />}

        {!isLoading && error && (
          <div className="rounded-xl border border-zinc-300 bg-white px-6 py-12 text-center shadow-xs">
            <div className="mx-auto max-w-sm">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                !
              </div>

              <h2 className="mt-4 text-sm font-semibold text-zinc-900">
                Something went wrong
              </h2>

              <p className="mt-1 text-sm text-zinc-500">{error}</p>

              <button
                onClick={refetch}
                className="mt-5 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="rounded-xl border border-zinc-300 bg-white px-6 py-12 text-center shadow-xs">
            <h2 className="text-sm font-semibold text-zinc-900">
              No products found
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {searchQuery
                ? `No products matched "${searchQuery}". Try a different keyword.`
                : "There are no products to display."}
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
