export async function getAllCategories() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, { cache: "no-store" });
  const { data } = await response.json();
  return data;
}