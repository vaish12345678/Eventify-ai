"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import UserNavbar from "../../navbar/page";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then(setEvent)
      .finally(() => setLoading(false));
  }, [id]);
const handleRegister = async () => {
  setRegistering(true);
  try {
    const res = await fetch(`/api/events/${id}/register`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Failed to register");
      return;
    }

    alert("Successfully registered!");
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  } finally {
    setRegistering(false);
  }
};


  if (loading) return <p className="text-gray-400 text-center mt-10">Loading...</p>;
  if (!event) return <p className="text-red-500 text-center mt-10">Event not found</p>;

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
      <UserNavbar />

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Event Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-indigo-500 mb-4">{event.title}</h1>

          <div className="text-gray-300 mb-6 space-y-2">
            <p>📅 <span className="text-white">{event.date || "TBD"}</span></p>
            <p>📍 <span className="text-white">{event.location || "Online"}</span></p>
            <p>📝 <span className="text-white">{event.category || "General"}</span></p>
          </div>

          <p className="text-gray-400 mb-6">{event.description || "No description available."}</p>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={registering}
            className="w-full py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition font-semibold mb-4"
          >
            {registering ? "Registering..." : "Register for Event"}
          </button>

          <Link
            href="/user/events"
            className="block text-center text-indigo-400 hover:underline"
          >
            ← Back to All Events
          </Link>
        </div>
      </div>
    </div>
  );
}
