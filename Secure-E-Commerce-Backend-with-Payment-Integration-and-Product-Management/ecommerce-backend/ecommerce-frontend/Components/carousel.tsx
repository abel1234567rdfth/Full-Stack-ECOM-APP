"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import Image from "next/image";

export interface carouselProps {
  products: Product[];
}

export interface Rating {
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
      {currentProduct.images && (
        <div className="relative h-80 w-full">
          <Image
            alt={currentProduct.Name}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${currentProduct.images[0]}`}
            fill
            className="object-cover transition "
          />
        </div>
      )}
      <CardContent className="  absolute inset-0 flex flex-col items-center justify-center  bg-black/50 ">
        <CardTitle className="text-3xl font-bold text-white mb-2 transition">
          {currentProduct.Name}
        </CardTitle>
        {price && <p className="text-xl text-white transition">${price}</p>}
      </CardContent>
    </Card>
  );
}
