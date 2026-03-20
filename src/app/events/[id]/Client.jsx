"use client";

import OrganizerNavbar from "@/app/organizer/navbar/page";
import { motion } from "framer-motion";

export default function OrganizerEventDetailsClient({ event }) {

  const getStatus = (date) => {
    const today = new Date();
    const eventDate = new Date(date);

    if (eventDate.toDateString() === today.toDateString()) {
      return { label: "Today", color: "bg-yellow-500" };
    }

    if (eventDate > today) {
      return { label: "Upcoming", color: "bg-green-500" };
    }

    return { label: "Completed", color: "bg-red-500" };
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        Event not found
      </div>
    );
  }

  const status = getStatus(event.date);

  return (
    <div>
      <OrganizerNavbar />

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white/10 border border-white/20 rounded-3xl p-8 space-y-6"
        >
          {/* Title + Status */}
          <div className="flex justify-between items-start">
            <h1 className="text-4xl font-bold text-indigo-400">
              {event.title}
            </h1>

            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${status.color}`}
            >
              {status.label}
            </span>
          </div>

          {/* Meta Info */}
          <div className="grid sm:grid-cols-2 gap-4 text-gray-300">
            <p>📂 Category: <span className="text-white">{event.category}</span></p>
            <p>🎯 Audience: <span className="text-white">{event.audience}</span></p>
            <p>📅 Date: <span className="text-white">{event.date}</span></p>
            <p>📍 Location: <span className="text-white">{event.location || "Online"}</span></p>
            <p>🕒 Created At: <span className="text-white">
              {new Date(event.createdAt).toLocaleDateString()}
            </span></p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold text-indigo-300 mb-2">
              Description
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 gap-6 pt-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <p className="text-gray-400 text-sm">Total Attendees</p>
              <p className="text-3xl font-bold text-indigo-400">
                {event.attendees?.length || 0}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}