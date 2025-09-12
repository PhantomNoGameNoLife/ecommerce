import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      // login
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_URL}/auth/signin`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user.message === "success") {
          const { id }: { id: string } = jwtDecode(user.token);
          return { id: id, user: user.user, token: user.token };
        }
        throw new Error(user.message || "faild to login");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user?.user;
        token.token = user?.token;
      }
      return token;
    },

    async session({session,token}){
      if(token) {
        session.user = token?.user
      }
      return session
    }
  },
};
