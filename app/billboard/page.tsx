"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function GetAllBillboards() {
  const [billboards, setBillboards] = useState<any[]>([]);
  useEffect(() => {
    const getBillboards = async () => {
      const url = process.env.API_URL || "http://localhost:4000" 
      const response = await fetch(`${url}/billboard/all`);
      const data = await response.json();
      console.log(data);
      setBillboards(data);
    };
    getBillboards();
  }, []);
  return (
    <main className="flex flex-col content-center items-center justify-center m-12">
            {billboards.length > 0 &&
              billboards.map((billboard: any, index: number) => (
                <div className="bg-gray-300 flex w-full p-4 rounded-md" key={index}>
                  <Link href={`/billboard/0x6ef66aa692259c681adb7c728a0cd44cadc81b42`} className="text-indigo-600 hover:text-green-600">
                    {billboard.name}
                  </Link>
                  <span>
                    {billboard.owner} - {billboard.timestamp} - {billboard.size} = {billboard.size}
                  </span>
                </div>
              ))}
    </main>
  );
}
