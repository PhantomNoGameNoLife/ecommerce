"use server";

import { Cart } from "@/types/cartRedux";
import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function AddToCart(id: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("No token found. Please login first.");
  }

  const { data }: { data: Cart } = await axios.post(
    `${process.env.NEXT_URL}/cart`,
    { productId: id },
    {
      headers: { token: token },
    }
  );

  return data;
}

export async function GetUserCart() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("No token found. Please login first.");
  }

  const res = await fetch(`${process.env.NEXT_URL}/cart`, {
    headers: { token: token },
  });

  const { data }: { data: Cart } = await res.json();

  return data;
}
