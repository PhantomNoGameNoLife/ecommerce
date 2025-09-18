"use server";

export async function getAllProducts(page: number = 1, limit: number = 20) {
  try {
    const response = await fetch(
      `${process.env.NEXT_URL}/products?page=${page}&limit=${limit}`,
      {
        next: { revalidate: 3600 * 24 * 14 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const { data, metadata } = await response.json();
    return { data, metadata };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}

export async function getSingleProducts(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_URL}/products/${id}`, {
      next: { revalidate: 3600 * 24 * 14 },
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}
