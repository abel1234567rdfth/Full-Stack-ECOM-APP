import { Products } from "@/app/Admin/Products/columns";
import { create } from "zustand";

interface adminproduct {
  product: Products[];
  setProduct: (product: Products[]) => void;
  emptyProduct: () => void;
}

export const useProduct = create<adminproduct>((set) => ({
  product: [
    {
      id: "011111",
      name: "default product",
      stock: 1,
    },
  ],

  setProduct: (products) =>
    set(() => ({
      product: products,
    })),

  emptyProduct: () =>
    set(() => ({
      product: [
        {
          id: "011111",
          name: "default product",
          stock: 1,
        },
      ],
    })),
}));
