"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import OrganizerNavbar from "../../../navbar/page";
import { motion } from "framer-motion";

export default function AttendeesPage() {
  const { id } = useParams();
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchAttendees();
  }, [id]);

  const fetchAttendees = async () => {
    try {
      const res = await fetch(
        `/api/events/${id}/attendees`,
        {
          cache: "no-store",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to fetch attendees");

      const data = await res.json();
      setAttendees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setAttendees([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <OrganizerNavbar />

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-indigo-400 mb-8"
        >
          Event Attendees
        </motion.h1>

        {loading && (
          <p className="text-gray-400 animate-pulse">
            Loading attendees...
          </p>
        )}

        {!loading && attendees.length === 0 && (
          <p className="text-gray-400">
            No attendees registered yet
          </p>
        )}

        {!loading && attendees.length > 0 && (
          <div className="grid gap-6 max-w-5xl">
            {attendees.map((attendee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 border border-white/20 rounded-2xl p-6 flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold">
                    {attendee.name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {attendee.email}
                  </p>
                  <p className="text-gray-400 text-sm">
                    🎟 {attendee.ticketType}
                  </p>
                </div>

               
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
