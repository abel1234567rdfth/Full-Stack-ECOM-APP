"use client";

import Link from "next/link";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import { useNavStore } from "@/store/nav-store";

export default function SignUp() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { setnavopenFalse } = useNavStore();

  useEffect(() => {
    setnavopenFalse();
  }, []);

  return (
    <div className="h-[600px] w-full md:w-[600px] mt-[30px] mx-auto shadow-2xl rounded-4xl flex items-center justify-center bg-neutral-100 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">
          {isAdmin ? "Create Admin Account" : "Create Account"}
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg focus:ring focus:ring-black outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:ring focus:ring-black outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg focus:ring focus:ring-black outline-none"
        />

        {/* Admin Mode Checkbox */}
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
          <span className="text-sm text-neutral-600 font-medium">
            Register as Admin
          </span>
        </label>

        <Button className="w-full bg-black text-white rounded-full py-3 text-lg">
          Sign Up
        </Button>

        <p className="text-sm text-center text-neutral-600">
          Already have an account?{" "}
          <Link href="/Auth/SignIn" className="text-black font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
