import { Categories } from "@/types/Categories";

export async function getAllCategories() {
  const response = await fetch(`${process.env.API_SECRET_KEY}/categories`);
  const { data }: { data: Categories[] } = await response.json();
  return data;
}
