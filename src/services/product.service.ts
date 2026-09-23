import { api } from "@/lib/axios";

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
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
}

export const productService = {
  async getProducts(params?: GetProductsParams): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>("/products", {
      params,
    });

    return response.data;
  },
};
