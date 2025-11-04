import { columns, Users } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Users[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Henok",
      products_purchased: 10,
      email: "m@example.com",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
