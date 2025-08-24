import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Paths that need auth
  const protectedPaths = ["/dashboard", "/courses"];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected) {
    if (!token) return NextResponse.redirect(new URL("/login", request.url));

    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Config → apply middleware to all routes
export const config = {
  matcher: ["/dashboard/:path*", "/courses/:path*"],
};
