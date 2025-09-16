"use server";

import axios from "axios";

export async function ForgotPassword(email: string) {
  const { data } = await axios.post(
    `${process.env.NEXT_URL}/auth/forgotPasswords`,
    email
  );

  return data;
}

export async function VerfiyCode(resetCode: string) {
  const { data } = await axios.post(
    `${process.env.NEXT_URL}/auth/verifyResetCode`,
    resetCode
  );

  return data;
}

export async function ResetPassword(values: {
  email: string;
  newPassword: string;
}) {
  const { data } = await axios.put(
    `${process.env.NEXT_URL}/auth/resetPassword`,
    values
  );

  return data;
}
