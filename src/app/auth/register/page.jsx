"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); 
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }), // ✅ send role
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error || "Registration failed");

      alert("Registered successfully! Please login.");
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="user">User</option>
            <option value="organizer">Organizer</option>
          </select>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-indigo-600 transition-transform duration-300"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/auth/login" className="text-indigo-500 underline hover:text-indigo-400 transition">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}
