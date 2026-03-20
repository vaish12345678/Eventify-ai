
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import redisClient from "@/lib/redisClient";

export async function GET() {
  await connectDB();

  const cacheKey = "all-events";

  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    console.log("Cache HIT ");
    return NextResponse.json(JSON.parse(cachedData));
  }

  console.log("Cache MISS ");

 
  const events = await Event.find();

 
   await redisClient.set(cacheKey, JSON.stringify(events), "EX", 600);

  return NextResponse.json(events);
}

export async function POST(req) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { title, category, audience, description, date, location } = await req.json();

    const newEvent = await Event.create({
      title,
      category,
      audience,
      description,
      date,
      location,
      organizerId: decoded.id,
    });

    await redisClient.del("all-events");
    console.log("Cache invalidated ");

    return NextResponse.json(newEvent, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}