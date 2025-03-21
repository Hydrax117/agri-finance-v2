import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      password,
      name,
      role,
      phone,
      nationalId,
      dateOfBirth,
      gender,
      country,
    } = body;

    // Validate required fields
    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user with specified role
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        role,
      },
    });

    // Create farmer record with additional details
    if (role === "FARMER") {
      await db.farmer.create({
        data: {
          id: user.id,
          nationalId,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          gender,
          address: country
            ? {
                create: {
                  country,
                },
              }
            : undefined,
        },
      });
    } else if (role === "LENDER") {
      await db.lender.create({
        data: {
          id: user.id,
        },
      });
    } else if (role === "ADMIN") {
      await db.admin.create({
        data: {
          id: user.id,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
