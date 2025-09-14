"use server";

export async function getAllCategories() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/categories`, {
    next: { revalidate: 3600 * 24 * 14 },
  });
  const { data } = await response.json();
  return data;
}
