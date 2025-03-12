import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/profile", "/@"];

const authRoutes = ["/login", "/register", "/verify-email"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAuthRoute = authRoutes.includes(pathname);

  const url = req.nextUrl.clone();

  if (!token && isProtectedRoute) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (token && isAuthRoute) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!home|api|_next|_next/static|_next/image|images|favicon.ico).*)",
  ],
};
