"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import Image from "next/image";

interface carouselProps {
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
  image: string;
}

export default function Carousel({ products }: carouselProps) {
  const [current, setCurrent] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);
  const currentProduct = products[current];
  const price = currentProduct.price;
  return (
    <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300 py-0">
      {currentProduct.image && (
        <div className="relative h-80 w-full">
          <Image
            alt={currentProduct.Name}
            src={currentProduct.image}
            fill
            className="object-cover transition "
          />
        </div>
      )}
      <CardContent className="  absolute inset-0 flex flex-col items-center justify-center  bg-black/50 ">
        <CardTitle className="text-3xl font-bold text-white mb-2 transition">
          {currentProduct.Name}
        </CardTitle>
        {price && (
          <p className="text-xl text-white transition">${price.toFixed(2)}</p>
        )}
      </CardContent>
    </Card>
  );
}
