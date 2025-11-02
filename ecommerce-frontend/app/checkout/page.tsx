"use client";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { useCartStore } from "@/store/cart-store";
import React from "react";

export default function page() {
  const { items, removeItem, addItem } = useCartStore();
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
    <div className="max-w-[80%] mx-auto px-4 py-8">
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
                    onClick={() => removeItem(item.id)}
                    size="sm"
                    variant={"outline"}
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    size="sm"
                    onClick={() => {
                      addItem({
                        ...item,
                        quantity: 1,
                      });
                    }}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t pt-2 text-lg font-semibold">
            Total:${total.toFixed(2)}.
          </div>
        </CardContent>
      </Card>
      <form action="" className="max-w-md mx-auto">
        <Button type="submit" variant={"default"}>
          Proceed To Payment
        </Button>
      </form>
    </div>
  );
}
