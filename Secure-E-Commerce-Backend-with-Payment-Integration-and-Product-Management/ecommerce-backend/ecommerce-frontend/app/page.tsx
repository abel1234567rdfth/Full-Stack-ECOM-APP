"use client";

import Link from "next/link";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@/store/user-store";

export default function SignIn() {
  const router = useRouter();
  const { setUserId, setRole } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      setUserId(data.user._id);
      setRole(data.user.role);

      if (!res.ok) throw new Error(data.message || "Login failed");

      toast.success("Welcome Back ✨");

      if (data.user.role === "admin" && isAdmin) {
        router.push("/Admin/Products");
      } else {
        router.push("/Home");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-neutral-800 to-neutral-900">
      <div className="w-[430px] mx-4 rounded-3xl p-8 backdrop-blur-xl bg-white/10 shadow-2xl border border-white/10">
        {/* Logo or Title */}
        <h1 className="text-center text-4xl font-bold text-white tracking-wide mb-2">
          {isAdmin ? "Admin Access" : "Welcome Back"}
        </h1>
        <p className="text-center text-neutral-300 mb-6">
          Please sign in to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm text-neutral-300 mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-neutral-300 border border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/30 outline-none transition"
              placeholder="Enter your email"
              onChange={handleChange}
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
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-neutral-300 border border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/30 outline-none transition"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>

          {/* Admin Switch */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
                className="h-4 w-4 rounded-md"
              />
              <span className="text-neutral-300 text-sm">Login as Admin</span>
            </label>

            <Link
              href="#"
              className="text-sm text-neutral-300 hover:text-white transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button className="w-full py-3 text-lg rounded-xl bg-white text-black transition hover:bg-neutral-200">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-2">
          <span className="flex-1 h-[1px] bg-white/20"></span>
          <span className="text-neutral-300 text-sm">or continue with</span>
          <span className="flex-1 h-[1px] bg-white/20"></span>
        </div>

        {/* Google */}
        <button className="w-full flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 text-white py-3 rounded-xl transition">
          <FcGoogle size={22} /> Sign in with Google
        </button>

        {/* Signup */}
        <p className="text-center text-neutral-300 text-sm mt-5">
          Don’t have an account?{" "}
          <Link href="/Auth/SignUp" className="text-white font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
