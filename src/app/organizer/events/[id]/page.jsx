"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import OrganizerNavbar from "../../navbar/page";

export default function ManageEvent() {
  const { id } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then(setEvent);
  }, [id]);

  const updateEvent = async () => {
    setLoading(true);
    await fetch(`/api/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    setLoading(false);
    alert("✅ Event updated successfully");
  };

  const deleteEvent = async () => {
    if (!confirm("⚠️ Are you sure you want to delete this event?")) return;
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    router.push("/organizer/dashboard");
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-gray-400 flex items-center justify-center">
        Loading event...
      </div>
    );
  }

  return (
    <div>
      <OrganizerNavbar />

      <div className="min-h-screen bg-[#0f172a] px-6 py-12 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-indigo-500">
              Manage Event
            </h1>
            <p className="text-gray-400">
              Edit details, update status or delete this event
            </p>
          </div>

          {/* Title */}
          <div className="mb-5">
            <label className="text-sm text-gray-400">Event Title</label>
            <input
              value={event.title}
              onChange={(e) =>
                setEvent({ ...event, title: e.target.value })
              }
              className="mt-1 w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/20 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="text-sm text-gray-400">
              Event Description
            </label>
            <textarea
              rows={4}
              value={event.description}
              onChange={(e) =>
                setEvent({ ...event, description: e.target.value })
              }
              className="mt-1 w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/20 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Date & Location */}
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="text-sm text-gray-400">Date</label>
              <input
                type="date"
                value={event.date || ""}
                onChange={(e) =>
                  setEvent({ ...event, date: e.target.value })
                }
                className="mt-1 w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/20"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Location</label>
              <input
                value={event.location || ""}
                onChange={(e) =>
                  setEvent({ ...event, location: e.target.value })
                }
                className="mt-1 w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/20"
              />
            </div>
          </div>

          {/* Status */}
          <div className="mb-8">
            <label className="text-sm text-gray-400">Event Status</label>
            <select
              value={event.status || "draft"}
              onChange={(e) =>
                setEvent({ ...event, status: e.target.value })
              }
              className="mt-1 w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/20"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={updateEvent}
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition font-semibold"
            >
              {loading ? "Updating..." : "Update Event"}
            </button>

            <button
              onClick={deleteEvent}
              className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition font-semibold"
            >
              Delete Event
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
