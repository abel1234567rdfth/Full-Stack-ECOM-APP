import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Modal } from "./modal";
import { useState } from "react";
import { Products } from "@/app/Admin/Products/columns";
import { EditModal } from "./editmodal";
import { getData } from "@/app/Admin/Products/page";
import { useProduct } from "@/store/product-store";

export function ProductActions({ product }: { product: Products }) {
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const { setProduct } = useProduct();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/deleteproduct/${product.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      const newproducts = await getData();
      setProduct(newproducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditOpen(!editopen)}>
            Edit Product
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Add Product
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>
            Delete Product
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Modal open={open} setOpen={setOpen} />
      <EditModal
        editopen={editopen}
        setEditOpen={setEditOpen}
        product={product}
      />
    </>
  );
}
