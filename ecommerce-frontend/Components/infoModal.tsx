"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";

import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart-store";
import { useUser } from "@/store/user-store";

export function ShippingAddressModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [cartitems, setCartItems] = useState();
  const [shippingAddress, setShippingAdress] = useState<ShippingAddress>();
  const { items } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const { userId } = useUser();

  async function getCart() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cart/seecart/${userId}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch cart");
    }

    const data = await res.json();
    const cart = data.cart;

    // Fetch product details for each cart item
    const updatedCart = await Promise.all(
      cart.map(async (item) => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/product/product/${item.productId}`,
            { cache: "no-store" }
          );
          const productData = await res.json();
          return {
            ...item,
            ...productData.product,
          };
        } catch (err) {
          console.log("Error fetching product:", err);
          return item; // fallback
        }
      })
    );

    return { ...data, cart: updatedCart };
  }

  useEffect(() => {
    async function loadCart() {
      const data = await getCart();
      setCartItems(data.cart);
      console.log("Cart:", data.cart);
    }

    loadCart();
  }, [open]);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    country: "Ethiopia",
    region: "",
    city: "",
    subcity: "",
    street: "",
    houseNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/order/createorder`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: `${userId}`,
            items: cartitems,
            totalAmount: total,
            paymentMethod: "stripe",
            shippingAddress: formData,
          }),
        }
      );
      const orderData = await orderRes.json();
      if (!orderData.success) return toast.error(orderData.message);
      const stripeSessionUrl = orderData.sessionUrl;
      window.location.href = stripeSessionUrl;
      setOpen(false);
    } catch (err) {
      console.error("Checkout failed:", err);
      toast.error("Failed to start payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg rounded-xl shadow-xl border p-0 overflow-hidden">
        <DialogHeader className="border-b px-6 py-4 bg-gray-50">
          <DialogTitle className="text-xl font-semibold">
            Shipping Address
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Please enter your delivery information.
          </DialogDescription>
        </DialogHeader>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 grid gap-6">
          {/* Full Name */}
          <div className="grid gap-2">
            <Label>Full Name</Label>
            <Input
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="grid gap-2">
            <Label>Phone Number</Label>
            <Input
              name="phone"
              type="tel"
              placeholder="+251 9..."
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Country */}
          <div className="grid gap-2">
            <Label>Country</Label>
            <Input
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          {/* Region & City */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Region</Label>
              <Input
                name="region"
                placeholder="e.g. Oromia"
                value={formData.region}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>City</Label>
              <Input
                name="city"
                placeholder="Addis Ababa"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Subcity */}
          <div className="grid gap-2">
            <Label>Subcity</Label>
            <Input
              name="subcity"
              placeholder="Bole"
              value={formData.subcity}
              onChange={handleChange}
              required
            />
          </div>

          {/* Street & House Number */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Street</Label>
              <Input
                name="street"
                placeholder="Street name"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>House Number</Label>
              <Input
                name="houseNumber"
                placeholder="1234"
                value={formData.houseNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold"
          >
            {loading ? "Proceding..." : "proceed to payment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export type ShippingAddress = {
  fullName: string;
  phone: string;
  country: string;
  region: string;
  city: string;
  subcity: string;
  street: string;
  houseNumber: string;
};
