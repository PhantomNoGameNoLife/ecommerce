"use server";

import { UserData } from "@/types/userData.t";
import { getMyToken } from "@/utilities/token";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function GetUser() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("No token found. Please login first.");
  }

  const { id }: { id: string } = jwtDecode(token);

  const res = await fetch(`${process.env.NEXT_URL}/users/${id}`);

  const { data }: { data: UserData } = await res.json();

  return data;
}

export async function UpdateUser(user: object) {
  const token = await getMyToken();

  if (!token) throw new Error("No token found. Please login first.");

  const { data } = await axios.put(
    `${process.env.NEXT_URL}/users/updateMe/`,
    user,
    { headers: { token } }
  );

  return data;
}

export async function AddAddress(address: object) {
  const token = await getMyToken();

  if (!token) throw new Error("No token found. Please login first.");

  const { data } = await axios.post(
    `${process.env.NEXT_URL}/addresses`,
    address,
    { headers: { token } }
  );

  return data;
}
