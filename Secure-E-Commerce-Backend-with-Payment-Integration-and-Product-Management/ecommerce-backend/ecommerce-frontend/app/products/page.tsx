"use client";
import React, { useEffect, useState } from "react";

import ProductList from "@/Components/ProductList";
import Navbar from "@/Components/Navbar";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="mt-4  grow container max-w-[85%] mx-auto px-4 py-1">
        <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8 ">
          All Products
        </h1>
        <ProductList products={products} />
      </div>
    </div>
  );
}
