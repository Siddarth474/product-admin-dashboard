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

  const [refreshIndex, setRefreshIndex] = useState(0);
  const refetch = useCallback(() => {
    setRefreshIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
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

        if (!ignore) {
          setProducts(data.products);
          setTotalProducts(data.total);
        }
      } catch (err) {
        if (!ignore) {
          const axiosError = err as AxiosError;
          console.error("Failed to fetch products:", axiosError);
          setError("Unable to load products. Please try again.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      ignore = true;
    };
  }, [
    currentPage,
    pageSize,
    selectedCategory,
    searchQuery,
    selectedSort,
    selectedOrder,
    refreshIndex,
  ]);

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

  const DEFAULT_THUMBNAIL =
    "https://cdn.dummyjson.com/products/images/groceries/Apple/thumbnail.png";

  const addProduct = async (
    newProductData: Partial<Product>,
  ): Promise<Product> => {
    let apiResponse: Partial<Product> = {};
    try {
      apiResponse = await productService.addProduct(newProductData);
    } catch (err) {
      console.warn("DummyJSON addProduct fallback to local state:", err);
    }

    const finalProduct: Product = {
      id: apiResponse.id || Date.now(),
      title: apiResponse.title || newProductData.title || "Untitled Product",
      description:
        apiResponse.description || newProductData.description || "",
      category:
        apiResponse.category || newProductData.category || "general",
      price: Number(apiResponse.price ?? newProductData.price ?? 0),
      rating: Number(apiResponse.rating ?? newProductData.rating ?? 4.5),
      stock: Number(apiResponse.stock ?? newProductData.stock ?? 0),
      thumbnail:
        apiResponse.thumbnail ||
        newProductData.thumbnail ||
        DEFAULT_THUMBNAIL,
      images: apiResponse.images?.length
        ? apiResponse.images
        : [
            apiResponse.thumbnail ||
              newProductData.thumbnail ||
              DEFAULT_THUMBNAIL,
          ],
      reviews: apiResponse.reviews || [],
    };

    setProducts((prev) => [finalProduct, ...prev]);
    setTotalProducts((prev) => prev + 1);
    return finalProduct;
  };

  const editProduct = async (
    id: number,
    updatedData: Partial<Product>,
  ): Promise<void> => {
    let apiUpdated: Partial<Product> = {};
    try {
      apiUpdated = await productService.updateProduct(id, updatedData);
    } catch (apiErr) {
      console.warn("DummyJSON updateProduct fallback to local state:", apiErr);
    }

    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...updatedData,
            ...apiUpdated,
          };
        }
        return item;
      }),
    );
  };

  const deleteProduct = async (id: number): Promise<void> => {
    try {
      await productService.deleteProduct(id);
    } catch (apiErr) {
      console.warn("DummyJSON deleteProduct fallback to local state:", apiErr);
    }

    setProducts((prev) => prev.filter((item) => item.id !== id));
    setTotalProducts((prev) => Math.max(0, prev - 1));
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
    addProduct,
    editProduct,
    deleteProduct,
    refetch,
  };
}
