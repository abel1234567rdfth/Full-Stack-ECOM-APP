import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface ProductProps {
  product: Product;
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
  id: string;
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="group hover:shadow-2xl transition duration-300 py-0 h-full flex flex-col border-gray-300 gap-0">
        {product.image && (
          <div className="relative h-60 w-full">
            <Image
              alt={product.Name}
              src={product.image}
              fill
              className="object-cover group-hover:opacity-70 transition-opacity duration-300 rounded-t-lg"
            />
          </div>
        )}
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold text-gray-800">
            {product.Name}
          </CardTitle>
          <CardContent className="p-4 grow flex flex-col justify-between">
            {product.description && (
              <p className="text-gray-600 text-sm mb-2">
                {product.description}
              </p>
            )}
            {product.price && (
              <p className="text-lg font-semibold text-gray-900">
                {" "}
                ${product.price.toFixed(2)}
              </p>
            )}
            <Button className="mt-4 bg-black text-white">View Details</Button>
          </CardContent>
        </CardHeader>
      </Card>
    </Link>
  );
}
