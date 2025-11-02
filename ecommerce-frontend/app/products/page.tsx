import React from "react";
import { dummyProducts } from "../page";
import ProductList from "@/Components/ProductList";

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8 ">
        All Products
      </h1>
      <ProductList products={dummyProducts} />
    </div>
  );
}
