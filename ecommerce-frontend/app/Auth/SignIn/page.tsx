"use client";

import Link from "next/link";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleGoogleSignIn = () => {
    // TODO: Add your Firebase or NextAuth Google login logic here
    console.log("Google Sign-In clicked");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-[650px] flex items-center justify-center rounded-4xl bg-neutral-100 w-[600px] px-4 mx-auto shadow-2xl">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">
            {isAdmin ? "Admin Login" : "Sign In"}
          </h1>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-black outline-none"
          />

          {/* Password + Forgot Password */}
          <div className="space-y-1">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-black outline-none"
            />
            <div className="text-right">
              <Link href={"/Auth/ForgotPassword"}>
                <button className="text-sm text-neutral-600 hover:text-black font-medium">
                  Forgot Password?
                </button>
              </Link>
            </div>
          </div>

          {/* Admin Mode Switch */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
            <span className="text-sm text-neutral-600 font-medium">
              Login as Admin
            </span>
          </label>

          {/* Login button */}
          <Button className="w-full bg-black text-white rounded-full py-3 text-lg">
            Login
          </Button>

          {/* OR Divider */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex-1 h-[1px] bg-neutral-300"></div>
            <span className="text-neutral-500 text-sm">or</span>
            <div className="flex-1 h-[1px] bg-neutral-300"></div>
          </div>

          {/* Google Sign-In */}
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 border rounded-full py-3 text-lg"
          >
            <FcGoogle size={22} />
            Sign in with Google
          </Button>

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
