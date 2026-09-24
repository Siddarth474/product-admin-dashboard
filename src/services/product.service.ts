import { api } from "@/lib/axios";

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
  reviews: ProductReview[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface GetProductsParams {
  limit?: number;
  skip?: number;
  sortBy?: "price" | "rating" | "title";
  order?: "asc" | "desc";
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export const productService = {
  async getProducts(params?: GetProductsParams): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>("/products", {
      params,
    });

    return response.data;
  },

  async getProductsByCategory(
    category: string,
    params?: GetProductsParams,
  ): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>(
      `/products/category/${category}`,
      {
        params,
      },
    );

    return response.data;
  },

  async searchProducts(
    query: string,
    params?: GetProductsParams,
  ): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>("/products/search", {
      params: {
        q: query,
        ...params,
      },
    });

    return response.data;
  },

  async getCategories(): Promise<Category[]> {
    const response = await api.get<Category[]>("/products/categories");

    return response.data;
  },

  async getProductById(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);

    return response.data;
  },
};
