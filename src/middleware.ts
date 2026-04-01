import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  try {
    const response = await fetch(`${request.nextUrl.origin}/api/auth/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const decoded = await response.json();

    if (!decoded.success) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

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
    console.error(e);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Apply to all protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/courses/:path*", "/admin/:path*"],
};
