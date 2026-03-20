"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import UserNavbar from "../../navbar/page";

export default function MyRegisteredEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchRegisteredEvents = async () => {
    try {
      const res = await fetch("/api/events/my-registered", { credentials: "include" });
      
      // Parse JSON safely
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error("Invalid JSON:", jsonErr);
        alert("Failed to parse server response");
        return;
      }

      if (!res.ok) {
        // Show backend error message
        alert(data?.error || "Failed to fetch registered events");
        return;
      }

      // Only set if data is array
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Something went wrong while fetching your registered events");
    } finally {
      setLoading(false);
    }
  };

  fetchRegisteredEvents();
}, []);


  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
      <UserNavbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold text-indigo-500 mb-6">
          My Registered Events
        </h1>

        {loading && (
          <p className="text-gray-400 animate-pulse">Loading your registered events...</p>
        )}

        {!loading && events.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center text-gray-400">
            You haven't registered for any events yet. <br />
            <Link href="/user/events" className="text-indigo-400 hover:underline">
              Browse Events
            </Link>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl transition hover:scale-105"
            >
              <h3 className="text-2xl font-semibold text-indigo-400 mb-2">
                {event.title}
              </h3>

              <p className="text-gray-300 mb-1">📅 {event.date || "TBD"}</p>
              <p className="text-gray-300 mb-1">📍 {event.location || "Online"}</p>
              <p className="text-gray-300 mb-4">📝 {event.category || "General"}</p>

              <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm mb-4">
                Registered
              </span>

              <Link
                href={`/user/events/${event._id}`}
                className="block text-center w-full py-2 bg-indigo-500 rounded-xl hover:bg-indigo-600 transition font-semibold"
              >
                View Event
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
