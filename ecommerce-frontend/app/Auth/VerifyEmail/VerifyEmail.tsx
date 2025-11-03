"use client";

import { useState } from "react";
import { Button } from "@/Components/ui/button";
import Link from "next/link";

export default function VerifyEmail() {
  const [email, setEmail] = useState("");

  const handleSendVerification = () => {
    // TODO: Add Firebase or backend logic to send verification email
    console.log("Verification email sent to:", email);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-[600px] flex items-center justify-center rounded-4xl bg-neutral-100 w-[600px] px-4 mx-auto shadow-2xl">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">Verify Your Email</h1>
          <p className="text-sm text-neutral-600 text-center">
            Please enter your email address to receive a verification link.
          </p>

          {/* Email input */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-black outline-none"
          />

          {/* Send verification email button */}
          <Button
            onClick={handleSendVerification}
            className="w-full bg-black text-white rounded-full py-3 text-lg"
          >
            Send Verification Email
          </Button>

          {/* Back to Sign In */}
          <p className="text-sm text-center text-neutral-600">
            Already verified?{" "}
            <Link href="/Auth/SignIn" className="text-black font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
