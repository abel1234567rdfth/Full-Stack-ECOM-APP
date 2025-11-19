import Navbar from "@/Components/Navbar";
import ProductDetail from "@/Components/ProductDetail";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let product = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/product/product/${id}`,
      { cache: "no-store" }
    );

    const data = await res.json();

    if (data.success) {
      product = data.product;
    } else {
      console.log("Failed to fetch product:", data.message);
    }
  } catch (err) {
    console.log("Error fetching product:", err);
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <ProductDetail product={product} />
    </div>
  );
}
