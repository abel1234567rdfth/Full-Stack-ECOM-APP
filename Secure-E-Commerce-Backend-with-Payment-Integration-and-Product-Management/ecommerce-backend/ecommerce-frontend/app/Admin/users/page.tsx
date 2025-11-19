import { UserBarChartComponent } from "@/Components/UserBarChart";
import { columns, Users } from "./columns";
import { DataTable } from "./data-table";
import { UserPieChart } from "@/Components/UserPieChart";

async function getData(): Promise<Users[]> {
  return [
    {
      id: "728ed52f",
      name: "Abel",
      products: 100,
      email: "massxd@example.com",
    },
    {
      id: "728ed52f",
      name: "bbel",
      products: 100,
      email: "bfbvm@example.com",
    },
    {
      id: "728ed52f",
      name: "cbel",
      products: 100,
      email: "m111gh@example.com",
    },
    {
      id: "728ed52f",
      name: "dbel",
      products: 100,
      email: "lfplo@example.com",
    },
    {
      id: "728ed52f",
      name: "ebel",
      products: 100,
      email: "lfrj@example.com",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center space-x-4">
        <UserPieChart />
        <UserBarChartComponent />
      </div>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
