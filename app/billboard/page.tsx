"use client";

import { CONTRACTS } from "@/constants";
import { useEffect, useState } from "react";
import BillboardItem from "./billboard-item";

export default function GetAllBillboards() {
  const [billboards, setBillboards] = useState<any[]>([]);
  useEffect(() => {
    const getBillboards = async () => {
      const url = process.env.API_URL || "http://localhost:4000" 
      const response = await fetch(`${url}/billboard/pending/${CONTRACTS.mumbai.billboard}`);
      const data = await response.json();
      console.log(data);
      setBillboards(data);
    };
    getBillboards();
  }, []);
  return (
    <main className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 content-center items-center justify-center m-12">
            {billboards.length > 0 &&
              billboards.map((billboard: any, index: number) => (
                <BillboardItem data={billboard} key={index} />
              ))}
               
    </main>
  );
}
