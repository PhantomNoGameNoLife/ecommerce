"use server";

import axios from "axios";

export async function ForgotPassword(email: string) {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_URL}/auth/forgotPasswords`,
      { email }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "try again later");
    }
    throw new Error("Something went wrong");
  }
}

export async function VerfiyCode(resetCode: string) {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_URL}/auth/verifyResetCode`,
      { resetCode }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "try again later");
    }
    throw new Error("Something went wrong");
  }
}

export async function ResetPassword(values: {
  email: string;
  newPassword: string;
}) {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_URL}/auth/resetPassword`,
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
