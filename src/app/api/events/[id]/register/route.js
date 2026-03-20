import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import redisClient from "@/lib/redisClient";

export async function POST(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

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

    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const alreadyRegistered = event.attendees.find((a) => a.email === email);

    if (alreadyRegistered) {
      return NextResponse.json(
        { error: "Already registered" },
        { status: 400 },
      );
    }

    event.attendees.push({
      name: decoded.name,
      email: email,
    });

    await event.save();

    try {
      await redisClient.del(`event-attendees:${id}`);

      await redisClient.del(`my-registered:${email}`);

      console.log("Cache invalidated");
    } catch (err) {
      console.log("Redis DEL error:", err.message);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Register POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
