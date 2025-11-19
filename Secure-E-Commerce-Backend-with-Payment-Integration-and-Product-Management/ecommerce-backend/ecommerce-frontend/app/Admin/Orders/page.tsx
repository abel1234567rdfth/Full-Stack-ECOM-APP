"use client";

import { columns, Transactions } from "./columns";
import { DataTable } from "./data-table";
import { UserPieChart } from "@/Components/UserPieChart";
import { ProductBarChartComponent } from "@/Components/ProductBarChart";
import { ProductPieChart } from "@/Components/ProductPieChart";
import { TransactionsBarChartComponent } from "@/Components/TransactionsBarChart";
import { OrderPieChart } from "@/Components/OrderPieChart";
import { OrderBarChartComponent } from "@/Components/OrdersBarchart";
import { useEffect, useState } from "react";

async function getData(): Promise<Transactions[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/order/allorders`,
      {
        credentials: "include",
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "fetch orders");

    // Map backend → frontend type
    return (data.orders || []).map((o: any) => ({
      id: o._id,
      paymentStatus: o.paymentStatus,
      total_price: o.totalAmount,
      name: o.user ?? "Unknown User",
      orderstatus:
        o.orderStatus === "processing"
          ? "Processing"
          : o.orderStatus === "failed"
          ? "Failed"
          : "Delivered",
    }));
  } catch (err) {
    console.log("Error fetching products:", err);
    return [];
  }
}

export default function OrdersPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Transactions[]>([]);
  const fetchData = async () => {
    try {
      const orders = await getData();
      setOrders(orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center space-x-4">
        <OrderPieChart />
        <OrderBarChartComponent />
      </div>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={orders!} />
      </div>
    </div>
  );
}
