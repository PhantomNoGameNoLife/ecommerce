export async function getAllProducts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  const { data } = await response.json();
  return data;
}

export async function getSingleProducts(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
  const { data } = await response.json();
  return data;
}