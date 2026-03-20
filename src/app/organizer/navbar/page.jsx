"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function OrganizerNavbar({ organizerName }) {
  const router = useRouter();


  const handleLogout = () => {
    // Clear cookies or call logout API
    document.cookie = "token=; path=/; max-age=0"; 
    router.push("/auth/login");
  };

  return (
    <nav className="bg-[#0f172a] text-white shadow-md px-6 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-indigo-500 cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        EventifyAI
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6">
        <button
          onClick={() => router.push("/organizer/dashboard")}
          className="hover:text-indigo-400 transition"
        >
          Dashboard
        </button>
        <button
          onClick={() => router.push("/organizer/my-events")}
          className="hover:text-indigo-400 transition"
        >
          My Events
        </button>
        <button
          onClick={() => router.push("/organizer/create-event")}
          className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-xl transition"
        >
          Create Event
        </button>
      </div>

      {/* Profile Dropdown */}
     
    </nav>
  );
}
