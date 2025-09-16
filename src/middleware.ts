import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;
  const authPage = ['/login', '/register']
  const routes = ['/allorders', '/payment']
  if (token && authPage.includes(pathname))
    return NextResponse.redirect(new URL("/", request.url));
  else if (!token && routes.includes(pathname))
    return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/register" , '/allorders' , '/payment'],
};
