import { columns, Transactions } from "./columns";
import { DataTable } from "./data-table";
import { UserPieChart } from "@/Components/UserPieChart";
import { ProductBarChartComponent } from "@/Components/ProductBarChart";
import { ProductPieChart } from "@/Components/ProductPieChart";
import { TransactionsBarChartComponent } from "@/Components/TransactionsBarChart";

async function getData(): Promise<Transactions[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      total_price: 50,
      quantity: 100,
      name: "abel4",
      status: "failed",
    },
    {
      id: "728ed52f",
      total_price: 60,
      quantity: 100,
      name: "abel5",
      status: "pending",
    },
    {
      id: "728ed52f",
      total_price: 500,
      quantity: 100,
      name: "abel6",
      status: "completed",
    },
    {
      id: "728ed52f",
      total_price: 78,
      quantity: 100,
      name: "abel7",
      status: "pending",
    },
    {
      id: "728ed52f",
      total_price: 90,
      quantity: 100,
      name: "abel8",
      status: "pending",
    },
    {
      id: "728ed52f",
      total_price: 20,
      quantity: 100,
      name: "abel9",
      status: "failed",
    },

    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center space-x-4">
        <ProductPieChart />
        <TransactionsBarChartComponent />
      </div>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
