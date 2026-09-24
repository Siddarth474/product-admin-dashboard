import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith("/login");
  const isProtectedPage = pathname.startsWith("/product");

  // 1. Not logged in: block protected pages and redirect to /login
  if (isProtectedPage && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Already logged in: prevent access to /login (or root /) and redirect to /product
  if ((isAuthPage || pathname === "/") && token) {
    const productUrl = new URL("/product", request.url);
    return NextResponse.redirect(productUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/product/:path*", "/login"],
};
