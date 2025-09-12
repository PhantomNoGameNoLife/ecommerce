import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  console.log(token);
  const { pathname } = request.nextUrl;
  if (token && (pathname === "/login" || pathname === "/register"))
    return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/register"],
};
