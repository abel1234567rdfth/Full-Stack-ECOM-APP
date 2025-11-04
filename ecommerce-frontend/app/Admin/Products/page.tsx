import { columns, Products } from "./columns";
import { DataTable } from "./data-table";
import { UserPieChart } from "@/Components/UserPieChart";
import { ProductBarChartComponent } from "@/Components/ProductBarChart";
import { ProductPieChart } from "@/Components/ProductPieChart";

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Abel",
      stock: 100,
    },
    {
      id: "728ed52f",
      name: "Abel9",
      stock: 100,
    },
    {
      id: "728ed52f",
      name: "Abel67",
      stock: 100,
    },
    {
      id: "728ed52f",
      name: "Abel12",
      stock: 100,
    },
    {
      id: "728ed52f",
      name: "Abel2",
      stock: 100,
    },
    {
      id: "728ed52f",
      name: "Abel4",
      stock: 100,
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
        <ProductBarChartComponent />
      </div>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
