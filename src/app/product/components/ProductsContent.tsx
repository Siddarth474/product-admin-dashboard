"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import ProductTable from "./ProductTable";
import ProductMobileCard from "./ProductMobileCard";
import ProductListSkeleton from "./ProductListSkeleton";
import ProductPagination from "./ProductsPagination";
import ProductFilters from "./ProductFilters";
import LogoutButton from "./LogoutButton";
import ProductFormModal from "./ProductFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/services/product.service";

export default function ProductsContent() {
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
    addProduct,
    editProduct,
    deleteProduct,
    refetch,
  } = useProducts();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleOpenDeleteModal = (product: Product) => {
    setDeletingProduct(product);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (productData: Partial<Product>) => {
    if (editingProduct) {
      await editProduct(editingProduct.id, productData);
    } else {
      await addProduct(productData);
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingProduct) {
      await deleteProduct(deletingProduct.id);
    }
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

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="inline-flex items-center gap-2 rounded-lg bg-black px-3.5 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 shadow-2xs"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Product</span>
                <span className="sm:hidden">Add</span>
              </button>

              <LogoutButton />
            </div>
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
            <ProductTable
              products={products}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
            />

            <div className="space-y-3 md:hidden">
              {products.map((product) => (
                <ProductMobileCard
                  key={product.id}
                  product={product}
                  onEdit={handleOpenEditModal}
                  onDelete={handleOpenDeleteModal}
                />
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

        <ProductFormModal
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
          onSubmit={handleFormSubmit}
          initialData={editingProduct}
          categories={categories}
        />

        <DeleteConfirmModal
          isOpen={isDeleteOpen}
          product={deletingProduct}
          onClose={() => {
            setIsDeleteOpen(false);
            setDeletingProduct(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </main>
  );
}
