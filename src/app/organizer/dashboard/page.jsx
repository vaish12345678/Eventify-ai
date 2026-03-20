"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OrganizerNavbar from "../navbar/page";
import Link from "next/link";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      const res = await fetch("/api/events/my-events", { cache: "no-store" });
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const upcomingEvents = events.filter(
    (e) => new Date(e.date) >= new Date()
  );

  const totalAttendees = events.reduce((sum, event) => {
    return sum + (event.attendees ? event.attendees.length : 0);
  }, 0);

  return (
    <div>
      <OrganizerNavbar />

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-10">
          <h1 className="text-4xl font-extrabold text-indigo-500">
            Organizer Dashboard
          </h1>
          <p className="text-gray-400">
            Manage your events & performance
          </p>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Events", value: events.length },
            { label: "Upcoming", value: upcomingEvents.length },
            { label: "Attendees", value: totalAttendees },
            { label: "Revenue", value: "₹ —" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center shadow-lg"
            >
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <h3 className="text-3xl font-bold text-indigo-500 mt-2">
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-7xl mx-auto mb-12">
          <Link href="/organizer/create-event">
            <button className="px-6 py-3 bg-indigo-500 rounded-xl hover:bg-indigo-600 transition font-semibold">
              ➕ Create New Event
            </button>
          </Link>
        </div>

        {/* Upcoming Events */}
        <div className="max-w-7xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-indigo-400 mb-6">
            Upcoming Events
          </h2>

          {loading && (
            <p className="text-gray-400 animate-pulse text-center">
              Loading events...
            </p>
          )}

          {!loading && upcomingEvents.length === 0 && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-gray-400">
              No upcoming events
            </div>
          )}

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.slice(0, 6).map((event) => (
              <motion.div
                key={event._id}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl"
              >
                <h3 className="text-xl font-semibold text-indigo-400 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-400">📅 {event.date}</p>
                <p className="text-gray-300">📍 {event.location || "Online"}</p>
                <p className="text-gray-300 mb-4">
                  👥 {event.attendees ? event.attendees.length : 0} Attendees
                </p>

                <Link href={`/organizer/events/${event._id}`}>
                  <button className="mt-2 w-full py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition font-semibold">
                    Manage Event
                  </button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
