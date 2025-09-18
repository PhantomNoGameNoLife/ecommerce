"use server";

import { ChangeSchemaType } from "@/schema/change.s";
import { RegisterSchemaType } from "@/schema/register.s";
import { UserRegister } from "@/types/user.t";
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

export async function SignUp(values: RegisterSchemaType) {
  const { data }: { data: UserRegister } = await axios.post(`${process.env.NEXT_URL}/auth/signup`, values)

  return data;
}


export async function UpdatePassword(userPasswords: ChangeSchemaType) {
  const token = await getMyToken();

  if (!token) throw new Error("No token found. Please login first.");

  const { data } = await axios.put(
    `${process.env.NEXT_URL}/users/changeMyPassword`,
    userPasswords,
    { headers: { token } }
  );

  return data;
}