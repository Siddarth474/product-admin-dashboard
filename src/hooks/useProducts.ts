"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import { productService, Product, Category } from "@/services/product.service";

export const PAGE_SIZES = [10, 20, 50];
export const SORT_FIELDS = ["price", "rating", "title"];
export const SORT_ORDERS = ["asc", "desc"] as const;

function getValidPage(value: string | null) {
  const page = Number(value);
  return !Number.isInteger(page) || page < 1 ? 1 : page;
}

function getValidPageSize(value: string | null) {
  const limit = Number(value);
  return !PAGE_SIZES.includes(limit) ? 20 : limit;
}

function getValidSort(value: string | null) {
  return value && SORT_FIELDS.includes(value) ? value : "";
}

function getValidOrder(value: string | null): "asc" | "desc" {
  return value && (SORT_ORDERS as readonly string[]).includes(value)
    ? (value as "asc" | "desc")
    : "asc";
}

export function useProducts() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = getValidPage(searchParams.get("page"));
  const pageSize = getValidPageSize(searchParams.get("limit"));
  const selectedCategory = searchParams.get("category") || "";
  const searchQuery = searchParams.get("q") || "";
  const selectedSort = getValidSort(searchParams.get("sort"));
  const selectedOrder = getValidOrder(searchParams.get("order"));

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const [error, setError] = useState("");

  const totalPages = Math.ceil(totalProducts / pageSize);

  const updateUrl = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      router.replace(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsCategoryLoading(true);
        const data = await productService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setIsCategoryLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const skip = (currentPage - 1) * pageSize;
      const params = {
        limit: pageSize,
        skip,
        ...(selectedSort && {
          sortBy: selectedSort as "price" | "rating" | "title",
          order: selectedOrder,
        }),
      };

      let data;

      if (searchQuery.trim()) {
        data = await productService.searchProducts(searchQuery.trim(), params);
      } else if (selectedCategory) {
        data = await productService.getProductsByCategory(
          selectedCategory,
          params,
        );
      } else {
        data = await productService.getProducts(params);
      }

      setProducts(data.products);
      setTotalProducts(data.total);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error("Failed to fetch products:", axiosError);
      setError("Unable to load products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [
    currentPage,
    pageSize,
    selectedCategory,
    searchQuery,
    selectedSort,
    selectedOrder,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (totalProducts > 0 && currentPage > totalPages) {
      updateUrl({ page: String(totalPages) });
    }
  }, [currentPage, totalPages, totalProducts, updateUrl]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      updateUrl({ page: String(page) });
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (PAGE_SIZES.includes(newPageSize)) {
      updateUrl({ page: "1", limit: String(newPageSize) });
    }
  };

  const handleCategoryChange = (category: string) => {
    updateUrl({ category: category || null, q: null, page: "1" });
  };

  const handleSearchChange = (query: string) => {
    updateUrl({
      q: query.trim() || null,
      page: "1",
    });
  };

  const handleSortChange = (sortBy: string, order: "asc" | "desc") => {
    updateUrl({
      sort: sortBy || null,
      order: sortBy ? order : null,
      page: "1",
    });
  };

  return {
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
    isCategoryLoading,
    error,
    handlePageChange,
    handlePageSizeChange,
    handleCategoryChange,
    handleSearchChange,
    handleSortChange,
    refetch: fetchProducts,
  };
}
