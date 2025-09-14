"use server";

import { Cart } from "@/types/cart.t";
import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function GetUserCart() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("No token found. Please login first.");
  }

  const res = await fetch(`${process.env.NEXT_URL}/cart`, {
    headers: { token: token },
  });

  const data: Cart = await res.json();

  return data;
}

export async function AddToCart(id: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("No token found. Please login first.");
  }

  const { data } = await axios.post(
    `${process.env.NEXT_URL}/cart`,
    { productId: id },
    {
      headers: { token: token },
    }
  );

  return data as Cart;
}

export async function UpdateCartQuantity(id: string, count: number) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("No token found. Please login first.");
  }

  const { data } = await axios.put(
    `${process.env.NEXT_URL}/cart/${id}`,
    { count: count },
    {
      headers: { token: token },
    }
  );

  return data as Cart;
}

export async function RemoveCartItem(id: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("No token found. Please login first.");
  }

  const { data } = await axios.delete(
    `${process.env.NEXT_URL}/cart/${id}`,
    {
      headers: { token: token },
    }
  );

  return data as Cart;
}

export async function ClearCart() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("No token found. Please login first.");
  }

  const { data } = await axios.delete(`${process.env.NEXT_URL}/cart`, {
    headers: { token: token },
  });

  return data as Cart;
}
