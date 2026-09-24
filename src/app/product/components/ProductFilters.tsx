"use client";

import type { Category } from "@/services/product.service";
import ProductSearch from "./ProductSearch";

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: string;
  searchQuery: string;
  selectedSort: string;
  selectedOrder: "asc" | "desc";
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sortBy: string, order: "asc" | "desc") => void;
}

export default function ProductFilters({
  categories,
  selectedCategory,
  searchQuery,
  selectedSort,
  selectedOrder,
  onCategoryChange,
  onSearchChange,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <div className="mb-4 rounded-xl border border-zinc-300 bg-white p-4 shadow-xs">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full sm:max-w-xs lg:w-56 shrink-0">
          <label
            htmlFor="category"
            className="mb-2 block text-xs font-medium text-zinc-600"
          >
            Category
          </label>

          <select
            id="category"
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-800 outline-none transition focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400"
          >
            <option value="">All categories</option>

            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full flex-1 lg:max-w-md">
          <ProductSearch
            value={searchQuery}
            onChange={onSearchChange}
          />
        </div>

        <div className="grid w-full grid-cols-2 gap-3 sm:w-auto shrink-0">
          <div>
            <label
              htmlFor="sort"
              className="mb-2 block text-xs font-medium text-zinc-600"
            >
              Sort by
            </label>

            <select
              id="sort"
              value={selectedSort}
              onChange={(event) =>
                onSortChange(event.target.value, selectedOrder)
              }
              className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-800 outline-none transition focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400"
            >
              <option value="">Default</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="title">Title</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="order"
              className="mb-2 block text-xs font-medium text-zinc-600"
            >
              Order
            </label>

            <select
              id="order"
              value={selectedOrder}
              disabled={!selectedSort}
              onChange={(event) =>
                onSortChange(selectedSort, event.target.value as "asc" | "desc")
              }
              className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-800 outline-none transition focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:border-zinc-200 disabled:text-zinc-400"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
