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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await res.json();
      setUserId(data.user._id);
      setRole(data.user.role);

      if (!res.ok) throw new Error(data.message || "Signup failed");
      if (data.user.role === "admin" && isAdmin) {
        toast.success("Welcome ");
        router.push("/Admin/Users");
      } else {
        toast.success("Sign In successful! ");
        router.push("/Home");
      }

      setFormData({ email: "", password: "" });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-[650px] flex items-center justify-center rounded-4xl bg-neutral-100 w-[600px] px-4 mx-auto shadow-2xl">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">
            {isAdmin ? "Admin Login" : "Sign In"}
          </h1>

          <form
            onSubmit={handleSubmit}
            className="min-h-[300px] flex flex-col space-y-6"
          >
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-black outline-none"
            />

            {/* Password + Forgot Password */}
            <div className="space-y-1">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-black outline-none"
              />
            </div>

            {/* Login button */}
            <Button className="w-full bg-black text-white rounded-full py-3 text-lg">
              Login
            </Button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex-1 h-[1px] bg-neutral-300"></div>
            <span className="text-neutral-500 text-sm">or</span>
            <div className="flex-1 h-[1px] bg-neutral-300"></div>
          </div>

          {/* Sign Up link */}
          <p className="text-sm text-center text-neutral-600">
            Don’t have an account?{" "}
            <Link href="/Auth/SignUp" className="text-black font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
