import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

interface MyJWT {
  token?: string;
  id?: string;
  name?: string;
  role?: string;
  exp?: number;
  iat?: number;
}

export async function getMyToken(): Promise<string | undefined> {
  const fakeToken = (await cookies()).get("next-auth.session-token")?.value;

  if (!fakeToken) return undefined;

  const decoded = (await decode({
    token: fakeToken,
    secret: process.env.NEXTAUTH_SECRET!,
  })) as MyJWT | null;

  console.log(decoded?.token);
  return decoded?.token;
}