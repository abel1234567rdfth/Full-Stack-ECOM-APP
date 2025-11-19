"use client";

import Link from "next/link";
import { Button } from "@/Components/ui/button";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...formData,
            role: isAdmin ? "admin" : "customer",
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      toast.success("Account created successfully!");

      if (data.user.role === "admin") {
        router.push("/Admin/Produts");
      } else {
        router.push("/");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-800 to-neutral-900 px-4">
      <div className="w-full max-w-lg rounded-3xl p-8 backdrop-blur-xl bg-white/10 shadow-2xl border border-white/10">
        {/* Title */}
        <h1 className="text-center text-4xl font-bold text-white tracking-wide mb-2">
          {isAdmin ? "Create Admin Account" : "Create Account"}
        </h1>
        <p className="text-center text-neutral-300 mb-6">
          Join our platform in seconds
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="text-sm text-neutral-300 mb-1 block">
              Full Name
            </label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 bg-white/20 rounded-xl text-white placeholder-neutral-300 border border-white/20 focus:ring-2 focus:ring-white/30 focus:border-white/40 outline-none transition"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-neutral-300 mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-white/20 rounded-xl text-white placeholder-neutral-300 border border-white/20 focus:ring-2 focus:ring-white/30 focus:border-white/40 outline-none transition"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-neutral-300 mb-1 block">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-white/20 rounded-xl text-white placeholder-neutral-300 border border-white/20 focus:ring-2 focus:ring-white/30 focus:border-white/40 outline-none transition"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Admin Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded-md"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
            <span className="text-neutral-300 text-sm">Register as Admin</span>
          </label>

          {/* Submit */}
          <Button
            className="w-full py-3 text-lg rounded-xl bg-white text-black transition hover:bg-neutral-200"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center gap-2">
          <span className="flex-1 h-[1px] bg-white/20"></span>
          <span className="text-neutral-300 text-sm">or</span>
          <span className="flex-1 h-[1px] bg-white/20"></span>
        </div>

        {/* Google */}
        <button className="w-full flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 text-white py-3 rounded-xl transition">
          <FcGoogle size={22} /> Sign up with Google
        </button>

        {/* Login Link */}
        <p className="text-center text-neutral-300 text-sm mt-5">
          Already have an account?{" "}
          <Link href="/" className="text-white font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
