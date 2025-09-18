"use server";

export async function getAllBrands() {
  try {
    const response = await fetch(`${process.env.NEXT_URL}/brands`, {
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
