"use server";

import { Orders } from "@/types/orders.t";
import { Online, Payment, PaymentRequest } from "@/types/payment.t";
import { getMyToken } from "@/utilities/token";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function GetUserOrders() {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("No token found. Please login first.");
    }

    const { id }: { id: string } = jwtDecode(token);

    const res = await fetch(`${process.env.NEXT_URL}/Orders/user/${id}`);

    const data: Orders = await res.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}

export async function CreateCashOrder(id: string, values: PaymentRequest) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("No token found. Please login first.");
    }

    const { data } = await axios.post(
      `${process.env.NEXT_URL}/orders/${id}`,
      values,
      {
        headers: { token: token },
      }
    );

    return data as Payment;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "try again later");
    }
    throw new Error("Something went wrong");
  }
}

export async function CheckoutSession(id: string, values: PaymentRequest) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("No token found. Please login first.");
    }

    const { data } = await axios.post(
      `${process.env.NEXT_URL}/orders//checkout-session/${id}?url=${process.env.NEXT_PUBLIC_API_URL}`,
      values,
      {
        headers: { token: token },
      }
    );

    return data as Online;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "try again later");
    }
    throw new Error("Something went wrong");
  }
}
