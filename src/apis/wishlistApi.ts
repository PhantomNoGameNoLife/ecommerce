"use server";

import { Wishlist } from "@/types/wishlist.t";
import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function GetUserWishlist() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("No token found. Please login first.");
  }

  const res = await fetch(`${process.env.NEXT_URL}/wishlist`, {
    headers: { token: token },
  });

  const data: Wishlist = await res.json();

  return data;
}

export async function AddToWishlist(id: string) {
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
}

export async function RemoveWishlistItem(id: string) {
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
}
