import React from "react";
import { dummyProducts } from "../page";
import ProductList from "@/Components/ProductList";
import Navbar from "@/Components/Navbar";

export default function ProductsPage() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="mt-4  grow container max-w-[85%] mx-auto px-4 py-1">
        <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8 ">
          All Products
        </h1>
        <ProductList products={dummyProducts} />
      </div>
    </div>
  );
}
