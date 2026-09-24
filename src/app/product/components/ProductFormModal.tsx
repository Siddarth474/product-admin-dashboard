"use client";

import { X, Loader2 } from "lucide-react";
import { Product, Category } from "@/services/product.service";
import { useProductForm } from "@/hooks/useProductForm";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: Partial<Product>) => Promise<void>;
  initialData?: Product | null;
  categories: Category[];
}

export default function ProductFormModal(props: ProductFormModalProps) {
  const { isOpen, onClose, categories } = props;
  const {
    formData,
    errors,
    isSubmitting,
    serverError,
    isEdit,
    handleChange,
    handleSubmit,
  } = useProductForm(props);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-300 bg-white p-6 shadow-2xl transition-all sm:p-7 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <div>
            <h2
              id="product-modal-title"
              className="text-lg font-semibold tracking-tight text-zinc-900"
            >
              {isEdit ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="mt-0.5 text-xs text-zinc-500">
              {isEdit
                ? "Update product details. Changes will reflect instantly."
                : "Fill in the details below to add a new product."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {serverError && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="product-title"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-700"
            >
              Product Title <span className="text-red-500">*</span>
            </label>
            <input
              id="product-title"
              name="title"
              type="text"
              placeholder="e.g. Wireless Noise-Cancelling Headphones"
              value={formData.title}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`mt-1.5 w-full rounded-lg border px-3.5 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition ${
                errors.title
                  ? "border-red-500 bg-red-50/30"
                  : "border-zinc-300 bg-white"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-600">{errors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="product-category"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-700"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="product-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`mt-1.5 w-full rounded-lg border px-3.5 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition ${
                  errors.category
                    ? "border-red-500 bg-red-50/30"
                    : "border-zinc-300 bg-white"
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-xs text-red-600">{errors.category}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="product-rating"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-700"
              >
                Rating (0 - 5)
              </label>
              <input
                id="product-rating"
                name="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="4.5"
                value={formData.rating}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`mt-1.5 w-full rounded-lg border px-3.5 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition ${
                  errors.rating
                    ? "border-red-500 bg-red-50/30"
                    : "border-zinc-300 bg-white"
                }`}
              />
              {errors.rating && (
                <p className="mt-1 text-xs text-red-600">{errors.rating}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="product-price"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-700"
              >
                Price (USD) <span className="text-red-500">*</span>
              </label>
              <input
                id="product-price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="29.99"
                value={formData.price}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`mt-1.5 w-full rounded-lg border px-3.5 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition ${
                  errors.price
                    ? "border-red-500 bg-red-50/30"
                    : "border-zinc-300 bg-white"
                }`}
              />
              {errors.price && (
                <p className="mt-1 text-xs text-red-600">{errors.price}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="product-stock"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-700"
              >
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                id="product-stock"
                name="stock"
                type="number"
                step="1"
                min="0"
                placeholder="50"
                value={formData.stock}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`mt-1.5 w-full rounded-lg border px-3.5 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition ${
                  errors.stock
                    ? "border-red-500 bg-red-50/30"
                    : "border-zinc-300 bg-white"
                }`}
              />
              {errors.stock && (
                <p className="mt-1 text-xs text-red-600">{errors.stock}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="product-description"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-700"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="product-description"
              name="description"
              rows={3}
              placeholder="Provide a detailed description of the product..."
              value={formData.description}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`mt-1.5 w-full rounded-lg border px-3.5 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition resize-none ${
                errors.description
                  ? "border-red-500 bg-red-50/30"
                  : "border-zinc-300 bg-white"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600">{errors.description}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="product-thumbnail"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-700"
            >
              Image URL (Optional)
            </label>
            <input
              id="product-thumbnail"
              name="thumbnail"
              type="url"
              placeholder="Leave empty for default image or enter image URL"
              value={formData.thumbnail}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`mt-1.5 w-full rounded-lg border px-3.5 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition ${
                errors.thumbnail
                  ? "border-red-500 bg-red-50/30"
                  : "border-zinc-300 bg-white"
              }`}
            />
            {errors.thumbnail && (
              <p className="mt-1 text-xs text-red-600">{errors.thumbnail}</p>
            )}
            <p className="mt-1 text-[11px] text-zinc-400">
              If left empty, a placeholder product image will be used.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-zinc-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting
                ? "Saving..."
                : isEdit
                  ? "Update Product"
                  : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
