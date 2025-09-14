"use server";

export async function getAllProducts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/products`, {
      next: { revalidate: 3600 * 24 * 14 },
    });
  const { data } = await response.json();
  return data;
}

export async function getSingleProducts(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/products/${id}` , {
      next: { revalidate: 3600 * 24 * 14 },
    });
  const { data } = await response.json();
  return data;
}