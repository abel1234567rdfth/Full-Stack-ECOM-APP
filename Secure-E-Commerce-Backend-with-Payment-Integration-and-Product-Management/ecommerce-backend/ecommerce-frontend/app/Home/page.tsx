"use client";

import { useEffect, useState } from "react";
import Carousel from "@/Components/carousel";
import Navbar from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/store/user-store";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId, role } = useUser();

  useEffect(() => {
    //   if (userId === "null") {
    //     router.push("/");
    //   }
    console.log(userId, role);
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/product/products`
        );
        const data = await res.json();

        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.log("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userId, role]);

  return (
    <div className="flex flex-col">
      <Navbar />

      <div className="mt-4 grow container max-w-[85%] mx-auto px-4 py-1">
        <section className="rounded bg-neutral-100 py-8 sm:py-12">
          <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
            <div className="max-w-md space-y-4">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Welcome to
                <br /> H-MARKETS
              </h2>
              <p className="text-neutral-600">
                Discover the latest products at the best prices.
              </p>
              <Button
                asChild
                className="bg-black text-white px-6 py-3 rounded-full"
              >
                <Link href="/products">Browse All Products</Link>
              </Button>
            </div>

            <Image
              alt="Hero Image"
              src="/open.jpg"
              width={450}
              height={450}
              className="rounded"
            />
          </div>
        </section>

        {/* Product Carousel */}
        <section className="py-8 ">
          {loading ? (
            <div>Loading products...</div>
          ) : (
            <Carousel products={products} />
          )}
        </section>
      </div>
    </div>
  );
}
