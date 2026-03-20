
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
    const tokenObj = cookieStore.get("token");
    const token = tokenObj?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "organizer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const cacheKey = `my-events:${decoded.id}`;

  
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Cache HIT ");
      return NextResponse.json(JSON.parse(cachedData));
    }

    console.log("Cache MISS ");
    
    const events = await Event.find({ organizerId: decoded.id }).sort({ createdAt: -1 });

  
     await redisClient.set(cacheKey, JSON.stringify(events), "EX", 600);
    return NextResponse.json(events);
  } catch (err) {
    console.error("Error in /my-events:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}