type RegisterFieldName = "name" | "email" | "password" | "rePassword" | "phone";
export const registerFields: { name: RegisterFieldName; type: string }[] = [
  { name: "name", type: "text" },
  { name: "email", type: "email" },
  { name: "password", type: "password" },
  { name: "rePassword", type: "password" },
  { name: "phone", type: "tel" },
];

type LoginFieldName = "email" | "password";
export const loginFields: { name: LoginFieldName; type: string }[] = [
  { name: "email", type: "email" },
  { name: "password", type: "password" },
];

type PaymentFieldName = "phone" | "city" | "details";
export const paymentFields: { name: PaymentFieldName; type?: string }[] = [
  { name: "phone", type: "tel" },
  { name: "city", type: "text" },
  { name: "details" },
];

type ResetFieldName = "email" | "newPassword";
export const resetFields: { name: ResetFieldName; type: string }[] = [
  { name: "email", type: "email" },
  { name: "newPassword", type: "password" },
];

type ProfileFieldName =
  | "avatar"
  | "name"
  | "phone"
  | "addressName"
  | "addressPhone"
  | "addressCity";

export const profileFields: { name: ProfileFieldName; type: string }[] = [
  { name: "avatar", type: "file" },
  { name: "name", type: "text" },
  { name: "phone", type: "tel" },
  { name: "addressName", type: "text" },
  { name: "addressPhone", type: "tel" },
  { name: "addressCity", type: "text" },
];

type changeFieldName = "currentPassword" | "password" | "rePassword";
export const changeFields: { name: changeFieldName; type: string }[] = [
  { name: "currentPassword", type: "password" },
  { name: "password", type: "password" },
  { name: "rePassword", type: "password" },
];
