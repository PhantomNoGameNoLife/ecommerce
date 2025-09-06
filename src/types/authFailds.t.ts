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
