/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }

    // ✅ Create JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" } // token valid for 7 days
    );

    // 4. Save token in HttpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true, // ✅ cannot be accessed via JS (secure)
      secure: process.env.NODE_ENV === "production", // ✅ use HTTPS in production
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/", // cookie is valid for all routes
    });

    // Remove password before sending user data
    const { password: _, ...safeUser } = user;

    // For now just return success (later we’ll add JWT/session)
    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        token, // Include the token in the response
        data: safeUser, // Include user data (without password)
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
