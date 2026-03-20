"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

  return (
    <div className="min-h-screen font-sans bg-[#0f172a] text-white">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center p-6 bg-[#111827] shadow-md sticky top-0 z-50"
      >
        <h1 className="text-2xl font-bold tracking-wide text-indigo-500">Eventify-AI</h1>
        <div className="space-x-4">
          <Link
            href="/auth/login"
            className="px-5 py-2 rounded-full border border-indigo-500 hover:bg-indigo-500 hover:text-white transition-all shadow-sm"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="px-5 py-2 rounded-full border border-indigo-500 hover:bg-indigo-500 hover:text-white transition-all shadow-sm"
          >
            Register
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-6 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-6xl font-extrabold mb-6 text-indigo-500"
        >
          Organize & Discover <span className="text-white">Events</span> Effortlessly
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl mb-10 text-gray-300 max-w-3xl"
        >
          Create events with AI-powered descriptions, manage attendees, and explore the coolest events happening around you. Perfect for students, organizations, and professionals.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex space-x-6">
          <Link
            href="/auth/register"
            className="px-10 py-4 bg-indigo-500 text-white rounded-full shadow-lg hover:scale-105 transform transition-all"
          >
            Get Started
          </Link>
          <Link
            href="/events/dashboard"
            className="px-10 py-4 border border-indigo-500 text-indigo-500 rounded-full shadow-lg hover:bg-indigo-500 hover:text-white transform transition-all"
          >
            Explore Events
          </Link>
        </motion.div>
      </section>

      {/* Events Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl font-bold text-center mb-12 text-indigo-500"
        >
          Upcoming Events
        </motion.h3>

        {events.length === 0 ? (
          <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-center text-gray-400 text-lg">
            No events yet. Be the first to{" "}
            <Link href="/events/create" className="text-indigo-500 underline">
              create one
            </Link>
            !
          </motion.p>
        ) : (
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <motion.div
                key={event._id}
                variants={fadeUp}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl p-6 flex flex-col transform hover:scale-105 hover:shadow-indigo-500 transition-all duration-500"
              >
                <h4 className="text-2xl font-semibold mb-3 text-indigo-400">{event.title}</h4>
                <p className="text-gray-300 mb-4">{event.description.slice(0, 150)}...</p>
                <p className="text-sm text-gray-400 mb-1"><strong>Date:</strong> {event.date || "TBD"}</p>
                <p className="text-sm text-gray-400 mb-4"><strong>Location:</strong> {event.location || "Online"}</p>
                <Link
                  href={`/events/${event._id}`}
                  className="mt-auto px-4 py-2 bg-indigo-500 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all text-center"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-[#111827] text-gray-400 py-6 text-center">
        <p>© 2025 Eventify-AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
