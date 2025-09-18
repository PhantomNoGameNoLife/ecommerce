"use server";

import { Wishlist } from "@/types/wishlist.t";
import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function GetUserWishlist() {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("No token found. Please login first.");
    }

    const res = await fetch(`${process.env.NEXT_URL}/wishlist`, {
      headers: { token: token },
    });

    const data: Wishlist = await res.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}

export async function AddToWishlist(id: string) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("No token found. Please login first.");
    }

    const { data } = await axios.post(
      `${process.env.NEXT_URL}/wishlist`,
      { productId: id },
      {
        headers: { token: token },
      }
    );

    return data as Wishlist;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "try again later");
    }
    throw new Error("Something went wrong");
  }
}

export async function RemoveWishlistItem(id: string) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("No token found. Please login first.");
    }

    const { data } = await axios.delete(
      `${process.env.NEXT_URL}/wishlist/${id}`,
      {
        headers: { token: token },
      }
    );

    return data as Wishlist;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "try again later");
    }
    throw new Error("Something went wrong");
  }
}
