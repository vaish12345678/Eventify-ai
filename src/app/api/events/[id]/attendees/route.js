import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import redisClient from "@/lib/redisClient";

export async function GET(req, context) {
  try {
    await connectDB();

    const params = await context.params;
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Event ID missing" },
        { status: 400 }
      );
    }

    const cacheKey = `event-attendees:${id}`;

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Cache HIT ");
      return NextResponse.json(JSON.parse(cachedData));
    }

    console.log("Cache MISS ");
    
    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    const attendees = event.attendees || [];


     await redisClient.set(cacheKey, JSON.stringify(attendees), "EX", 600);

    return NextResponse.json(attendees);
  } catch (error) {
    console.error("Fetch attendees error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}