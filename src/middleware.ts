import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      role: string;
    };

    const { pathname } = request.nextUrl;

    // ✅ Protect dashboard/courses for students only
    if (
      (pathname.startsWith("/dashboard") || pathname.startsWith("/courses")) &&
      decoded.role !== "STUDENT"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // ✅ Protect admin routes
    if (pathname.startsWith("/admin") && decoded.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (e) {
    console.log(e);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Apply to all protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/courses/:path*", "/admin/:path*"],
};
