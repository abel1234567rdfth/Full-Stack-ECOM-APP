"use client";

import React, { useState } from "react";
import ProductCard from "./product-card";

interface ProductProps {
  products: Product[];
}

interface Rating {
  userId: string;
  rate: number;
}

export interface Product {
  Name: string;
  description: string;
  price: number;
  category: string;
  comment?: string;
  stock: number;
  ratings?: Rating[];
  createdAt: Date;
  updatedAt: Date;
  images: string[];
  _id: string;
}

export default function ProductList({ products }: ProductProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLocaleLowerCase();
    const nameMatch = product.Name.toLowerCase().includes(term);
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;

    return nameMatch || descriptionMatch;
  });
  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          value={searchTerm}
          type="text"
          placeholder="Search Products..."
          className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-blue-500"
        />
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product, key) => {
          return (
            <li key={key}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
