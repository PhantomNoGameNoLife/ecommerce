export async function getAllCategories() {
  const response = await fetch(`${process.env.NEXT_URL}/categories`);
  const { data } = await response.json();
  return data;
}
