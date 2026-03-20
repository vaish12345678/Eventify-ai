// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "@/models/User";
// import { connectDB } from "@/lib/db";

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function POST(req) {
//   try {
//     await connectDB();
//     const { name, email, password, role } = await req.json();

//     if (!name || !email || !password || !role) {
//       return NextResponse.json({ error: "All fields are required" }, { status: 400 });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json({ error: "User already exists" }, { status: 400 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword, role });

//     const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

//     const response = NextResponse.json({ message: "User registered successfully", user: { id: user._id, role: user.role, email: user.email } });
//     response.cookies.set({
//       name: "token",
//       value: token,
//       httpOnly: true,
//       path: "/",
//       sameSite: "lax",
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 60 * 60 * 24 * 7,
//     });

//     return response;
//   } catch (error) {
//     console.error("Register error:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password, role } = await req.json();

    // 1. Validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // 5. Send response (NO TOKEN HERE)
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error("Register error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}