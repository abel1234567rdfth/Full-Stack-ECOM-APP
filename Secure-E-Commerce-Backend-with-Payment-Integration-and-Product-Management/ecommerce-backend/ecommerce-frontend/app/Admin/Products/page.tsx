"use client";

import { columns, Products } from "./columns";
import { DataTable } from "./data-table";
import { UserPieChart } from "@/Components/UserPieChart";
import { ProductBarChartComponent } from "@/Components/ProductBarChart";
import { ProductPieChart } from "@/Components/ProductPieChart";
import { useEffect, useState } from "react";
import { useProduct } from "@/store/product-store";

export async function getData(): Promise<Products[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/product/products`
    );
    const data = await res.json();
    const products = data.products.map((p: any) => ({
      id: p._id,
      name: p.Name,
      stock: p.stock,
    }));

    return products;
  } catch (err) {
    console.log("Error fetching products:", err);
    return [];
  }
}

export default function ProductsPage() {
  const { product, setProduct } = useProduct();

  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const products = await getData();
    if (products.length > 0) {
      setProduct(products);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center space-x-4">
        <ProductPieChart />
        <ProductBarChartComponent />
      </div>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={product} />
      </div>
    </div>
  );
}
