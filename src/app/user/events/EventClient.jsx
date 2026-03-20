"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import UserNavbar from "../navbar/page";

export default function EventsClient({ events }) {
  return (
    <div>
      <UserNavbar />

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-500 mb-2">
            Explore Events
          </h1>
          <p className="text-gray-400">
            Browse all upcoming events and join the ones you like
          </p>
        </div>

        {/* Empty State */}
        {events.length === 0 ? (
          <p className="text-gray-400 text-center">
            No events available at the moment.
          </p>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
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
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-lg transition-all"
              >
                <h3 className="text-2xl font-semibold text-indigo-400 mb-2">
                  {event.title}
                </h3>

                <p className="text-gray-300 mb-1">
                  📅 {event.date || "TBD"}
                </p>

                <p className="text-gray-300 mb-4">
                  📍 {event.location || "Online"}
                </p>

                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                  {event.description || "No description provided"}
                </p>

                <Link
                  href={`/user/events/${event._id}`}
                  className="w-full block text-center py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition font-semibold"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}