"use client";
import { ShippingAddressModal } from "@/Components/infoModal";
import Navbar from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { useCartStore } from "@/store/cart-store";
import React, { useState } from "react";

export default function page() {
  const [addressOpen, setAddressOpen] = useState(false);
  const { items, removeItem, addItem, clearCart } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (total === 0 || items.length === 0) {
    return (
      <div className="max-w-[80%] mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty.</h2>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="mt-4  grow container max-w-[85%] mx-auto px-4 py-1">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
        <Card className="max-w-md mx-auto mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {items.map((item, key) => (
                <li key={key} className="flex flex-col gap-2 border-b pb-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.name}</span>
                    <span className="font-semibold">
                      {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={async () => {
                        removeItem(item.id);
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
                                productId: item.id,
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
                      size="sm"
                      variant={"outline"}
                    >
                      -
                    </Button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <Button
                      size="sm"
                      onClick={async () => {
                        addItem({
                          ...item,
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
                                productId: item.id,
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
                      }}
                    >
                      +
                    </Button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t pt-2 text-lg font-semibold">
              Total:${total.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <form action="" className="max-w-md mx-auto flex justify-between">
          <Button
            onClick={(e) => {
              e.preventDefault();
              setAddressOpen(!addressOpen);
            }}
            className="mx-auto"
            variant={"default"}
          >
            Proceed To Payment
          </Button>

          <ShippingAddressModal open={addressOpen} setOpen={setAddressOpen} />
        </form>
      </div>
    </div>
  );
}
