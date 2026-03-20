import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import redisClient from "@/lib/redisClient";

export async function GET(req, context) {
  try {
    await connectDB();

    const params = await context.params;
    const { id } = params;

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    }

    const cacheKey = `event:${id}`;

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Cache HIT ", cacheKey);
      return NextResponse.json(JSON.parse(cachedData));
    }

    console.log("Cache MISS ", cacheKey);

    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    await redisClient.set(cacheKey, JSON.stringify(event), "EX", 600);

    return NextResponse.json(event);
  } catch (err) {
    console.error("GET /api/events/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req, context) {
  await connectDB();
  const params = context.params;
  const { id } = params;

  const body = await req.json();
  const updatedEvent = await Event.findByIdAndUpdate(id, body, { new: true });

  await redisClient.del(`event:${id}`);
  await redisClient.del(`event-attendees:${id}`);
  console.log("Cache invalidated ", `event:${id}`, `event-attendees:${id}`);

  return NextResponse.json(updatedEvent);
}

export async function DELETE(_, context) {
  await connectDB();
  const params = context.params;
  const { id } = params;

  await Event.findByIdAndDelete(id);

  await redisClient.del(`event:${id}`);
  await redisClient.del(`event-attendees:${id}`);
  console.log("Cache invalidated ", `event:${id}`, `event-attendees:${id}`);

  return NextResponse.json({ success: true });
}
