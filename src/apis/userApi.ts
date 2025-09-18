"use server";

import { ChangeSchemaType } from "@/schema/change.s";
import { RegisterSchemaType } from "@/schema/register.s";
import { UserRegister } from "@/types/user.t";
import { UserData } from "@/types/userData.t";
import { getMyToken } from "@/utilities/token";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function GetUser() {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("No token found. Please login first.");
    }

    const { id }: { id: string } = jwtDecode(token);

    const res = await fetch(`${process.env.NEXT_URL}/users/${id}`);

    const { data }: { data: UserData } = await res.json();

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "try again later");
    }
    throw new Error("Something went wrong");
  }
}

export async function UpdateUser(user: object) {
  try {
    const token = await getMyToken();

    if (!token) throw new Error("No token found. Please login first.");

    const { data } = await axios.put(
      `${process.env.NEXT_URL}/users/updateMe/`,
      user,
      { headers: { token } }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "try again later");
    }
    throw new Error("Something went wrong");
  }
}

export async function AddAddress(address: object) {
  try {
    const token = await getMyToken();

    if (!token) throw new Error("No token found. Please login first.");

    const { data } = await axios.post(
      `${process.env.NEXT_URL}/addresses`,
      address,
      { headers: { token } }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "try again later");
    }
    throw new Error("Something went wrong");
  }
}

export async function SignUp(values: RegisterSchemaType) {
  try {
    const { data }: { data: UserRegister } = await axios.post(
      `${process.env.NEXT_URL}/auth/signup`,
      values
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "try again later");
    }
    throw new Error("Something went wrong");
  }
}

export async function UpdatePassword(userPasswords: ChangeSchemaType) {
  try {
    const token = await getMyToken();

    if (!token) throw new Error("No token found. Please login first.");

    const { data } = await axios.put(
      `${process.env.NEXT_URL}/users/changeMyPassword`,
      userPasswords,
      { headers: { token } }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.errors.msg || "try again later");
    }
    throw new Error("Something went wrong");
  }
}
