

"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CreateEventForm({ onEventCreated }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [audience, setAudience] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

 
  const generateDescription = async () => {
    if (!title || !category || !audience) {
      alert("Please enter title, category & audience");
      return;
    }

    setAiLoading(true);

    try {
      const res = await fetch("/api/ai/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, audience }),
      });

      const data = await res.json();
      setDescription(data.description || "");
    } catch (err) {
      console.error(err);
      alert("Failed to generate description");
    } finally {
      setAiLoading(false);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    const res = await fetch("/api/events", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify({
    title,
    category,
    audience,
    description,
    date,
    location,
  }),
});


      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to create event");
        return;
      }

      setTitle("");
      setCategory("");
      setAudience("");
      setDescription("");
      setDate("");
      setLocation("");

      onEventCreated();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 space-y-5 shadow-2xl"
    >
      <h2 className="text-2xl font-bold text-indigo-500 text-center">
        Create Event (AI Powered)
      </h2>

      <input
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="input"
      />

      <input
        placeholder="Category (Tech, Cultural, Sports)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="input"
      />

      <input
        placeholder="Audience (Students, Professionals)"
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
        required
        className="input"
      />

  
      <div className="space-y-2">
        <button
          type="button"
          onClick={generateDescription}
          disabled={aiLoading}
          className="w-full py-2 bg-indigo-500/20 text-indigo-400 border border-indigo-500 rounded-xl hover:bg-indigo-500 hover:text-white transition"
        >
          {aiLoading ? "Generating with AI..." : "✨ Generate Description using AI"}
        </button>

        <textarea
          rows={4}
          placeholder="AI generated description will appear here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/20 text-white"
        />
      </div>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="input"
      />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        className="input"
      />

      <button
        disabled={loading}
        className="w-full py-3 bg-indigo-500 rounded-full font-semibold hover:bg-indigo-600 transition"
      >
        {loading ? "Creating Event..." : "Create Event"}
      </button>
    </motion.form>
  );
}
