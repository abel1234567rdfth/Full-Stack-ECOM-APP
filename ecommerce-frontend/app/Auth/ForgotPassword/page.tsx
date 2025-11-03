"use client";

import { useState } from "react";
import { Button } from "@/Components/ui/button";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    // TODO: Add Firebase or NextAuth password reset logic here
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-[600px] flex items-center justify-center rounded-4xl bg-neutral-100 w-[600px] px-4 mx-auto shadow-2xl">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
          <p className="text-sm text-neutral-600 text-center">
            Enter your registered email address and we’ll send you a password
            reset link.
          </p>

          {/* Email input */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-black outline-none"
          />

          {/* Send Reset Email button */}
          <Button
            onClick={handleReset}
            className="w-full bg-black text-white rounded-full py-3 text-lg"
          >
            Send Reset Email
          </Button>

          {/* Go back to Sign In */}
          <p className="text-sm text-center text-neutral-600">
            Remembered your password?{" "}
            <Link href="/Auth/SignIn" className="text-black font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
