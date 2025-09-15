"use server";

export async function getAllBrands() {
  const response = await fetch(`${process.env.NEXT_URL}/brands`, {
    next: { revalidate: 3600 * 24 * 14 },
  });
  const { data } = await response.json();
  return data;
}