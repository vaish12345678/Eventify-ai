
import { NextResponse } from "next/server";
import redisClient from "@/lib/redisClient";

export async function POST(req) {
  try {
    const { title, category, audience } = await req.json();

    const cacheKey = `ai-desc:${title}:${category}:${audience}`;

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Cache HIT ", cacheKey);
      return NextResponse.json(JSON.parse(cachedData));
    }

    console.log("Cache MISS ", cacheKey);

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Write a professional and engaging event description for a ${category} event titled "${title}" for ${audience}.`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("FULL Gemini response:", JSON.stringify(data, null, 2));

    const description =
      data?.candidates?.[0]?.content?.parts?.map(p => p.text).join(" ")
      || "No description generated";

     await redisClient.set(cacheKey, JSON.stringify({description}), "EX", 3600);
    console.log("Cached AI description ", cacheKey);

    return NextResponse.json({ description });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Gemini failed" },
      { status: 500 }
    );
  }
}