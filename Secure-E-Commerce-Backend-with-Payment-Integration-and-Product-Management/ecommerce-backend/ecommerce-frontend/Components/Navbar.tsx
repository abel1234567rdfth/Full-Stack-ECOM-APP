"use client";

import { useCartStore } from "@/store/cart-store";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Ghost, LogOutIcon } from "lucide-react";
import { useUser } from "@/store/user-store";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const { setUserId, setRole, clearRole, clearUserId } = useUser();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log("Logout failed:", data.message || res.statusText);
        return;
      }

      clearUserId();
      clearRole();
      router.push("/");
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={` sticky top-0 z-50 bg-white shadow`}>
      <div className="max-w-[85%] mx-auto flex items-center justify-between px-4 py-4">
        <Link href={"/"} className="hover:text-blue-600 font-bold">
          H-Markets
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href={"/Home"}>Home</Link>
          <Link href={"/products"} className="hover:text-blue-600">
            Products
          </Link>
          <Link href={"/checkout"} className="hover:text-blue-600">
            Checkout
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href={"/checkout"} className="relative ">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6! w-6!" />
            ) : (
              <Bars3Icon className="h-6! w-6!" />
            )}
          </Button>

          <LogOutIcon className="h-5 w-5 ml-5" onClick={handleLogout} />
        </div>
      </div>
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md ">
          <ul className="flex flex-col p-4 space-y-2 items-center">
            <li>
              <Link className="block hover:text-blue-600" href={"/home"}>
                Home
              </Link>
            </li>
            <li>
              <Link href={"/products"} className="block hover:text-blue-600">
                Products
              </Link>
            </li>
            <li>
              <Link href={"/checkout"} className="block hover:text-blue-600">
                Checkout
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
}
