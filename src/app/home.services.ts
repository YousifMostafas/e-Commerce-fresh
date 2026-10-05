"use server"
import { AllProductsResponse, product } from "./home.interface";

export async function getAllProducts(filters?: {
  subcategory?: string;
  brand?: string;
  category?: string;
}): Promise<product[]> {
  const params = new URLSearchParams();
  if (filters?.subcategory) {
    params.set("subcategory[in]", filters.subcategory);
  }
  if (filters?.brand) {
    params.set("brand", filters.brand);
  }
  if (filters?.category) {
    params.set("category[in]", filters.category);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?${params.toString()}`,
  );
  const data: AllProductsResponse = await response.json();
  return data.data;
}

export async function getBrandById(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands/${id}`,
  );
  const json = await response.json();
  return json.data as { _id: string; name: string; image: string };
}

export async function getSubCategoryById(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/subcategories/${id}`,
  );
  const json = await response.json();
  return json.data as { _id: string; name: string };
}

export async function getCategoryById(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${id}`,
  );
  const json = await response.json();
  return json.data as { _id: string; name: string; image: string };
}