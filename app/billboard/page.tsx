import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Payment, columns } from "./columns";
import { DataTable } from "./table";


export default function getAllBillboards() {
  
  const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
  return (
    <main className="flex content-center items-center justify-center m-12">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="map">Map</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>
        <TabsContent value="map">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="table">
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
