"use server";

import { Cart } from "@/types/cart.t";
import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function GetUserCart() {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("No token found. Please login first.");
    }

    const res = await fetch(`${process.env.NEXT_URL}/cart`, {
      headers: { token: token },
    });

    const data: Cart = await res.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}

export async function AddToCart(id: string) {
  try {
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "try again later");
    }
    throw new Error("Something went wrong");
  }
}

export async function UpdateCartQuantity(id: string, count: number) {
  try {
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "try again later");
    }
    throw new Error("Something went wrong");
  }
}

export async function RemoveCartItem(id: string) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("No token found. Please login first.");
    }

    const { data } = await axios.delete(`${process.env.NEXT_URL}/cart/${id}`, {
      headers: { token: token },
    });

    return data as Cart;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "try again later");
    }
    throw new Error("Something went wrong");
  }
}

export async function ClearCart() {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("No token found. Please login first.");
    }

    const { data } = await axios.delete(`${process.env.NEXT_URL}/cart`, {
      headers: { token: token },
    });

    return data as Cart;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "try again later");
    }
    throw new Error("Something went wrong");
  }
}
