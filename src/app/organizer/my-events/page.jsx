"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OrganizerNavbar from "../navbar/page";
import Link from "next/link";

export default function MyEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      const res = await fetch("/api/events/my-events", {
        method: "GET",
        cache: "no-store",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch my-events error:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <OrganizerNavbar />

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto mb-10"
        >
          <h1 className="text-4xl font-extrabold text-indigo-500">
            My Events
          </h1>
          <p className="text-gray-400 mt-2">
            Manage, edit and track your created events
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-400 text-center animate-pulse">
            Loading your events...
          </p>
        )}

        {/* Empty state */}
        {!loading && events.length === 0 && (
          <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
            <p className="text-gray-400">
              You haven’t created any events yet ✨
            </p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && events.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {events.map((event) => (
              <motion.div
                key={event._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl"
              >
                <h3 className="text-2xl font-semibold text-indigo-400 mb-2">
                  {event.title}
                </h3>

                <p className="text-gray-300 mb-1">
                  📍 {event.location || "Online"}
                </p>

                <p className="text-gray-400 text-sm mb-6">
                  📅 {event.date || "TBD"}
                </p>

                <div className="flex gap-3">
                  <Link
                    href={`/events/${event._id}`}
                    className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition text-center"
                  >
                    View
                  </Link>

                  <Link
                    href={`/organizer/events/${event._id}/attendees`}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition text-center"
                  >
                    Attendees
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
