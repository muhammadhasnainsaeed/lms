import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Handle GET request
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
    } catch {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      }, // hide password
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
