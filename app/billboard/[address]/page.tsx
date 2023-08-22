"use client"
import { useParams } from 'next/navigation';
import BillboardDetail from './billboard-details';
import Calendar from "./calendar";

export default function BillBoardSpace() {
    const params = useParams()
    const billboardData = {
        location: "Downtown",
        size: "10x10",
        name: "Main Street Billboard",
        description: "Visible from the main road.",
        owner: "John Doe",
        startTime: 1678645200 // Example Unix timestamp
    };
  return (
    <main>
      <div className="grid grid-cols-3">
            <div className="col-span-3 mx-12 px-12">
                <BillboardDetail {...billboardData} />

            </div>
            <div className="col-span-3">
                
              <Calendar address={params.address.toString()}/>
            </div>
      </div>
    </main>
  );
}
