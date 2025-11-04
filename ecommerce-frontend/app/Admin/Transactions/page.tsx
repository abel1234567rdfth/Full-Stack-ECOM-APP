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
      price: 50,
      quantity: 100,
    },
    {
      id: "728ed52f",
      price: 60,
      quantity: 100,
    },
    {
      id: "728ed52f",
      price: 500,
      quantity: 100,
    },
    {
      id: "728ed52f",
      price: 78,
      quantity: 100,
    },
    {
      id: "728ed52f",
      price: 90,
      quantity: 100,
    },
    {
      id: "728ed52f",
      price: 20,
      quantity: 100,
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
