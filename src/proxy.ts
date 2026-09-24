import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith("/login");
  const isProtectedPage = pathname.startsWith("/product");

  if (isProtectedPage && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if ((isAuthPage || pathname === "/") && token) {
    const productUrl = new URL("/product", request.url);
    return NextResponse.redirect(productUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/product/:path*", "/login"],
};
 