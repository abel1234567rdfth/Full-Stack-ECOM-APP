"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";

interface SingleProduct {
  product: Product;
}

interface Product {
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
interface Rating {
  userId: string;
  rate: number;
}

export default function ProductDetail({ product }: SingleProduct) {
  const { items, addItem, removeItem, clearCart } = useCartStore();
  const cartItem = items.find((item) => item.id === product._id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = async () => {
    addItem({
      id: product._id,
      name: product.Name,
      price: product.price,
      imageUrl: product.images[0],
      quantity: 1,
    });

    try {
      // 2. Add to backend
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/cart/addtocart`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product._id,
            action: "increment",
          }),
        }
      );

      const data = await res.json();
      console.log("API response:", data);

      if (!res.ok) {
        console.error("Failed to add to cart:", data);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  return (
    <div className=" mx-auto px-4  flex flex-col md:flex-row gap-8 items-center grow mt-4   container max-w-[85%] py-1">
      {product.images && (
        <div className="relative h-96  w-full md:w-1/2 rounded-lg overflow-hidden">
          <Image
            alt={product.Name}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${product.images[0]}`}
            fill
            className="transition duration-300 hover:opacity-90"
          />
        </div>
      )}

      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.Name}</h1>
        {product.description && <p>{product.description}</p>}

        {product.price && (
          <p className="text-lg font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        )}

        <div className="flex space-x-4 items-center mt-3">
          <Button
            onClick={async () => {
              removeItem(product._id);
              try {
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/cart/addtocart`,
                  {
                    method: "POST",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      productId: product._id,
                      action: "decrement",
                    }),
                  }
                );

                const data = await res.json();
                console.log("API response:", data);

                if (!res.ok) {
                  console.error("Failed to add to cart:", data);
                }
              } catch (error) {
                console.error("Error adding to cart:", error);
              }
            }}
            variant={"outline"}
          >
            -
          </Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button onClick={onAddItem}>+</Button>
        </div>
      </div>
    </div>
  );
}

// minus on cart needs to work add 1 to cart works
