
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import redisClient from "@/lib/redisClient";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const email = decoded.email.toLowerCase().trim();

    const cacheKey = `my-registered:${email}`;

  
    try {
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        console.log("Cache HIT ");
        return NextResponse.json(JSON.parse(cachedData));
      }
    } catch (err) {
      console.log("Redis GET error:", err.message);
    }

    console.log("Cache MISS");

    
    const events = await Event.find({
      "attendees.email": email,
    }).sort({ createdAt: -1 });

    
    try {
      await redisClient.set(
        cacheKey,
        JSON.stringify(events),
        "EX",
        600 
      );
    } catch (err) {
      console.log("Redis SET error:", err.message);
    }

    return NextResponse.json(events);

  } catch (err) {
    console.error("Error in /my-registered:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}