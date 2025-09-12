import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    token: string;
    user: { name: string; emai: string; role: string };
  }

  interface Session {
    user: User.user
  }
}
