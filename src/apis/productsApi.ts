import { Product } from "@/types/product";

export async function getAllProducts() {
  const response = await fetch(`${process.env.API_SECRET_KEY}/products`);
  const { data }: { data: Product[] } = await response.json();
  return data;
}

export async function getSingleProducts(id: string) {
  const response = await fetch(`${process.env.API_SECRET_KEY}/products/${id}`);
  const { data }: { data: Product } = await response.json();
  return data;
}
