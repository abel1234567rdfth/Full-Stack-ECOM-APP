import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";

import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Input } from "@/Components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Products } from "@/app/Admin/Products/columns";
import { getData } from "@/app/Admin/Products/page";
import { useProduct } from "@/store/product-store";

export function EditModal({
  editopen,
  setEditOpen,
  product,
}: {
  editopen: boolean;
  setEditOpen: (open: boolean) => void;
  product: Products;
}) {
  const [loading, setLoading] = useState(false);
  const { setProduct } = useProduct();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });

  const [images, setImages] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const body = new FormData();
    body.append("name", formData.name);
    body.append("description", formData.description);
    body.append("category", formData.category);
    body.append("price", formData.price);
    body.append("stock", formData.stock);

    images.forEach((img) => body.append("images", img));
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/editproduct/${product.id}`,
        {
          method: "PATCH",
          credentials: "include",
          body,
        }
      );

      const data = await res.json();

      const newproducts = await getData();
      setProduct(newproducts);

      if (!res.ok) {
        return toast.error(data.message || "Error Editing product");
      }
      setLoading(false);

      toast.success("Product Edited successfully!");
      setEditOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={editopen} onOpenChange={setEditOpen}>
      <DialogContent className="max-w-lg rounded-xl shadow-xl border p-0 overflow-hidden">
        <DialogHeader className="border-b px-6 py-4 bg-gray-50">
          <DialogTitle className="text-xl font-semibold">
            Add New Product
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Fill in the details below to create a new product.
          </DialogDescription>
        </DialogHeader>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 grid gap-6">
          {/* Product Name */}
          <div className="grid gap-2">
            <Label className="font-medium">Product Name</Label>
            <Input
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              className="placeholder:text-gray-400"
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label className="font-medium">Description</Label>
            <Textarea
              name="description"
              placeholder="Describe the product..."
              value={formData.description}
              onChange={handleChange}
              className="min-h-[100px]"
            />
          </div>

          {/* Category */}
          <div className="grid gap-2">
            <Label className="font-medium">Category</Label>
            <Input
              name="category"
              placeholder="e.g. Electronics"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          {/* Price & Stock (side-by-side) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="font-medium">Price ($)</Label>
              <Input
                name="price"
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <Label className="font-medium">Stock</Label>
              <Input
                name="stock"
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="font-medium">Product Images</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <p className="text-xs text-gray-500">
              (You can upload multiple images)
            </p>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold"
          >
            {loading ? "Editing..." : "Edit Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
